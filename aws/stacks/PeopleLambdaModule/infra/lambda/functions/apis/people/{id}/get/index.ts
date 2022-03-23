import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';
import { ParameterTier, ParameterType, StringParameter } from 'aws-cdk-lib/aws-ssm';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export function makeGetPersonLambda(app: Construct) {
  const peopleTable = Table.fromTableAttributes(app, 'PeopleTableImportedFromGetPersonLambda', {
    tableName: StringParameter.fromStringParameterName(
      app,
      'PeopleTableImportedFromGetPersonLambdaParameter',
      'modules.dynamodb.infra.table.people'
    ).stringValue,
  });

  const resource = new NodejsFunction(app, 'GetPersonLambda', {
    handler: 'handler',
    functionName: 'Dev-CrudChallenge-API-getPerson',
    entry: path.join(__dirname, 'handler.ts'),
    runtime: Runtime.NODEJS_14_X,
    logRetention: RetentionDays.SIX_MONTHS,
    timeout: Duration.seconds(15),
  });

  peopleTable.grantReadData(resource);

  new StringParameter(app, 'modules.people.lambda.api.people.id.get', {
    parameterName: 'modules.people.lambda.api.people.id.get',
    stringValue: resource.functionArn,
    type: ParameterType.STRING,
    tier: ParameterTier.STANDARD,
  });

  return resource;
}
