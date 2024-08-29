import { ChangeEvent, useState } from 'react';
import Layout from '@theme/Layout';

import MarketplaceHero from '@site/src/components/sections/marketplace/MarketplaceHero';
import MarketplaceList from '@site/src/components/sections/marketplace/MarketplaceList';

import { useMarketplace } from '@site/src/hooks/use-marketplace';

export default function MarketplacePage() {
  const [query, setQuery] = useState('');
  const { modules, filteredModules, isLoading } = useMarketplace(query);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <Layout
      title="Marketplace"
      description="Marketplace of JHipster Modules and Blueprints"
    >
      <MarketplaceHero
        value={query}
        numberFilteredModules={filteredModules.length}
        numberModules={modules.length}
        handleSearch={handleSearch}
      />

      <main>
        <MarketplaceList
          isLoading={isLoading}
          filteredModules={filteredModules}
        />
      </main>
    </Layout>
  );
}
