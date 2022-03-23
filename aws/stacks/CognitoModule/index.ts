import { App, Stack, StackProps } from 'aws-cdk-lib';
import { appClientsConfiguration } from './infra/appClients/app-clients';
import { makePostAuthenticationLambdaTrigger } from './infra/lambdaTriggers/post-auth-lambda';
import { makeUserPool } from './infra/userPools/crud-user-pool';

export class CognitoModule extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    const postAuthenticationTrigger = makePostAuthenticationLambdaTrigger(this);
    makeUserPool(this, { postAuthenticationTrigger, appClientsConfiguration });
  }
}
