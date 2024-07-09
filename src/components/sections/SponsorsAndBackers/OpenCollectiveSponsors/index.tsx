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
      <ul className={styles.sectionList}>
        {sponsors.map((item, idx) => (
          <li key={`sponsor-${idx}`}>
            <Link href={item.website ?? item.profile}>
              <div className={clsx('card', styles.card)}>
                <div className={clsx('card__image', styles.cardImage)}>
                  <img
                    className="truncate"
                    src={
                      item.image ??
                      `/images/open-collective/${item.name.toLowerCase()}.png`
                    }
                    alt={item.name}
                    width={70}
                    height={70}
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </OpenCollectiveWrapper>
  );
}
