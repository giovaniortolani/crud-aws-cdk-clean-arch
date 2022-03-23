import { Duration } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

export function makePostAuthenticationLambdaTrigger(app: Construct) {
  const resource = new NodejsFunction(app, 'PostAuthenticationLambdaTrigger', {
    handler: 'handler',
    functionName: 'Dev-CrudChallenge-Cognito-postAuthentication',
    entry: path.join(__dirname, 'handler.ts'),
    runtime: Runtime.NODEJS_14_X,
    timeout: Duration.seconds(15),
  });

  return resource;
}
