import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';
import { ParameterTier, ParameterType, StringParameter } from 'aws-cdk-lib/aws-ssm';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export function makeDeletePersonLambda(app: Construct) {
  const peopleTable = Table.fromTableAttributes(app, 'PeopleTableImportedFromDeletePersonLambda', {
    tableName: StringParameter.fromStringParameterName(
      app,
      'PeopleTableImportedFromDeletePersonLambdaParameter',
      'modules.dynamodb.infra.table.people'
    ).stringValue,
  });

  const resource = new NodejsFunction(app, 'DeletePersonLambda', {
    handler: 'handler',
    functionName: 'Dev-CrudChallenge-API-deletePerson',
    entry: path.join(__dirname, 'handler.ts'),
    runtime: Runtime.NODEJS_14_X,
    timeout: Duration.seconds(15),
    logRetention: RetentionDays.FIVE_DAYS,
    description: `Generated on: ${new Date().toISOString()}`,
  });

  peopleTable.grantWriteData(resource);

  new StringParameter(app, 'modules.people.lambda.api.people.id.delete', {
    parameterName: 'modules.people.lambda.api.people.id.delete',
    stringValue: resource.functionArn,
    type: ParameterType.STRING,
    tier: ParameterTier.STANDARD,
  });

  return resource;
}
