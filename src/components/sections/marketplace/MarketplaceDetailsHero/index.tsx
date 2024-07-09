import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { HiOutlineUser } from 'react-icons/hi2';
import styles from './styles.module.scss';

import { getMaintainers, getModuleName } from '@site/src/lib/utils';

type Props = {
  moduleName: string;
  details: any;
};

export default function MarketplaceDetailsHero({ moduleName, details }: Props) {
  return (
    <header className={styles.section}>
      <div className="container">
        <Heading as="h1" className={styles.sectionTitle}>
          {getModuleName(moduleName)}
        </Heading>

        {!!details ? (
          <>
            {details.author ? (
              <p className={styles.sectionAuthor}>
                <HiOutlineUser />
                {details.author.url ? (
                  <Link href={details.author.url}>{details.author.name}</Link>
                ) : (
                  details.author.name
                )}
              </p>
            ) : null}

            {details.maintainers ? (
              <p>Maintained by: {getMaintainers(details.maintainers)}</p>
            ) : null}
            <p>Latest version: {details.version}</p>
          </>
        ) : null}
      </div>
    </header>
  );
}
