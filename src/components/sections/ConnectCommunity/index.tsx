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
            Connect with the community
          </SectionTitle>

          <SectionDescription
            className={styles.sectionDescription}
            align="start"
          >
            <p>
              Feel free to ask questions, report issues, contribute, and meet
              new people
            </p>
          </SectionDescription>
        </div>

        <GithubButton>Join us on GitHub</GithubButton>
      </div>
    </SectionWrapper>
  );
}
