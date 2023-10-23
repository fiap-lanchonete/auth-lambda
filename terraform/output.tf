output "api_gateway_url" {
  description = "Base URL for API Gateway stage."
  value = aws_apigatewayv2_stage.dev.invoke_url
}

output "lambda_function_arn" {
  description = "Lambda function arn"
  value = aws_lambda_function.auth_lambda.arn
}