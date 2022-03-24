import { Person } from '../../domain/entities/person';
import { IUpdateDuaLipaAffinity, UpdateDuaLipaAffinityType } from '../../domain/use-cases/update-dualipa-affinity';
import { PeopleRepository } from '../protocols/people-repository';

export class UpdateDuaLipaAffinity implements IUpdateDuaLipaAffinity {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async execute(person: UpdateDuaLipaAffinityType): Promise<Person> {
    return await this.peopleRepository.updateDuaLipaAffinity(person);
  }
}
