import { Person } from '../entities/person';

export interface IRetrieveAllPeople {
  execute: () => Promise<Person[]>;
}
