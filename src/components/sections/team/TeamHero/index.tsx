import Translate from '@docusaurus/Translate';
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
        <h1 className={styles.sectionTitle}>
          <Translate>Team</Translate>
        </h1>

        <SectionDescription align="start">
          <p>
            <Translate
              values={{
                topListLink: (
                  <Link href="https://github.com/jhipster/generator-jhipster/graphs/contributors">
                    (top 100 list here)
                  </Link>
                ),
              }}
            >
              {
                'JHipster is developed by a team of people around the world. We have a lot of contributors {topListLink}, but members of the core team are listed here. If you want to join the team, or see how we work, our community rules are at the end of this page.'
              }
            </Translate>
          </p>
        </SectionDescription>

        <div className={styles.sectionTeam}>
          <SectionTitle align="start" size="sm">
            <Translate>Governing Body</Translate>
          </SectionTitle>

          <TeamList dataKey="governing" />
        </div>

        <div className={styles.sectionTeam}>
          <SectionTitle align="start" size="sm">
            <Translate>Project leads</Translate>
          </SectionTitle>

          <TeamList dataKey="leads" />
        </div>
      </div>
    </header>
  );
}
