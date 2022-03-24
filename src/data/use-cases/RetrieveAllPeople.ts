import { Person } from '../../domain/entities/person';
import { IRetrieveAllPeople } from '../../domain/use-cases/retrieve-all-people';
import { PeopleRepository } from '../protocols/people-repository';

export class RetrieveAllPeople implements IRetrieveAllPeople {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async execute(): Promise<Person[]> {
    return await this.peopleRepository.retrieveAll();
  }
}
