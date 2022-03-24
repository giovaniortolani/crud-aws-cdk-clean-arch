export class ServerError extends Error {
  constructor(callStack: string) {
    super('Internal Server Error');
    this.name = 'ServerError';
    this.stack = callStack;
  }
}
