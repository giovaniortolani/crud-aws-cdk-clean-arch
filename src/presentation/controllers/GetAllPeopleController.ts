import { ok } from '../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class GetAllPeopleController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok('eae');
  }
}
