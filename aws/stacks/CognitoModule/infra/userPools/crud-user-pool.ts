import { AccountRecovery, UserPool, UserPoolClient, UserPoolOperation } from 'aws-cdk-lib/aws-cognito';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { ParameterTier, ParameterType, StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export function makeUserPool(app: Construct, { postAuthenticationTrigger, appClientsConfiguration }) {
  const resource = new UserPool(app, 'CRUDUserPool', {
    userPoolName: 'CRUDUserPool',
    signInAliases: { email: true },
    selfSignUpEnabled: true,
    standardAttributes: {
      email: { mutable: false, required: true },
    },
    accountRecovery: AccountRecovery.NONE,
  });

  resource.addTrigger(UserPoolOperation.POST_AUTHENTICATION, postAuthenticationTrigger);

  appClientsConfiguration.forEach((appClient) => {
    resource.addClient(appClient.id, appClient.options);
  });

  resource.addDomain('CRUDHostedDomain', {
    cognitoDomain: {
      domainPrefix: 'testinhodogepeto',
    },
  });

  new StringParameter(app, 'modules.cognito.infra.userPools.crud-user-pool', {
    parameterName: 'modules.cognito.infra.userPools.crud-user-pool',
    stringValue: resource.userPoolId,
    type: ParameterType.STRING,
    tier: ParameterTier.STANDARD,
  });

  return resource;
}
