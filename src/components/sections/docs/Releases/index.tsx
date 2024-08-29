import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ReleaseCard from './ReleaseCard';
import styles from './styles.module.scss';

type Props = {
  items: any[];
  limit?: number;
};

export default function Releases({ items, limit = 12 }: Props) {
  return (
    <section className={styles.section}>
      <Tabs lazy>
        <TabItem value="latest-releases" label="Latest Releases" default>
          <ul className={styles.sectionList}>
            {items.slice(0, limit).map((item, idx) => (
              <li key={`release-${idx}`}>
                <ReleaseCard item={item} />
              </li>
            ))}
          </ul>
        </TabItem>

        <TabItem value="all-releases" label="All Releases">
          <ul className={styles.sectionList}>
            {items.map((item, idx) => (
              <li key={`release-${idx}`}>
                <ReleaseCard item={item} />
              </li>
            ))}
          </ul>
        </TabItem>
      </Tabs>
    </section>
  );
}
