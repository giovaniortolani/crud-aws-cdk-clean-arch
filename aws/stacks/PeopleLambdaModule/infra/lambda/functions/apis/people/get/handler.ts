import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter';
import { makeRetrieveAllPeopleController } from '../../../../../../../../../src/main/factories/controllers/make-retrieve-all-people-controller-factory';

const controller = makeRetrieveAllPeopleController();

export const handler = async (event) => {
  const httpResponse = adaptAPIGatewayProxyEventV2Route(event, controller);
  return httpResponse;
};
