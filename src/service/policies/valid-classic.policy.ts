import { RequestHandler } from 'express';
import { ApiError } from '../../common/errors/api-error';

export const validClassic: RequestHandler = async (req: any, _res, next) => {
  if (req.body?.data) {
    // @TODO: will be good to add schema validation and disallow additionalProperties
    return next(ApiError.BadRequest('Classic link type cannot have data property'));
  }
  return next();
};
