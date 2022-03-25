export type HttpRequest = {
  pathParameters: any;
  queryParameters?: any;
  headerParameters?: any;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  body?: any;
  headerParameters?: any;
};
