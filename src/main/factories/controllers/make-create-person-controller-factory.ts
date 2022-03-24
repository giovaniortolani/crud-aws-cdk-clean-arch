import { AddPerson } from '../../../data/use-cases/AddPerson';
import { FindPerson } from '../../../data/use-cases/FindPerson';
import { AddPersonController } from '../../../presentation/controllers/AddPersonController';
import { makeRepository } from '../repositories/make-repository';

export const makeAddPersonController = () => {
  const repository = makeRepository();
  const addPerson = new AddPerson(repository);
  const findPerson = new FindPerson(repository);
  const controller = new AddPersonController(addPerson, findPerson);
  return controller;
};
