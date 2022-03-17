import { RequestHandler } from 'express-serve-static-core';
import { LinkTypePayload, UserLinks } from '../../../service/policies/types/common.types';
import { cache } from '../../../common/util/cache';
import { APP_TTL } from '../../../common/util/constant';

let ID = 0; // since LocalCache resets on each reboot, we can just use in-memory variable to mimic DB ID

export const createLink: RequestHandler = async (req: any, res, _next) => {
  // save to LocalCache to mimic DB persistency
  // @TODO: will be good to add schema validation to check/remove unwanted properties
  const now = new Date().toISOString();
  const payload: LinkTypePayload = {
    ...req.body,
    datetimeModified: now,
    datetimeCreated: now,
    datetimeDeleted: null,
    id: ID,
    ownerId: req.user.userId,
    title: req.body.title ?? req.body.linkType.split('-')[0], // defaults to first word of linkType
  };

  // mimic save to DB
  const userLinks: UserLinks = JSON.parse(await cache.get(payload.ownerId) || '{}');
  if (userLinks[payload.linkType]) {
    userLinks[payload.linkType].push(payload);
  } else {
    userLinks[payload.linkType] = [payload];
  }
  cache.set(payload.ownerId, JSON.stringify(userLinks), APP_TTL);

  ID += 1; // mimic ID increment in DB

  res.json(payload);
};
