import type { Company } from '@site/src/types/company';
import Link from '@docusaurus/Link';
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
          src={`${COMPANIES_LOGOS_PATH}/${company.logo}`}
          alt={company.name}
        />
      </div>
    </Link>
  );
}
