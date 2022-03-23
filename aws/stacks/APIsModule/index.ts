import { App, Stack, StackProps } from 'aws-cdk-lib';
import { makePeopleAPI } from './infra/apigateway/apis/people';

export class APIsModule extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    makePeopleAPI(this);
  }
}
