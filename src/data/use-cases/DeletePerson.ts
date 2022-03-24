import { IDeletePerson } from '../../domain/use-cases/delete-person';
import { PeopleRepository } from '../protocols/people-repository';

export class DeletePerson implements IDeletePerson {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async execute(id: string): Promise<true> {
    return await this.peopleRepository.delete(id);
  }
}
