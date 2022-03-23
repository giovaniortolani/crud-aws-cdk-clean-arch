import { App, Stack, StackProps } from 'aws-cdk-lib';
import { makeCreatePersonLambda } from './infra/lambda/functions/apis/people/post';
import { makeDeletePersonLambda } from './infra/lambda/functions/apis/people/{id}/delete';
import { makeGetAllPeopleLambda } from './infra/lambda/functions/apis/people/get';
import { makeGetPersonLambda } from './infra/lambda/functions/apis/people/{id}/get';
import { makeUpdateDuaLipaAffinityLambda } from './infra/lambda/functions/apis/people/{id}/dualipaaffinity/patch';

export class PeopleLambdaModule extends Stack {
  constructor(app: App, name: string, props?: StackProps) {
    super(app, name, props);
    makeCreatePersonLambda(this);
    makeDeletePersonLambda(this);
    makeGetAllPeopleLambda(this);
    makeGetPersonLambda(this);
    makeUpdateDuaLipaAffinityLambda(this);
  }
}
