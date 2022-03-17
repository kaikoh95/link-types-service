import rateLimit, { RateLimitExceededEventHandler, RateLimitRequestHandler } from 'express-rate-limit';
import { ApiError } from '../errors/api-error';
import logger from '../util/logger';
import { API_CALLS_LIMIT, API_CALLS_WINDOW, RequestHeaderKey } from '../util/constant';

const getApiCallKey = (req: any) => {
  const xApiKey = req.headers[RequestHeaderKey.X_API_KEY];
  if (xApiKey) {
    return `${RequestHeaderKey.X_API_KEY} - ${xApiKey}`;
  }
  // fallback to IP if no x-api-key header
  const headerXForwardedFor = req.headers[RequestHeaderKey.X_FORWARDED_FOR]?.split(',');
  const requestIp = (headerXForwardedFor && headerXForwardedFor[0]) || req.connection?.remoteAddress || req.ip || '';
  return `IP - ${requestIp}`;
};

const handleLimitReached: RateLimitExceededEventHandler = async (req: any, res, next) => {
  const requestType = getApiCallKey(req);
  logger.warn(`Too many requests attempted via ${requestType}.`);
  next(ApiError.TooManyRequests());
};

export const rateLimitHandler: RateLimitRequestHandler = rateLimit({
  windowMs: API_CALLS_WINDOW, // Window period of each limit reset
  max: API_CALLS_LIMIT, // Limit to X requests per `window` as defined in windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req: any) => getApiCallKey(req),
  handler: handleLimitReached,
});
