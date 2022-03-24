export class UserAlreadyExistsError extends Error {
  constructor() {
    const message = 'User already exists.';
    super(message);
    this.name = 'UserAlreadyExistsError';
    this.stack = message;
  }
}
