import { RequestHandler } from 'express';

/**
 * Simply policy to call next. Used mainly when there are no other policies to run in
 * an array of RequestHandler
 */
export const pass: RequestHandler = (_req, _res, next) => {
  next();
};
