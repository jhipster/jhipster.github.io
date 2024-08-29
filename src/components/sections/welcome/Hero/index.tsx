import Link from '@docusaurus/Link';
import clsx from 'clsx';

import GithubButton from '@site/src/components/GithubButton';
import HeroFamily from '@site/static/images/logo/hero-family.svg';
import styles from './styles.module.scss';

export default function Hero() {
  return (
    <header className={styles.section}>
      <div className={clsx('container', styles.sectionContent)}>
        <div>
          <h1 className={styles.sectionTitle}>
            Greetings,
            <br /> Java <span className="text--primary">Hipster</span>!
          </h1>

          <p className={styles.sectionDescription}>
            JHipster is a development platform to quickly generate, develop,
            and deploy modern web applications & microservice architectures.
          </p>

          <div className={styles.sectionButtons}>
            <Link className="button button--primary" to="/getting-started">
              Getting Started
            </Link>
            <GithubButton>GitHub</GithubButton>
          </div>
        </div>

        <HeroFamily className={styles.sectionImage} />
      </div>
    </header>
  );
}
