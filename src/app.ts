import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { ApiError } from './common/errors/api-error';
import logger from './common/util/logger';

// API Service Routes
import linkTypesRoutes from './service/routes/link-types.route';
import { rateLimitHandler } from './common/policies/rate-limiter.policy';
import { mockAuthUser } from './common/policies/mock-auth-user.policy';

const app = express();

// Common express settings
app.enable('trust proxy');
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Common Policies
const commonPolicies = [rateLimitHandler, mockAuthUser];
app.use(commonPolicies);

app.use('/api/v1', linkTypesRoutes);

// Middlewares to catch errors
app.use((req: Request, _res: Response, next: NextFunction) => {
  const err = new ApiError(`Not Found ${req.method} ${req.originalUrl}`);
  err.name = 'URL_NOT_FOUND';
  err.status = 404;
  next(err);
});

app.use((err: ApiError, _req: Request, res: Response, next: NextFunction) => {
  if (err?.status === 500) {
    logger.error(`${err?.name} : ${err?.message}`);
  } else if (err?.status !== 404) {
    logger.warn(`HTTP${err?.status} : ${err?.name} : ${err?.message}`);
  }
  if (res.headersSent) {
    return next(err);
  }
  if (err?.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 401,
      name: err.name,
      message: 'Unauthorized or Expired API Token',
    });
  }
  return res.status(err?.status || 500).json(err);
});

// Listen on port
app.listen(process.env.PORT || 3000);
logger.info(`Link Types API Service listening on ${(process.env.PORT || 3000)} ${process.env.APP_ENV || 'local'}`);

export default app;
