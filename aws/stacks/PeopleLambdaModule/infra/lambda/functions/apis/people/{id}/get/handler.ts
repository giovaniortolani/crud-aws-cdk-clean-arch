import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter';
import { makeFindPersonController } from '../../../../../../../../../../src/main/factories/controllers/make-find-person-controller-factory';

const controller = makeFindPersonController();

export const handler = async (event) => {
  const httpResponse = adaptAPIGatewayProxyEventV2Route(event, controller);
  return httpResponse;
};
