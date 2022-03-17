import { RequestHandler } from 'express-serve-static-core';
import { validTitle } from '../middlewares/validations/valid-title.middleware';
import { validUrl } from '../middlewares/validations/valid-url.middleware';

export const validCommonCreateLinkPolicy: RequestHandler[] = [validTitle, validUrl];
