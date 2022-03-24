export interface IDeletePerson {
  execute: (id: string) => Promise<true | undefined>;
}
