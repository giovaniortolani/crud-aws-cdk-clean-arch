import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter';
import { makeDeletePersonController } from '../../../../../../../../../../src/main/factories/controllers/make-delete-person-controller-factory';

const controller = makeDeletePersonController();

export const handler = async (event) => {
  const httpResponse = adaptAPIGatewayProxyEventV2Route(event, controller);
  return httpResponse;
};
