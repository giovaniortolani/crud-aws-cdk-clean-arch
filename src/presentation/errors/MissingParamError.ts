export class MissingParamError extends Error {
  constructor(missingParameters: string) {
    super(`${missingParameters} required`);
    this.name = 'MissingParamError';
  }
}
