import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { PiRocketLight } from 'react-icons/pi';
import { HiMiniCalendarDays } from 'react-icons/hi2';

import styles from './styles.module.scss';

type Props = {
  item: any;
};

export default function ReleaseCard({ item }: Props) {
  return (
    <Link className={clsx('card', styles.card)} to={item.href}>
      <div className="card__header">
        <div className="avatar">
          <div>
            <PiRocketLight className="avatar__photo" />
          </div>

          <div className="avatar__intro">
            <div className="avatar__name">{item.label}</div>
            <small className={clsx('avatar__subtitle', styles.cardDescription)}>
              <HiMiniCalendarDays />
              {item.date ?? ''}
            </small>
          </div>
        </div>
      </div>
    </Link>
  );
}
