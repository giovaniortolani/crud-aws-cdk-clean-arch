import { DeletePerson } from '../../../data/use-cases/DeletePerson';
import { FindPerson } from '../../../data/use-cases/FindPerson';
import { DeletePersonController } from '../../../presentation/controllers/DeletePersonController';
import { makeRepository } from '../repositories/make-repository';

export const makeDeletePersonController = () => {
  const repository = makeRepository();
  const deletePerson = new DeletePerson(repository);
  const findPerson = new FindPerson(repository);
  const controller = new DeletePersonController(deletePerson, findPerson);
  return controller;
};
