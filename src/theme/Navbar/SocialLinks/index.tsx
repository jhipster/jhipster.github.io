import Link from '@docusaurus/Link';
import clsx from 'clsx';

import styles from './styles.module.scss';

import socialLinks from '@site/src/data/social-links';

type Props = {
  className?: string;
};

export default function SocialLinks({ className }: Props) {
  return (
    <ul className={clsx(styles.socialLinks, className)}>
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
