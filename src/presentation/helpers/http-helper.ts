import { ServerError } from '../errors/ServerError';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    errorName: error.name,
    errorMessage: error.message,
  },
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: {
    errorName: error.name,
    errorMessage: error.message,
  },
});

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: null,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (resource: any): HttpResponse => ({
  statusCode: 201,
  body: resource,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
