import Translate from '@docusaurus/Translate';
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
            <Translate>Where does the development team work?</Translate>
          </SectionTitle>

          <SectionDescription align="start">
            <p>
              <Translate
                values={{
                  githubLink: (
                    <Link href="https://github.com/jhipster/generator-jhipster">
                      the project’s GitHub page
                    </Link>
                  ),
                }}
              >
                {'We do most of our work on {githubLink}.'}
              </Translate>
            </p>

            <p>
              <Translate>
                Internal team discussions happen in the following channels:
              </Translate>
            </p>
            <ul>
              <li>
                <Translate
                  values={{
                    mailingListLink: (
                      <Link href="https://groups.google.com/forum/?hl=en#!forum/jhipster-dev">
                        jhipster-dev mailing list
                      </Link>
                    ),
                  }}
                >
                  {'The {mailingListLink}'}
                </Translate>
              </li>
              <li>
                <Translate
                  values={{
                    gitterChatLink: (
                      <Link href="https://gitter.im/jhipster/jhipster-dev-team">
                        jhipster-dev-team Gitter chat
                      </Link>
                    ),
                  }}
                >
                  {'The {gitterChatLink}'}
                </Translate>
              </li>
            </ul>

            <p>
              <Translate
                values={{
                  googleGroupsLink: (
                    <Link href="https://groups.google.com/forum/?hl=en#!forum/jhipster-dev">
                      Google groups page
                    </Link>
                  ),
                  chatArchivesLink: (
                    <Link href="https://gitter.im/jhipster/jhipster-dev-team/archives/all">
                      chat archives
                    </Link>
                  ),
                }}
              >
                {
                  'Those discussion channels are publicly viewable, as everything we do in JHipster is public, but only the board of developers can participate. The mailing list archives can be found on the {googleGroupsLink} and the {chatArchivesLink} are available on Gitter.'
                }
              </Translate>
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
            <Translate>How to join the board of developers?</Translate>
          </SectionTitle>

          <SectionDescription align="start">
            <ul>
              <li>
                <Translate>
                  Participate regularly in the project (commits, PRs, etc)
                </Translate>
              </li>
              <li>
                <Translate>
                  Ask someone from the current board, with some bio and
                  background information, and that person will submit a vote on
                  the dev mailing list
                </Translate>
              </li>
              <li>
                <Translate>
                  Everybody on the dev mailing list can vote (+1 if they agree,
                  -1 if they don’t)
                </Translate>
                <ul>
                  <li>
                    <Translate>
                      One “-1” vote will decline adding the new member, but the
                      person who votes “-1” will need to explain why
                    </Translate>
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
            <Translate>
              What do people in the board of developers gain?
            </Translate>
          </SectionTitle>

          <SectionDescription align="start">
            <ul>
              <li>
                <Translate
                  values={{
                    organizationLink: (
                      <Link href="https://github.com/jhipster">
                        JHipster organization
                      </Link>
                    ),
                  }}
                >
                  {
                    'Write access to the main repository, and to most of the projects under the {organizationLink}.'
                  }
                </Translate>
              </li>
              <li>
                <Translate
                  values={{
                    openCollectiveLink: (
                      <Link href="https://opencollective.com/generator-jhipster">
                        our OpenCollective account
                      </Link>
                    ),
                  }}
                >
                  {
                    'Costs associated with the project (for example travel costs to come to a JHipster conference) can be paid by {}. This depends on the money available on the account, and this is decided and validated by the project leads.'
                  }
                </Translate>
              </li>
              <li>
                <Translate>
                  Free licenses and free quotas that the project regularly gets
                  from friendly companies.
                </Translate>
              </li>
            </ul>
          </SectionDescription>
        </div>
      </div>
    </SectionWrapper>
  );
}
