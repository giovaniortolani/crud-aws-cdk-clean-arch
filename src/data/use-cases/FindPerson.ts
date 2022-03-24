import { Person } from '../../domain/entities/person';
import { IFindPerson } from '../../domain/use-cases/find-person';
import { PeopleRepository } from '../protocols/people-repository';

export class FindPerson implements IFindPerson {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async execute(id: string): Promise<Person> {
    return await this.peopleRepository.find(id);
  }
}
