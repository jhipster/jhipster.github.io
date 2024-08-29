import Link from '@docusaurus/Link';

import styles from './styles.module.scss';

import socialLinks from '@site/src/data/social-links';

export function SocialLinks() {
  return (
    <ul className={styles.socialLinks}>
      {socialLinks.map((item, idx) => {
        const Icon = item.icon;

        return (
          <li key={`social-link-${idx}`}>
            <Link href={item.href} aria-label={item.alt}>
              <Icon />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
