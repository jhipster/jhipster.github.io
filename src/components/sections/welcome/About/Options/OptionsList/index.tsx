import type { OptionsListKeys } from '@site/src/types/options';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.scss';

import options from '@site/src/data/options.json';

type Props = {
  title: string;
  dataKey: OptionsListKeys;
};

export default function OptionsList({ title, dataKey }: Props) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>

      <div className={styles.sectionList}>
        {options[dataKey].map((item, idx) => (
          <div key={`${dataKey}-${idx}`} className={clsx('card', styles.card)}>
            <div className={clsx('card__image', styles.cardImage)}>
              <img
                src={useBaseUrl(item.image)}
                alt={item.label}
                width={45}
                height={45}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
