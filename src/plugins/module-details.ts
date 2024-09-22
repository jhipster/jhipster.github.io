import type { LoadContext } from '@docusaurus/types';
import { NPM_SEARCH_MODULES_URL } from '../constants';

import modulesConfig from '../data/modules-config.json';

function getModulesNames(modules: any): string[] {
  return modules.objects.reduce((acc: string[], val: { package: any }) => {
    if (!modulesConfig.blacklistedModules.includes(val.package.name)) {
      acc.push(val.package.name);
    }

    return acc;
  }, []);
}

export default function moduleDetailsPlugin(context: LoadContext) {
  return {
    name: 'docusaurus-module-details',
    async loadContent() {
      const url = `${NPM_SEARCH_MODULES_URL}&from=0&size=500`;

      try {
        const res = await fetch(url);
        const modules = await res.json();

        return getModulesNames(modules);
      } catch (err) {
        console.error(err);
        return [];
      }
    },
    async contentLoaded({ content, actions }) {
      const { addRoute } = actions;

      content.forEach((moduleName: string) => {
        addRoute({
          path: `${context.baseUrl}modules/marketplace/details/${moduleName}`,
          component:
            '@site/src/components/plugins-pages/MarketplaceDetailsPage/index.tsx',
        });
      });

      addRoute({
        path: '/modules/marketplace/details/*',
        component:
          '@site/src/components/plugins-pages/MarketplaceDetailsPage/index.tsx',
        priority: -1,
      });
    },
  };
}
