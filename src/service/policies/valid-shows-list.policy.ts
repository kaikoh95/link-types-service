import { NextFunction, RequestHandler } from 'express';
import { ApiError } from '../../common/errors/api-error';
import { LinkTypePayload } from './types/common.types';
import { Show, ShowsState } from './types/shows-list.types';

/**
 * Checks if each show in shows list link type has valid properties.
 * For simplicity, this assumes all properties to be required and
 * showsState has no correlation to datetimeStart of the show.
 */
const validateShowProperties = (show: Show, next: NextFunction) => {
  const { showsState, location, datetimeStart, duration } = show;
  const allowedStates = Object.values(ShowsState);

  if (!allowedStates.includes(showsState)) {
    return next(ApiError.BadRequest(`showsState must be one of "${allowedStates.join(' | ')}"`));
  }

  if (!location?.length) {
    return next(ApiError.BadRequest('location must be specified'));
  }

  if (!datetimeStart) {
    return next(ApiError.BadRequest('datetimeStart must be specified.'));
  }

  let datetime: Date;
  try {
    datetime = new Date(datetimeStart);
  } catch (err) {
    return next(ApiError.BadRequest('Invalid datetimeStart provided.'));
  }

  return true;
};

export const validShowsList: RequestHandler = (req: any, _res, next) => {
  const { data: shows } = req.body as LinkTypePayload<Show>;

  if (!shows || !Array.isArray(shows) || !shows?.length) {
    return next(ApiError.BadRequest('data must be specified as an array of Show  and cannot be empty when creating Shows List link type'));
  }

  shows.forEach((show: Show) => validateShowProperties(show, next));

  return next();
};
