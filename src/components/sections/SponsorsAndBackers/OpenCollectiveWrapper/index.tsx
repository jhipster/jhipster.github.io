import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  title: string;
  children: ReactNode;
};

export default function OpenCollectiveWrapper({ title, children }: Props) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>

      {children}
    </div>
  );
}
