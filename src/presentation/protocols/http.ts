export type HttpRequest = {
  pathParameters: any;
  queryParameters?: any;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  body?: any;
};
