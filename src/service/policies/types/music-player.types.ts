export enum SupportedPlatforms {
  SPOTIFY = 'spotify',
  APPLE_MUSIC = 'apple music',
  SOUNDCLOUD = 'soundcloud',
}

export interface MusicPlayer {
  platform: SupportedPlatforms;
  platformLink: string;
  audioFilepath: string;
  audioName: string;
};
