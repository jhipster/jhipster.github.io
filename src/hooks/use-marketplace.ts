import type {
  ModuleDownloads,
  ModuleDownloadsChart,
} from '@site/src/types/marketplace';
import { useEffect, useState } from 'react';

import { modulesService } from '@site/src/lib/services/modules';

// Marketplace list
export const useMarketplace = (query: string) => {
  const [modules, setModules] = useState<any[]>([]);
  const [filteredModules, setFilteredModules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    modulesService
      .getAllModules()
      .then((modules) => setModules(modules))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredModules(filterModules(modules, query));
  }, [modules, query]);

  return { modules, filteredModules, isLoading };
};

function filterText(item: any, query: string) {
  const queryValue = query.toLowerCase();

  return (
    item.name.toLowerCase().includes(queryValue) ||
    item.keywords.includes(queryValue)
  );
}

function filterModules(modules: any[], query: string) {
  return query.length
    ? modules.filter((item) => filterText(item, query))
    : modules;
}

// Marketplace module/blueprint details
export const useMarketplaceDetails = (moduleName: string) => {
  const [details, setDetails] = useState<any>();
  const [downloads, setDownloads] = useState<ModuleDownloadsChart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidRoute, setIsValidRoute] = useState(true);

  useEffect(() => {
    modulesService.getModulesNames().then((data) => {
      setIsValidRoute(data.includes(moduleName));
    });
  }, []);

  useEffect(() => {
    if (isValidRoute) {
      setIsLoading(true);

      Promise.all([
        modulesService.getNpmInfo(moduleName),
        modulesService.getNpmDownloadsRangeLastMonth(moduleName),
      ])
        .then(([detailsData, downloadsData]) => {
          setDetails(detailsData);

          if (downloadsData?.downloads) {
            const mappedDownloads = getMappedModuleDownloads(downloadsData);

            setDownloads(mappedDownloads);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return { details, downloads, isLoading, isValidRoute };
};

function getMappedModuleDownloads(data: {
  downloads: ModuleDownloads[];
}): ModuleDownloadsChart[] {
  return data.downloads.map((item: ModuleDownloads) => [
    item.day,
    item.downloads,
  ]);
}
