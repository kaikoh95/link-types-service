import { RequestHandler } from 'express';
import { User } from './types/mock-auth-user.types';

/**
 * Mocks the authentication middleware.
 * Creates fake authenticated user that would otherwise be done via express-jwt and auth0
 * and sets it to req.user
 */
export const mockAuthUser: RequestHandler = async (req: any, _res, next) => {
  const fakeUser: User = {
    userId: 'auth0|123123',
    name: 'user1',
    profilePicture: 'remote-s3-file-path.png',
    datetimeCreated: '1111-11-11T11:11:11.111Z',
    datetimeModified: '1111-11-11T11:11:11.111Z',
  };
  req.user = fakeUser;

  next();
};
