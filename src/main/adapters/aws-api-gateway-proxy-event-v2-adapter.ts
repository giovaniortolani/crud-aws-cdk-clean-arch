import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Controller } from '../../presentation/protocols/controller';
import { HttpRequest } from '../../presentation/protocols/http';

export const adaptAPIGatewayProxyEventV2Route = async (
  request: APIGatewayProxyEventV2,
  controller: Controller
): Promise<APIGatewayProxyResultV2> => {
  const httpRequest: HttpRequest = {
    body: (request.body && JSON.parse(request.body)) || {},
    pathParameters: request.pathParameters || {},
    queryParameters: request.queryStringParameters || {},
    headerParameters: request.headers || {},
  };

  const httpResponse = await controller.handle(httpRequest);

  return {
    statusCode: httpResponse.statusCode,
    body: JSON.stringify(httpResponse.body || null),
  };
};
