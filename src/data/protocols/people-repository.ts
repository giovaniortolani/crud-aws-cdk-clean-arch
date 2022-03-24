import { Person } from '../../domain/entities/person';
import { UpdateDuaLipaAffinityType } from '../../domain/use-cases/update-dualipa-affinity';

export interface PeopleRepository {
  add: (person: Person) => Promise<true | undefined>;
  delete: (id: string) => Promise<true | undefined>;
  find: (id: string) => Promise<Person>;
  retrieveAll: () => Promise<Person[]>;
  updateDuaLipaAffinity: (person: UpdateDuaLipaAffinityType) => Promise<Person>;
}
