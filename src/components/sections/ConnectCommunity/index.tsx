import Translate from '@docusaurus/Translate';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import GithubButton from '@site/src/components/GithubButton';
import styles from './styles.module.scss';

export default function ConnectCommunity() {
  return (
    <SectionWrapper>
      <div className={styles.sectionContent}>
        <div>
          <SectionTitle className={styles.sectionTitle} align="start">
            <Translate>Connect with the community</Translate>
          </SectionTitle>

          <SectionDescription
            className={styles.sectionDescription}
            align="start"
          >
            <p>
              <Translate>
                Feel free to ask questions, report issues, contribute, and meet
                new people
              </Translate>
            </p>
          </SectionDescription>
        </div>

        <GithubButton>
          <Translate>Join us on GitHub</Translate>
        </GithubButton>
      </div>
    </SectionWrapper>
  );
}
