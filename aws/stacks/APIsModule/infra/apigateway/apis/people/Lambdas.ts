import { Function, IFunction } from 'aws-cdk-lib/aws-lambda';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export class PeopleAPILambdas {
  createPersonLambda: IFunction;
  getAllPeopleLambda: IFunction;
  getPersonLambda: IFunction;
  deletePersonLambda: IFunction;
  updateDuaLipaAffinityLambda: IFunction;

  constructor(scope: Construct) {
    this.createPersonLambda = Function.fromFunctionAttributes(scope, 'CreatePersonLambdaImportedFromPeopleAPI', {
      sameEnvironment: true,
      functionArn: StringParameter.fromStringParameterName(
        scope,
        'modules.people.lambda.api.people.post',
        'modules.people.lambda.api.people.post'
      ).stringValue,
    });

    this.getAllPeopleLambda = Function.fromFunctionAttributes(scope, 'GetAllPeopleLambdaImportedFromPeopleAPI', {
      sameEnvironment: true,
      functionArn: StringParameter.fromStringParameterName(
        scope,
        'modules.people.lambda.api.people.get',
        'modules.people.lambda.api.people.get'
      ).stringValue,
    });

    this.getPersonLambda = Function.fromFunctionAttributes(scope, 'GetPersonLambdaLambdaImportedFromPeopleAPI', {
      sameEnvironment: true,
      functionArn: StringParameter.fromStringParameterName(
        scope,
        'modules.people.lambda.api.people.id.get',
        'modules.people.lambda.api.people.id.get'
      ).stringValue,
    });

    this.deletePersonLambda = Function.fromFunctionAttributes(scope, 'DeletePersonLambdaImportedFromPeopleAPI', {
      sameEnvironment: true,
      functionArn: StringParameter.fromStringParameterName(
        scope,
        'modules.people.lambda.api.people.id.delete',
        'modules.people.lambda.api.people.id.delete'
      ).stringValue,
    });

    this.updateDuaLipaAffinityLambda = Function.fromFunctionAttributes(
      scope,
      'UpdateDuaLipaAffinityLambdaImportedFromPeopleAPI',
      {
        sameEnvironment: true,
        functionArn: StringParameter.fromStringParameterName(
          scope,
          'modules.people.lambda.api.people.id.dualipaaffinity.patch',
          'modules.people.lambda.api.people.id.dualipaaffinity.patch'
        ).stringValue,
      }
    );
  }
}
