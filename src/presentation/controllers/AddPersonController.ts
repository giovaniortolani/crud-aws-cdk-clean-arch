import { AddPerson } from '../../data/use-cases/AddPerson';
import { FindPerson } from '../../data/use-cases/FindPerson';
import { Person } from '../../domain/entities/person';
import { UserAlreadyExistsError } from '../../domain/errors/UserAlreadyExistsError';
import { MissingParamError } from '../errors/MissingParamError';
import { badRequest, created, forbidden, serverError } from '../helpers/http-helper';
import { verifyRequiredParameters } from '../helpers/verify-required-parameters-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class AddPersonController implements Controller {
  constructor(private readonly addPerson: AddPerson, private readonly findPerson: FindPerson) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, name, age, likesDuaLipa } = httpRequest.body;
      const missingParameters = verifyRequiredParameters(['id', 'age'], { id, age });
      if (missingParameters) {
        return badRequest(new MissingParamError(missingParameters));
      }

      const personAlreadyExists = await this.findPerson.execute(id);
      if (personAlreadyExists) {
        return forbidden(new UserAlreadyExistsError());
      }

      const person: Person = { id, name, age, likesDuaLipa };
      await this.addPerson.execute(person);
      return created(person);
    } catch (error) {
      return serverError(error);
    }
  }
}
