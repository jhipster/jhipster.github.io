import Layout from '@theme/Layout';
import { Redirect, useLocation } from '@docusaurus/router';

import MarketplaceDetailsHero from '@site/src/components/sections/marketplace/MarketplaceDetailsHero';
import MarketplaceDetails from '@site/src/components/sections/marketplace/MarketplaceDetails';

import { useMarketplaceDetails } from '@site/src/hooks/use-marketplace';

export default function MarketplaceDetailsPage() {
  const location = useLocation();
  const moduleName = getModuleNameFromPath(location.pathname);

  const { details, downloads, isLoading, isValidRoute } =
    useMarketplaceDetails(moduleName);

  if (!moduleName.length) {
    return <Redirect to="/modules/marketplace/" />;
  }

  if (!isValidRoute) {
    return <Redirect to="/404/" />;
  }

  return (
    <Layout title={moduleName}>
      <MarketplaceDetailsHero moduleName={moduleName} details={details} />

      <main>
        <MarketplaceDetails
          moduleName={moduleName}
          details={details}
          downloads={downloads}
          isLoading={isLoading}
        />
      </main>
    </Layout>
  );
}

function getModuleNameFromPath(pathname: string) {
  const pathParts = pathname.split('/');

  if (pathParts[4].startsWith('@')) {
    return pathParts
      .slice(4)
      .filter((item) => !!item.length)
      .join('/');
  }

  return pathParts[4];
}

// function getReadMeParams(info: any) {
//   const repository = info.repository;
//   const repositoryUrl =
//     repository && repository.url ? repository.url : repository;
//   // we will look only for github repo pattern assuming all modules will be in github
//   const repoUrl = repositoryUrl
//     ? repositoryUrl.replace(/((git)?\+?(https?)?){1}:\/\/github.com\//gi, '')
//     : false;

//   const author = repoUrl ? repoUrl.split('/')[0] : false;
//   const repo = repoUrl ? repoUrl.split('/')[1].replace('.git', '') : info.name;
//   const versions = [`v${info.version}`, info.version, 'master'];

//   return { author, repo, versions };
// }

// async function fetchReadMe(info: any) {
//   let readMe = null;
//   const { author, repo, versions } = getReadMeParams(info);

//   if (author && repo) {
//     for (const version of versions) {
//       let isFetched = false;

//       await getReadme(author, repo, version).then((data) => {
//         if (data) {
//           readMe = data;
//           isFetched = true;
//         }
//       });

//       if (isFetched) break;
//     }
//   }

//   return readMe;
// }
