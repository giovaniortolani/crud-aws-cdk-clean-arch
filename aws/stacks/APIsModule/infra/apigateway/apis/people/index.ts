import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  IdentitySource,
  LambdaIntegration,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { PeopleAPILambdas } from './Lambdas';

export function makePeopleAPI(scope: Construct) {
  const lambdas = new PeopleAPILambdas(scope);

  const userPool = UserPool.fromUserPoolId(
    scope,
    'UserPoolLoadedFromPeopleAPI',
    StringParameter.fromStringParameterName(
      scope,
      'modules.cognito.infra.userPools.crud-user-pool',
      'modules.cognito.infra.userPools.crud-user-pool'
    ).stringValue
  );

  const authorizer = new CognitoUserPoolsAuthorizer(scope, 'PeopleAPIAuthorizer', {
    cognitoUserPools: [userPool],
    identitySource: IdentitySource.header('Authorization'),
  });

  const resource = new RestApi(scope, 'PeopleAPI', {
    restApiName: 'PeopleAPI',
  });

  const people = resource.root.addResource('people');
  people.addMethod('GET', new LambdaIntegration(lambdas.getAllPeopleLambda));
  people.addMethod('POST', new LambdaIntegration(lambdas.createPersonLambda), {
    authorizer: authorizer,
    authorizationType: AuthorizationType.COGNITO,
  });

  const person = people.addResource('{id}');
  person.addMethod('GET', new LambdaIntegration(lambdas.getPersonLambda));
  person.addMethod('DELETE', new LambdaIntegration(lambdas.deletePersonLambda));

  const personDuaLipaAffinity = person.addResource('dualipaaffinity');
  personDuaLipaAffinity.addMethod('PATCH', new LambdaIntegration(lambdas.updateDuaLipaAffinityLambda));

  return resource;
}
