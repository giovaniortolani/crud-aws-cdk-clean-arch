import { Person } from '../entities/person';

export interface IAddPerson {
  execute: (person: Person) => Promise<true | undefined>;
}
