import { RequestHandler } from 'express-serve-static-core';
import { LinksQueryParams, LinkTypePayload, UserLinks } from '../../policies/types/common.types';
import { cache } from '../../../common/util/cache';
import { LinkTypes, OrderBy, SortBy } from '../../../common/util/constant';
import { User } from '../../../common/policies/types/mock-auth-user.types';

// if we use a DP repository, sortBy and orderBy can be handled much simpler
const sortAndOrderResponse = (response: LinkTypePayload[], sortBy: string, orderBy: string) => {
  response.sort((a, b) => {
    if (orderBy === OrderBy.DESC) {
      // @TODO fix edge case where value to sort is a string containing numbers - this should
      // be treated as string but is not
      if (typeof a[sortBy] === 'string') {
        return (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0);
      }
      return b[sortBy] - a[sortBy];
    }

    if (typeof a[sortBy] === 'string') {
      return (a[sortBy] < b[sortBy]) ? -1 : ((b[sortBy] < a[sortBy]) ? 1 : 0);
    }
    return a[sortBy] - b[sortBy];
  });
  return response;
};

export const getLinksByUserId: RequestHandler = async (req: any, res, _next) => {
  const { sortBy = SortBy.ID, orderBy = OrderBy.ASC } = req.query as LinksQueryParams;
  const { userId } = req.user as User;

  // @TODO read from redis cache

  // mimic find from DB by user ID
  const userLinks: UserLinks = JSON.parse(await cache.get(userId) || '{}');
  if (!userLinks) {
    return res.json([]);
  }

  let response: LinkTypePayload[] = [];

  // can add more advanced filters to only query for an array of specific Link Type
  Object.keys(userLinks).forEach((key: LinkTypes) => {
    response = response.concat(userLinks[key]);
  });

  response = sortAndOrderResponse(response, sortBy, orderBy);

  // @TODO save into redis cache

  return res.json(response);
};
