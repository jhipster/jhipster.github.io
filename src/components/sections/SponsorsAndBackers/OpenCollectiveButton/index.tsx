import Link from '@docusaurus/Link';

import styles from './styles.module.scss';

export default function OpenCollectiveButton() {
  return (
    <div className={styles.buttons}>
      <Link href="https://opencollective.com/generator-jhipster/donate">
        <img
          className={styles.button}
          src="/images/open-collective/button.png"
          alt="Donate"
          width={298}
          height={48}
          loading='lazy'
        />
      </Link>
    </div>
  );
}
