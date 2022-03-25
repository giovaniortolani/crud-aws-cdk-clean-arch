import { FindPerson } from '../../../data/use-cases/FindPerson';
import { UpdateDuaLipaAffinity } from '../../../data/use-cases/UpdateDuaLipaAffinity';
import { UpdateDuaLipaAffinityController } from '../../../presentation/controllers/UpdateDuaLipaAffinity';
import { makeRepository } from '../repositories/make-repository';

export const makeUpdateDuaLipaAffinityController = () => {
  const repository = makeRepository();
  const updateDuaLipaAffinity = new UpdateDuaLipaAffinity(repository);
  const findPerson = new FindPerson(repository);
  const controller = new UpdateDuaLipaAffinityController(updateDuaLipaAffinity, findPerson);
  return controller;
};
