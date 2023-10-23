provider "aws" {
  region = var.region
}

# IAM Role for Lambda
resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Sid = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "iam_for_lambda" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda Function
resource "aws_lambda_function" "auth_lambda" {
  function_name = var.function_name
  filename = var.filename
  source_code_hash = data.archive_file.python_lambda_package.output_base64sha256
  handler      = var.handler_name
  runtime      = var.runtime_version
  timeout      = var.timeout

  role = aws_iam_role.iam_for_lambda.arn
}

resource "aws_cloudwatch_log_group" "auth_lambda" {
  name = "/aws/lambda/${aws_lambda_function.auth_lambda.function_name}"

  retention_in_days = 7
}

resource "aws_lambda_permission" "logs_lambda_permission" {
  statement_id  = "AllowLogging"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth_lambda.function_name
  principal     = "logs.amazonaws.com"
  source_arn   = aws_cloudwatch_log_group.auth_lambda.arn
}

data "archive_file" "python_lambda_package" {
  type = "zip"
  source_file = "../code/lambda_handler.py"
  output_path = var.filename
}

resource "aws_apigatewayv2_api" "auth_lambda" {
  name          = var.api_gateway_name
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "dev" {
  api_id = aws_apigatewayv2_api.auth_lambda.id

  name        = "dev"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.auth_api_gtw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_cloudwatch_log_group" "auth_api_gtw" {
  name = "/aws/api-gw/${aws_apigatewayv2_api.auth_lambda.name}"

  retention_in_days = 7
}

resource "aws_apigatewayv2_integration" "auth_lambda" {
  api_id = aws_apigatewayv2_api.auth_lambda.id

  integration_uri    = aws_lambda_function.auth_lambda.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "get_auth" {
  api_id = aws_apigatewayv2_api.auth_lambda.id

  route_key = "GET /auth"
  target    = "integrations/${aws_apigatewayv2_integration.auth_lambda.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.auth_lambda.execution_arn}/*/*"
}
