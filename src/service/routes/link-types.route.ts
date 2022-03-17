import { Router } from 'express';
import { validLinkTypesPolicy } from '../policies/valid-link-types.policy';
import { validCommonCreateLinkPolicy } from '../policies/valid-common-create-link.policy';
import { createLink } from '../middlewares/link-types/create-link.middleware';
import { getLinksByUserId } from '../middlewares/link-types/get-links-by-user-id.middleware';
import { validLinksParams } from '../middlewares/validations/valid-links-params.middleware';

const router = Router();

// @TODO add swagger docs
router.post('/link-types', validCommonCreateLinkPolicy, validLinkTypesPolicy, createLink);

router.get('/link-types', validLinksParams, getLinksByUserId);

export default router;
