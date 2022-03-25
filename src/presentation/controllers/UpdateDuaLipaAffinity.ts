import { FindPerson } from '../../data/use-cases/FindPerson';
import { UpdateDuaLipaAffinity } from '../../data/use-cases/UpdateDuaLipaAffinity';
import { MissingParamError } from '../errors/MissingParamError';
import { badRequest, noContent, notFound, serverError } from '../helpers/http-helper';
import { verifyRequiredParameters } from '../helpers/verify-required-parameters-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class UpdateDuaLipaAffinityController implements Controller {
  constructor(private readonly updateDuaLipaAffinity: UpdateDuaLipaAffinity, private readonly findPerson: FindPerson) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.pathParameters.id;
      const { likesDuaLipa } = httpRequest.body;

      const missingParameters = verifyRequiredParameters(['id', 'likesDuaLipa'], { id, likesDuaLipa });
      if (missingParameters) {
        return badRequest(new MissingParamError(missingParameters));
      }

      const personExists = this.findPerson.execute(id);
      if (!personExists) {
        return notFound();
      }

      await this.updateDuaLipaAffinity.execute({ id, likesDuaLipa });
      return noContent();
    } catch (exception) {
      console.info('httpRequest', httpRequest);
      console.error('UpdateDuaLipaAffinityController', exception);
      return serverError(exception);
    }
  }
}
