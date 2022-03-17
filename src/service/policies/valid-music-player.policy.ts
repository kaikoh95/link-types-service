import { NextFunction, RequestHandler } from 'express';
import { ApiError } from '../../common/errors/api-error';
import { MusicPlayer, SupportedPlatforms } from './types/music-player.types';
import { LinkTypePayload } from './types/common.types';

/**
 * Checks if each music player in music player link type has valid properties.
 * For simplicity, this assumes all properties to be required
 */
const validateMusicPlayerProperties = (musicPlayer: MusicPlayer, next: NextFunction) => {
  const {
    platform, platformLink, audioFilepath, audioName,
  } = musicPlayer;
  const supportedPlatforms = Object.values(SupportedPlatforms);

  if (!supportedPlatforms.includes(platform)) {
    return next(ApiError.BadRequest(`platform must be one of "${supportedPlatforms.join(' | ')}"`));
  }

  if (!(platformLink?.length && audioFilepath?.length && audioName?.length)) {
    return next(ApiError.BadRequest('Missing one or more required properties for Music Player link type'));
  }

  return true;
};

export const validMusicPlayer: RequestHandler = (req: any, _res, next) => {
  const { data: musicPlayers } = req.body as LinkTypePayload<MusicPlayer>;

  if (!musicPlayers || !Array.isArray(musicPlayers) || !musicPlayers?.length) {
    return next(ApiError.BadRequest('data must be specified as an array of MusicPlayer and cannot be empty when creating Music Player link type'));
  }

  musicPlayers.forEach((musicPlayer: MusicPlayer) => validateMusicPlayerProperties(musicPlayer, next));

  return next();
};
