import { DeletePerson } from '../../data/use-cases/DeletePerson';
import { FindPerson } from '../../data/use-cases/FindPerson';
import { MissingParamError } from '../errors/MissingParamError';
import { badRequest, noContent, notFound, serverError } from '../helpers/http-helper';
import { verifyRequiredParameters } from '../helpers/verify-required-parameters-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class DeletePersonController implements Controller {
  constructor(private readonly deletePerson: DeletePerson, private readonly findPerson: FindPerson) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.pathParameters.id;

      const missingParameters = verifyRequiredParameters(['id'], { id });
      if (missingParameters) {
        return badRequest(new MissingParamError(missingParameters));
      }

      const personExists = this.findPerson.execute(id);
      if (!personExists) {
        return notFound();
      }

      await this.deletePerson.execute(id);
      return noContent();
    } catch (exception) {
      return serverError(exception);
    }
  }
}
