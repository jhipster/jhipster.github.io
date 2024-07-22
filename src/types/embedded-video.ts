export type EmbeddedVideoFormat = 'webp' | 'jpg';

/**
 * Lowest quality thumbnail (120x90)
 * default
 *
 * Medium quality thumbnail (320x180)
 * mqdefault
 *
 * High quality thumbnail (480x360)
 * hqdefault
 *
 * Standard quality thumbnail (640x480)
 * sddefault
 *
 * Unscaled thumbnail resolution
 * maxresdefault
 */
export type EmbeddedVideoQuality =
  | 'default'
  | 'mqdefault'
  | 'hqdefault'
  | 'sddefault'
  | 'maxresdefault';
