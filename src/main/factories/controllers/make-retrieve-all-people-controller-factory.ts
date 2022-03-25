import { RetrieveAllPeople } from '../../../data/use-cases/RetrieveAllPeople';
import { RetrieveAllPeopleController } from '../../../presentation/controllers/RetrieveAllPeopleController';
import { makeRepository } from '../repositories/make-repository';

export const makeRetrieveAllPeopleController = () => {
  const repository = makeRepository();
  const retrieveAllPeople = new RetrieveAllPeople(repository);
  const controller = new RetrieveAllPeopleController(retrieveAllPeople);
  return controller;
};
