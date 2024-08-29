import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import EmbeddedVideo from '@site/src/components/EmbeddedVideo';
import styles from './styles.module.scss';

export default function Learn() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle>Learn JHipster In 15 Minutes</SectionTitle>

      <SectionDescription>
        <p>
          Matt Raible created a screencast that shows how to use JHipster 8 to
          develop a Spring Boot + Angular application.
        </p>
      </SectionDescription>

      <div className={styles.sectionVideo}>
        <EmbeddedVideo
          video="IfyjKCt6YHE"
          title="Get Started with JHipster 8"
        />
      </div>
    </SectionWrapper>
  );
}
