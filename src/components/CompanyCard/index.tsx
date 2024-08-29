import type { Company } from '@site/src/types/company';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import styles from './styles.module.scss';

import { COMPANIES_ICONS_PATH } from '@site/src/constants';

type Props = {
  company: Company;
};

export default function CompanyCard({ company }: Props) {
  return (
    <Link className={clsx('card', styles.card)} href={company.url}>
      <div className="card__header">
        {company.icon ? (
          <div className="avatar">
            <div
              className={clsx(
                'avatar__photo avatar__photo--xl',
                styles.cardImageWrapper,
              )}
            >
              <img
                className={clsx(styles.cardImage)}
                src={`${COMPANIES_ICONS_PATH}/${company.icon}`}
                alt={company.name}
              />
            </div>

            <div className="avatar__intro">
              <div className="avatar__name">{company.name}</div>
              {company.category ? (
                <small className="avatar__subtitle">{company.category}</small>
              ) : null}
              {company.country ? (
                <small
                  className={clsx('avatar__subtitle', styles.cardDescription)}
                >
                  <HiOutlineLocationMarker />
                  {company.country}
                </small>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
