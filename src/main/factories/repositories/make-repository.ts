import { DynamoPeopleRepository } from '../../../infra/repositories/dynamo/DynamoPeopleRepository';

export const makeRepository = () => {
  return new DynamoPeopleRepository();
};
