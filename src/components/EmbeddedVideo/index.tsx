import { useState } from 'react';

import Video from './Video';
import Poster from './Poster';

type Props = {
  video: string;
  title?: string;
};

export default function EmbeddedVideo({
  video,
  title = 'Embedded youtube',
}: Props) {
  const [preconnect, setPreconnect] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const posterVideoId = video.split('?')[0];
  const posterUrl = `https://i.ytimg.com/vi_webp/${posterVideoId}/maxresdefault.webp`;

  const handlePreconnect = () => {
    if (preconnect) return;

    setPreconnect(true);
  };

  const handleShowIframe = () => {
    if (showIframe) return;

    setShowIframe(true);
  };

  return (
    <>
      <link rel="preload" href={posterUrl} as="image" />
      {preconnect ? (
        <>
          <link rel="preconnect" href="https://www.youtube.com" />
          <link rel="preconnect" href="https://www.google.com" />
        </>
      ) : null}

      {showIframe ? (
        <Video video={video} title={title} />
      ) : (
        <Poster
          posterUrl={posterUrl}
          onPointerOver={handlePreconnect}
          onClick={handleShowIframe}
        />
      )}
    </>
  );
}
