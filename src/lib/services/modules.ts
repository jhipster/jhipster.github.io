import { createLocalStorageCache } from '@site/src/lib/cache';
import { fetchModules } from '@site/src/lib/fetch-modules';

import modulesConfig from '@site/src/data/modules-config.json';

const ALL_MODULES_CACHE_KEY = 'all-modules';
const ALL_MODULES_CACHE_TTL = 1000 * 60 * 60; // Cache ttl 1 hour

function getMappedModules(modules: any) {
  return modules.objects.reduce((acc: any[], val: { package: any }) => {
    if (!modulesConfig.blacklistedModules.includes(val.package.name)) {
      acc.push(val.package);
    }

    return acc;
  }, []);
}

function getModulesService() {
  const modulesCache = createLocalStorageCache();

  async function getAllModules() {
    try {
      if (modulesCache.has(ALL_MODULES_CACHE_KEY)) {
        return modulesCache.get(ALL_MODULES_CACHE_KEY) ?? [];
      }

      const modules = await fetchModules();
      const mappedModules = getMappedModules(modules);

      modulesCache.set(
        ALL_MODULES_CACHE_KEY,
        mappedModules,
        ALL_MODULES_CACHE_TTL,
      );

      return mappedModules;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async function getModulesNames() {
    const modules = await getAllModules();

    return modules.map((module: any) => module.name);
  }

  async function getNpmInfo(npmPackageName: string) {
    const url = `https://registry.npmjs.org/${npmPackageName}/latest`;

    try {
      const res = await fetch(url);

      return res.json();
    } catch (err) {
      console.error(err);
    }
  }

  async function getNpmDownloadsRangeLastMonth(name: string) {
    const url = `https://api.npmjs.org/downloads/range/last-month/${name}`;

    try {
      const res = await fetch(url);

      return res.json();
    } catch (err) {
      console.error(err);
    }
  }

  // async function getReadme(author: string, repo: string, version: string) {
  //   const url = `https://raw.githubusercontent.com/${author}/${repo}/${version}/README.md`;

  //   try {
  //     const res = await fetch(url);

  //     if (res.ok) {
  //       return res.text();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return {
    getAllModules,
    getModulesNames,
    getNpmInfo,
    getNpmDownloadsRangeLastMonth,
  };
}

export const modulesService = getModulesService();
