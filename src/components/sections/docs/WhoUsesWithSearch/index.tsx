import { ChangeEvent, useState } from 'react';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import SearchInput from '@site/src/components/SearchInput';
import CompanyCard from '@site/src/components/CompanyCard';
import styles from './styles.module.scss';

import { useCompanies } from '@site/src/hooks/use-companies';

export default function WhoUsesWithSearch() {
  const [query, setQuery] = useState('');

  const { featuredUsers, allUsers } = useCompanies(query);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <section>
      <SearchInput
        value={query}
        placeholder="Filter by name or keyword"
        onInput={handleSearch}
      />

      <Tabs className={styles.sectionTabs} lazy>
        <TabItem
          value="featured"
          label={`Featured ${featuredUsers.length}`}
          default
        >
          <ul className={styles.sectionFeaturedList}>
            {featuredUsers.map((company, idx) => (
              <li key={`featured-${idx}`}>
                <CompanyCard company={company} />
              </li>
            ))}
          </ul>
        </TabItem>

        <TabItem value="all" label={`All ${allUsers.length}`}>
          <ul className={styles.sectionAllList}>
            {allUsers.map((company, idx) => (
              <li key={`all-${idx}`}>
                <Link href={company.url}>{company.name}</Link>
              </li>
            ))}
          </ul>
        </TabItem>
      </Tabs>
    </section>
  );
}
