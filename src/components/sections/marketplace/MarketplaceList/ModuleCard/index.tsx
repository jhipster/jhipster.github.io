import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { HiMiniCalendarDays, HiOutlineUser } from 'react-icons/hi2';

import styles from './styles.module.scss';

import { formatDate, getMaintainers, getModuleName } from '@site/src/lib/utils';

type Props = {
  module: any;
};

export default function ModuleCard({ module }: Props) {
  return (
    <div className={clsx('card', styles.card)}>
      <div className={clsx('card__header', styles.cardHeader)}>
        <h3>{getModuleName(module.name)}</h3>

        {module.author?.url ? (
          <p className={styles.cardAuthor}>
            <HiOutlineUser />
            <Link href={module.author.url}>{module.author.name}</Link>
          </p>
        ) : null}
      </div>

      <div className={clsx('card__body', styles.cardBody)}>
        <p>Maintained by: {getMaintainers(module.maintainers)}</p>

        {!module.description?.startsWith('[!') ? (
          <p>{module.description}</p>
        ) : null}

        <ul className={styles.cardKeywords}>
          {module.keywords.map((keyword: string, idx: number) => (
            <li key={`keyword-${idx}`}>
              <span className={clsx('badge', getKeywordVariant(keyword))}>
                {keyword}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={clsx('card__footer', styles.cardFooter)}>
        <span className={styles.cardDate}>
          <HiMiniCalendarDays />
          <span>{formatDate(module.date)}</span>
        </span>

        <div className={styles.cardButtons}>
          <Link
            className="button button--secondary button--sm"
            href={`/modules/marketplace/details/${module.name}`}
          >
            Details
          </Link>
          <Link
            className="button button--secondary button--sm"
            href={module.links.homepage ?? module.links.npm}
          >
            Home page
          </Link>
        </div>
      </div>
    </div>
  );
}

function getKeywordVariant(keyword: string) {
  switch (keyword) {
    case 'jhipster-blueprint':
      return 'badge--success';
    case 'jhipster-module':
      return 'badge--danger';
    default:
      return 'badge--secondary';
  }
}
