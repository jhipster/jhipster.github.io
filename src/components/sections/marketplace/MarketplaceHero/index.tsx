import { ChangeEvent } from 'react';
import Heading from '@theme/Heading';

import SearchInput from '@site/src/components/SearchInput';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

type Props = {
  value: string;
  numberFilteredModules: number;
  numberModules: number;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function MarketplaceHero({
  value,
  numberFilteredModules = 0,
  numberModules = 0,
  handleSearch,
}: Props) {
  return (
    <header className={styles.section}>
      <div className="container">
        <Heading className={styles.sectionTitle} as="h1">
          Marketplace
        </Heading>

        <Heading as="h2">
          Available modules and blueprints (
          {`${numberFilteredModules}/${numberModules}`})
        </Heading>

        <SearchInput
          value={value}
          placeholder="Filter by name or keyword"
          onInput={handleSearch}
        />

        <div className={styles.sectionButtons}>
          <Link
            className="button button--primary"
            to="/modules/creating-a-module"
          >
            Create your own module
          </Link>
          <Link
            className="button button--secondary"
            to="/modules/creating-a-blueprint"
          >
            Create your own blueprint
          </Link>
        </div>
      </div>
    </header>
  );
}
