import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';
import { ParameterTier, ParameterType, StringParameter } from 'aws-cdk-lib/aws-ssm';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export function makeGetAllPeopleLambda(app: Construct) {
  const peopleTable = Table.fromTableAttributes(app, 'PeopleTableImportedFromGetAllPeopleLambda', {
    tableName: StringParameter.fromStringParameterName(
      app,
      'PeopleTableImportedFromGetAllPeopleLambdaParameter',
      'modules.dynamodb.infra.table.people'
    ).stringValue,
  });

  const resource = new NodejsFunction(app, 'GetAllPeopleLambda', {
    handler: 'handler',
    functionName: 'Dev-CrudChallenge-API-getAllPeople',
    entry: path.join(__dirname, 'handler.ts'),
    runtime: Runtime.NODEJS_14_X,
    timeout: Duration.seconds(15),
    logRetention: RetentionDays.FIVE_DAYS,
    description: `Generated on: ${new Date().toISOString()}`,
  });

  peopleTable.grantReadData(resource);

  new StringParameter(app, 'modules.people.lambda.api.people.get', {
    parameterName: 'modules.people.lambda.api.people.get',
    stringValue: resource.functionArn,
    type: ParameterType.STRING,
    tier: ParameterTier.STANDARD,
  });

  return resource;
}
