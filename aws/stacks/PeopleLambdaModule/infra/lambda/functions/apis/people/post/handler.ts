import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter';
import { makeAddPersonController } from '../../../../../../../../../src/main/factories/controllers/make-add-person-controller-factory';

const controller = makeAddPersonController();

export const handler = async (event) => {
  const httpResponse = await adaptAPIGatewayProxyEventV2Route(event, controller);
  return httpResponse;
};
