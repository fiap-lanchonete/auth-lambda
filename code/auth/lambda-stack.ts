import cdk from 'aws-cdk-lib';
import lambda from 'aws-cdk-lib/aws-lambda';
import apigateway from 'aws-cdk-lib/aws-apigateway';

export class MyAuthLambdaStack extends cdk.Stack {
  constructor(scope: any, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, 'AuthLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'src/adapters/controllers/auth.lambdaHandler',
      code: lambda.Code.fromAsset('/code/auth'),
    });

    const api = new apigateway.RestApi(this, 'AuthApi');

    const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction);

    const authResource = api.root.addResource('v1').addResource('auth');

    const loginResource = authResource.addResource('login');
    loginResource.addMethod('POST', lambdaIntegration);


    const anonymousResource = authResource.addResource('login/anonymous');
    anonymousResource.addMethod('POST', lambdaIntegration);
  }
}
