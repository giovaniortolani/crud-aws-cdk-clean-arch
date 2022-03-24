import { Person } from '../../domain/entities/person';
import { IAddPerson } from '../../domain/use-cases/add-person';
import { PeopleRepository } from '../protocols/people-repository';

export class AddPerson implements IAddPerson {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async execute(person: Person): Promise<true> {
    return await this.peopleRepository.add(person);
  }
}
