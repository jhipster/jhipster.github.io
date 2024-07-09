import Translate from '@docusaurus/Translate';
// import Link from '@docusaurus/Link';
import clsx from 'clsx';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import styles from './styles.module.scss';

export default function CompaniesSupporting() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle>
        <Translate>Companies Supporting JHipster</Translate>
      </SectionTitle>

      <SectionDescription>
        <p>
          <Translate>
            If you wish your company to be added here, don&apos;t hesitate to
            reach out to us and explain why.
          </Translate>
        </p>
      </SectionDescription>

      {/*<p className="text--center">
        <Translate>
          This support consists of: Time for development by core contributors
          (Okta)
        </Translate>
      </p>*/}

      <ul className={styles.sectionList}>
        {/*<li>
          <Link href="https://auth0.com/blog/micro-frontends-for-java-microservices/">
            <div className={clsx('card', styles.card)}>
              <div className="card__body">
                <div className="card__image">
                  <img src="/images/support/okta.png" alt="Okta" />
                </div>
              </div>
            </div>
          </Link>
        </li>*/}
        <li>
          <div className={clsx('card', styles.cardMock)}>
            <div className={clsx('card__body', styles.cardMockBody)}>
              <h3>
                <Translate>Your company</Translate>
              </h3>
            </div>
          </div>
        </li>
      </ul>
    </SectionWrapper>
  );
}
