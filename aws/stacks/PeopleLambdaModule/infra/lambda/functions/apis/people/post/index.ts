import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';
import { ParameterTier, ParameterType, StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export function makeCreatePersonLambda(app: Construct) {
  const peopleTable = Table.fromTableAttributes(app, 'PeopleTableImportedFromCreatePersonLambda', {
    tableName: StringParameter.fromStringParameterName(
      app,
      'PeopleTableImportedFromCreatePersonLambdaParameterName',
      'modules.dynamodb.infra.table.people'
    ).stringValue,
  });

  const resource = new NodejsFunction(app, 'CreatePersonLambda', {
    handler: 'handler',
    functionName: 'Dev-CrudChallenge-API-createPerson',
    entry: path.join(__dirname, 'handler.ts'),
    runtime: Runtime.NODEJS_14_X,
    timeout: Duration.seconds(15),
  });

  peopleTable.grantReadWriteData(resource);

  new StringParameter(app, 'modules.people.lambda.api.people.post', {
    parameterName: 'modules.people.lambda.api.people.post',
    stringValue: resource.functionArn,
    type: ParameterType.STRING,
    tier: ParameterTier.STANDARD,
  });

  return resource;
}
