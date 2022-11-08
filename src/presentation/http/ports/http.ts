import Joi from 'joi';
import { User } from '@/domain/entities/user';

export type HttpRequest = {
  body?: any;
  params: any;
  query?: any;
  headers?: any;
  user?: User;
};

export type HttpResponse<T = any> = {
  data?: T;
  headers?: any;
  status?: number;
};

export type RouteConfig = {
  method: string;
  version: string;
  path: string;
  schema: Joi.Schema;
  middlewares: Function[];
  statusCode: number;
  hasSchema: boolean;
};
