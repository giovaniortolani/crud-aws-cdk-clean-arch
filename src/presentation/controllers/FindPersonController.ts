import { FindPerson } from '../../data/use-cases/FindPerson';
import { MissingParamError } from '../errors/MissingParamError';
import { badRequest, noContent, ok, serverError } from '../helpers/http-helper';
import { verifyRequiredParameters } from '../helpers/verify-required-parameters-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class FindPersonController implements Controller {
  constructor(private readonly findPerson: FindPerson) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.pathParameters.id;

      const missingParameters = verifyRequiredParameters(['id'], { id });
      if (missingParameters) {
        return badRequest(new MissingParamError(missingParameters));
      }

      const people = await this.findPerson.execute(id);
      if (!people) {
        return noContent();
      }

      return ok(people);
    } catch (exception) {
      return serverError(exception);
    }
  }
}
