import type { Company } from '@site/src/types/company';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.scss';

import { COMPANIES_LOGOS_PATH } from '@site/src/constants';

type Props = {
  company: Company;
};

export default function CompanyLogo({ company }: Props) {
  return (
    <Link className={clsx('card', styles.card)} href={company.url}>
      <div className={clsx('card__body', styles.cardBody)}>
        <img
          className={styles.cardImage}
          src={useBaseUrl(`${COMPANIES_LOGOS_PATH}/${company.logo}`)}
          alt={company.name}
          width={100}
          height={50}
          loading="lazy"
        />
      </div>
    </Link>
  );
}
