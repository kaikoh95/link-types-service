import { NextFunction, RequestHandler } from 'express';
import { LinkTypes } from '../../common/util/constant';
import { ApiError } from '../../common/errors/api-error';
import { validShowsList } from './valid-shows-list.policy';
import { validMusicPlayer } from './valid-music-player.policy';
import { validClassic } from './valid-classic.policy';

/**
 * Validates each link type based on their individual specifications.
 * Wanted to use object literals but couldn't get it to work
 * so I settled on switch-case here, any suggestions?
 */
export const validLinkTypesPolicy: RequestHandler = (req: any, res: any, next: NextFunction) => {
  const { linkType } = req.body;

  switch (linkType) {
    case LinkTypes.CLASSIC:
      return validClassic(req, res, next);

    case LinkTypes.SHOWS_LIST:
      return validShowsList(req, res, next);

    case LinkTypes.MUSIC_PLAYER:
      return validMusicPlayer(req, res, next);

    default:
      return next(ApiError.BadRequest(`linkType must be one of "${Object.values(LinkTypes).join(' | ')}"`));
  }
};
