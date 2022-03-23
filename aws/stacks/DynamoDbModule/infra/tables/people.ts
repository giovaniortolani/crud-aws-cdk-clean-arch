import { Construct } from 'constructs';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { ParameterTier, ParameterType, StringParameter } from 'aws-cdk-lib/aws-ssm';

export function makePeopleTable(app: Construct) {
  const resource = new Table(app, 'PeopleTable', {
    partitionKey: { name: 'id', type: AttributeType.STRING },
    tableName: 'People',
    billingMode: BillingMode.PROVISIONED,
    readCapacity: 1,
    writeCapacity: 1,
  });

  new StringParameter(app, 'modules.dynamodb.infra.table.people', {
    parameterName: 'modules.dynamodb.infra.table.people',
    stringValue: resource.tableName,
    type: ParameterType.STRING,
    tier: ParameterTier.STANDARD,
  });
}
