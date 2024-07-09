import type { IconType } from 'react-icons';
import type {
  TeamItem,
  TeamItemLinkKeys,
  TeamListKeys,
} from '@site/src/types/team';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { FaXTwitter, FaMastodon, FaLinkedin, FaGithub } from 'react-icons/fa6';

import styles from './styles.module.scss';

import team from '@site/src/data/team.json';

const linkIcons: Record<TeamItemLinkKeys, IconType> = {
  x: FaXTwitter,
  mastodon: FaMastodon,
  linkedin: FaLinkedin,
  github: FaGithub,
};

type Props = {
  dataKey: TeamListKeys;
};

export default function TeamList({ dataKey }: Props) {
  const teamPart = (team[dataKey] as TeamItem[]) ?? [];

  return (
    <ul className={styles.list}>
      {teamPart.map((item, idx) => (
        <li key={`team-${dataKey}-${idx}`}>
          <div className={clsx('card', styles.card)}>
            <div className="card__header">
              <div className="avatar">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src={item.image}
                  alt={`${item.name} avatar`}
                />
                <div className="avatar__intro">
                  <div className="avatar__name">{item.name}</div>
                  {item.position ? (
                    <small className="avatar__subtitle">{item.position}</small>
                  ) : null}

                  <ul className={styles.avatarLinks}>
                    {item.links.map((link) => {
                      const Icon = linkIcons[link.name];

                      return (
                        <li key={`${link.href}`}>
                          <Link href={link.href} aria-label={link.name}>
                            <Icon />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
