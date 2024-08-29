import Link from '@docusaurus/Link';
import clsx from 'clsx';

import { SocialLinks } from './SocialLinks';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer>
      <div className={clsx('', styles.footerContent)}>
        <div className={styles.footerCopyright}>
          <span>&copy; 2013-{new Date().getFullYear()} JHipster</span>
          <Link to="/policies">Policies</Link>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
