import type { OpenCollectiveSponsor } from '@site/src/types/opencollective';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import OpenCollectiveWrapper from '../OpenCollectiveWrapper';
import styles from './styles.module.scss';

type Props = {
  title: string;
  sponsors: OpenCollectiveSponsor[];
};

export default function OpenCollectiveSponsors({ title, sponsors }: Props) {
  if (!sponsors.length) return null;

  return (
    <OpenCollectiveWrapper title={title}>
      <div className={styles.sectionList}>
        {sponsors.map((item, idx) => (
          <Link key={`sponsor-${idx}`} href={item.website ?? item.profile}>
            <div className={clsx('card', styles.card)}>
              <div className={clsx('card__image', styles.cardImage)}>
                <img
                  className="truncate"
                  src={
                    item.image ??
                    require(
                      `@site/static/images/open-collective/${item.name.toLowerCase()}.png`,
                    ).default
                  }
                  alt={item.name}
                  width={70}
                  height={70}
                  loading="lazy"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </OpenCollectiveWrapper>
  );
}
