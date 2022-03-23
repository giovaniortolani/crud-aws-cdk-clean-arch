#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PeopleLambdaModule, DynamoDbModule, CognitoModule, APIsModule } from '../stacks';
import { env } from '../env';

const app = new cdk.App({});

const dynamoDbStack = new DynamoDbModule(app, 'DynamoModule', { env });
const cognitoStack = new CognitoModule(app, 'CognitoModule', { env });
const peopleLambdaStack = new PeopleLambdaModule(app, 'PeopleLambdaModule', { env });
const apisStack = new APIsModule(app, 'APIsModule', { env });

peopleLambdaStack.addDependency(dynamoDbStack);
apisStack.addDependency(cognitoStack);
apisStack.addDependency(peopleLambdaStack);
