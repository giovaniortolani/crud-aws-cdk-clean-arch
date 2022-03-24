import { Person } from '../entities/person';

export interface IFindPerson {
  execute: (id: string) => Promise<Person>;
}
