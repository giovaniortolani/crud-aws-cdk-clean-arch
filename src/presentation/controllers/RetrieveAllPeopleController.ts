import { RetrieveAllPeople } from '../../data/use-cases/RetrieveAllPeople';
import { noContent, ok, serverError } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class RetrieveAllPeopleController implements Controller {
  constructor(private readonly retrieveAllPeople: RetrieveAllPeople) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const people = await this.retrieveAllPeople.execute();

      if (!people.length) {
        return noContent();
      }

      return ok(people);
    } catch (exception) {
      return serverError(exception);
    }
  }
}
