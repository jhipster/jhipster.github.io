import type { ModuleDownloadsChart } from '@site/src/types/marketplace';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import Loading from '@site/src/components/Loading';
import MarketplaceDetailsChart from './MarketplaceDetailsChart';
import styles from './styles.module.scss';

type Props = {
  moduleName: string;
  details: any;
  downloads: ModuleDownloadsChart[];
  isLoading: boolean;
};

export default function MarketplaceDetails({
  moduleName,
  details,
  downloads,
  isLoading,
}: Props) {
  return (
    <section className={styles.section}>
      <div className="container">
        {isLoading ? (
          <Loading />
        ) : !!details ? (
          <>
            {!details.description?.startsWith('[!') ? (
              <>
                <Heading as="h2">Description</Heading>
                <p>{details.description}</p>
              </>
            ) : null}

            <Heading as="h2">JHipster version compatibility</Heading>
            <p>
              This module works with JHipster version:{' '}
              <b>{generatorVersion(details)}</b>
            </p>

            <Heading as="h2">Links</Heading>
            <ul>
              {details.homepage ? (
                <li>
                  <Link href={details.homepage}>Project URL</Link>
                </li>
              ) : null}
              <li>
                <Link href={`https://www.npmjs.com/package/${moduleName}`}>
                  NPM package page
                </Link>
              </li>
            </ul>

            <div>
              <Heading as="h2">How to install</Heading>
              <CodeBlock>npm install -g {moduleName}</CodeBlock>
            </div>

            <Heading as="h2">Downloads for last month</Heading>
            <MarketplaceDetailsChart downloads={downloads} />
          </>
        ) : null}
      </div>
    </section>
  );
}

function generatorVersion(details: any) {
  const generator = 'generator-jhipster';

  if (details) {
    const devDepVal =
      details.devDependencies && generator in details.devDependencies
        ? details.devDependencies[generator]
        : '';

    const depVal =
      details.dependencies && generator in details.dependencies
        ? details.dependencies[generator]
        : '';

    return devDepVal.length > 0 ? devDepVal : depVal;
  }

  return '';
}
