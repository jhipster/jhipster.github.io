import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { HiOutlineCubeTransparent, HiOutlineUser } from 'react-icons/hi2';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import styles from './styles.module.scss';

import { useMarketplace } from '@site/src/hooks/use-marketplace';
import { getModuleName } from '@site/src/lib/utils';

export default function Modules() {
  const { modules } = useMarketplace('');

  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle>
        <Translate>Top trending modules and blueprints</Translate>
      </SectionTitle>

      <SectionDescription>
        <p>
          <Translate>
            You can get started and see all top trending modules and blueprints
            in the documentation
          </Translate>
        </p>
      </SectionDescription>

      <ul className={styles.sectionList}>
        {modules.slice(0, 9).map((item, idx) => (
          <li key={`module-${idx}`}>
            <Link
              className={clsx('card', styles.card)}
              to={`/modules/marketplace/details/${item.name}`}
            >
              <div className="card__header">
                <div className="avatar">
                  <div>
                    <HiOutlineCubeTransparent className="avatar__photo" />
                  </div>

                  <div className="avatar__intro">
                    <div className="avatar__name">
                      {getModuleName(item.name)}
                    </div>
                    {item.author?.url ? (
                      <small
                        className={clsx(
                          'avatar__subtitle',
                          styles.cardDescription,
                        )}
                      >
                        <HiOutlineUser />
                        {item.author.name}
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.sectionButtons}>
        <Link className="button button--primary" to="/modules/marketplace">
          <Translate>See all Modules and Blueprints</Translate>
        </Link>
        <Link
          className="button button--secondary"
          to="/modules/creating-a-module"
        >
          <Translate>Getting Started</Translate>
        </Link>
      </div>
    </SectionWrapper>
  );
}
