import { RequestHandler } from 'express';
import { ApiError } from '../../../common/errors/api-error';

/**
 * Checks given string is a valid url.
 * Based on RFC 3886 - https://www.rfc-editor.org/rfc/rfc3986
 * @param urlString - string to test
 * @returns Boolean
 */
const isValidUrl = (urlString: string) => {
  let url;

  try {
    url = new URL(urlString);
  } catch (err) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const validUrl: RequestHandler = async (req: any, _res, next) => {
  const { url } = req.body;
  if (url && !isValidUrl(url)) {
    return next(ApiError.BadRequest('Invalid url specified'));
  }
  return next();
};
