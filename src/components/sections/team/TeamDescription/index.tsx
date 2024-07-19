import Link from '@docusaurus/Link';
import clsx from 'clsx';

import FamilyTeam from '@site/static/images/logo/family_team.svg';
import FamilyMember8 from '@site/static/images/logo/jhipster_family_member_8.svg';
import FamilyMember2 from '@site/static/images/logo/jhipster_family_member_2.svg';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import styles from './styles.module.scss';

export default function TeamDescription() {
  return (
    <SectionWrapper className={styles.section}>
      {/* Where does the development team work? */}
      <div className={styles.sectionContent}>
        <FamilyTeam className={styles.sectionContentImage} />

        <div className={styles.sectionContentDescription}>
          <SectionTitle className={styles.sectionContentTitle} align="start">
            Where does the development team work?
          </SectionTitle>

          <SectionDescription align="start">
            <p>
              We do most of our work on{' '}
              <Link href="https://github.com/jhipster/generator-jhipster">
                the project’s GitHub page
              </Link>
              .
            </p>

            <p>Internal team discussions happen in the following channels:</p>
            <ul>
              <li>
                The{' '}
                <Link href="https://groups.google.com/forum/?hl=en#!forum/jhipster-dev">
                  jhipster-dev mailing list
                </Link>
              </li>
              <li>
                The{' '}
                <Link href="https://gitter.im/jhipster/jhipster-dev-team">
                  jhipster-dev-team Gitter chat
                </Link>
              </li>
            </ul>

            <p>
              Those discussion channels are publicly viewable, as everything we
              do in JHipster is public, but only the board of developers can
              participate. The mailing list archives can be found on the{' '}
              <Link href="https://groups.google.com/forum/?hl=en#!forum/jhipster-dev">
                Google groups page
              </Link>{' '}
              and the{' '}
              <Link href="https://gitter.im/jhipster/jhipster-dev-team/archives/all">
                chat archives
              </Link>{' '}
              are available on Gitter.
            </p>
          </SectionDescription>
        </div>
      </div>

      {/* How to join the board of developers? */}
      <div
        className={clsx(styles.sectionContent, styles.sectionContentReverse)}
      >
        <FamilyMember8 className={styles.sectionContentImage} />

        <div className={styles.sectionContentDescription}>
          <SectionTitle className={styles.sectionContentTitle} align="start">
            How to join the board of developers?
          </SectionTitle>

          <SectionDescription align="start">
            <ul>
              <li>Participate regularly in the project (commits, PRs, etc)</li>
              <li>
                Ask someone from the current board, with some bio and background
                information, and that person will submit a vote on the dev
                mailing list
              </li>
              <li>
                Everybody on the dev mailing list can vote (+1 if they agree, -1
                if they don’t)
                <ul>
                  <li>
                    One “-1” vote will decline adding the new member, but the
                    person who votes “-1” will need to explain why
                  </li>
                </ul>
              </li>
            </ul>
          </SectionDescription>
        </div>
      </div>

      {/* What do people in the board of developers gain? */}
      <div className={styles.sectionContent}>
        <FamilyMember2 className={styles.sectionContentImage} />

        <div className={styles.sectionContentDescription}>
          <SectionTitle className={styles.sectionContentTitle} align="start">
            What do people in the board of developers gain?
          </SectionTitle>

          <SectionDescription align="start">
            <ul>
              <li>
                Write access to the main repository, and to most of the projects
                under the{' '}
                <Link href="https://github.com/jhipster">
                  JHipster organization
                </Link>
                .
              </li>
              <li>
                Costs associated with the project (for example travel costs to
                come to a JHipster conference) can be paid by{' '}
                <Link href="https://opencollective.com/generator-jhipster">
                  our OpenCollective account
                </Link>
                . This depends on the money available on the account, and this
                is decided and validated by the project leads.
              </li>
              <li>
                Free licenses and free quotas that the project regularly gets
                from friendly companies.
              </li>
            </ul>
          </SectionDescription>
        </div>
      </div>
    </SectionWrapper>
  );
}
