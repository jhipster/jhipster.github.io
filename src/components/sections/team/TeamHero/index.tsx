import Link from '@docusaurus/Link';

import {
  SectionDescription,
  SectionTitle,
} from '@site/src/components/ui/SectionWrapper';
import TeamList from '@site/src/components/sections/team/TeamList';

import styles from './styles.module.scss';

export default function TeamHero() {
  return (
    <header className={styles.section}>
      <div className="container">
        <h1 className={styles.sectionTitle}>Team</h1>

        <SectionDescription align="start">
          <p>
            JHipster is developed by a team of people around the world. We have
            a lot of contributors{' '}
            <Link href="https://github.com/jhipster/generator-jhipster/graphs/contributors">
              (top 100 list here)
            </Link>
            , but members of the core team are listed here. If you want to join
            the team, or see how we work, our community rules are at the end of
            this page.
          </p>
        </SectionDescription>

        <div className={styles.sectionTeam}>
          <SectionTitle align="start" size="sm">
            Governing Body
          </SectionTitle>

          <TeamList dataKey="governing" />
        </div>

        <div className={styles.sectionTeam}>
          <SectionTitle align="start" size="sm">
            Project leads
          </SectionTitle>

          <TeamList dataKey="leads" />
        </div>
      </div>
    </header>
  );
}
