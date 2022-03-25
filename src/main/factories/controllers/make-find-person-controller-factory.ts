import { FindPerson } from '../../../data/use-cases/FindPerson';
import { FindPersonController } from '../../../presentation/controllers/FindPersonController';
import { makeRepository } from '../repositories/make-repository';

export const makeFindPersonController = () => {
  const repository = makeRepository();
  const findPerson = new FindPerson(repository);
  const controller = new FindPersonController(findPerson);
  return controller;
};
