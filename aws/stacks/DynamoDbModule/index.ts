import { App, Stack, StackProps } from 'aws-cdk-lib';
import { makePeopleTable } from './infra/tables/people';

export class DynamoDbModule extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    makePeopleTable(this);
  }
}
