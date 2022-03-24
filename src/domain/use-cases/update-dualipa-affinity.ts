import { Person } from '../entities/person';

// Ou export type UpdateDuaLipaAffinityType = Omit<Person, 'name' | 'id'>
export type UpdateDuaLipaAffinityType = {
  id: string;
  likesDuaLipa: boolean;
};

export interface IUpdateDuaLipaAffinity {
  execute: (person: UpdateDuaLipaAffinityType) => Promise<Person>;
}
