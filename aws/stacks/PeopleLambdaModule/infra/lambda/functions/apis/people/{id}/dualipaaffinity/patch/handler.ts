import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter';
import { makeUpdateDuaLipaAffinityController } from '../../../../../../../../../../../src/main/factories/controllers/make-update-dualipa-affinity-controller';

const controller = makeUpdateDuaLipaAffinityController();

export const handler = async (event) => {
  const httpResponse = adaptAPIGatewayProxyEventV2Route(event, controller);
  return httpResponse;
};
