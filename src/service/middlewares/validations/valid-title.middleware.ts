import { RequestHandler } from 'express';
import { inRange } from 'lodash';
import { ApiError } from '../../../common/errors/api-error';

export const validTitle: RequestHandler = async (req: any, _res, next) => {
  const [min, max] = [1, 144];
  const { title } = req.body;
  if (title && !inRange(title?.length, min, max + 1)) {
    return next(ApiError.BadRequest(`title must be between ${min} and ${max} characters`));
  }
  return next();
};
