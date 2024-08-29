import { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import EmbeddedVideo from '@site/src/components/EmbeddedVideo';
import styles from './styles.module.scss';

type Props = {
  title: string;
  href?: string;
  image?: string;
  video?: string;
  children?: ReactNode;
};

export default function ContentMediaCard({
  title,
  href,
  image,
  video,
  children,
}: Props) {
  return (
    <div>
      {image ? (
        <div className={clsx('card', styles.cardImage)}>
          <img className="aspect-video" src={image} alt={title} />
        </div>
      ) : video ? (
        <EmbeddedVideo video={video} />
      ) : null}

      <h3 className={styles.cardTitle}>
        {href ? <Link href={href}>{title}</Link> : title}
      </h3>

      {children ? <div>{children}</div> : null}
    </div>
  );
}
