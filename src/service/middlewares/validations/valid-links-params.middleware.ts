import { RequestHandler } from 'express';
import { LinksQueryParams } from '../../../service/policies/types/common.types';
import { ApiError } from '../../../common/errors/api-error';
import { SortBy, OrderBy } from '../../../common/util/constant';

export const validLinksParams: RequestHandler = async (req: any, _res, next) => {
  const { sortBy = SortBy.ID, orderBy = OrderBy.ASC } = req.query as LinksQueryParams;

  if (!Object.values(SortBy).includes(sortBy)) {
    return next(ApiError.BadRequest(`sortBy must be one of "${Object.values(SortBy).join(' | ')}"`));
  }

  if (!Object.values(OrderBy).includes(orderBy)) {
    return next(ApiError.BadRequest(`orderBy must be one of "${Object.values(OrderBy).join(' | ')}"`));
  }

  return next();
};
