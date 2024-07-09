import Translate from '@docusaurus/Translate';

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
      <SectionTitle>
        <Translate>Learn JHipster In 15 Minutes</Translate>
      </SectionTitle>

      <SectionDescription>
        <p>
          <Translate>
            Matt Raible created a screencast that shows how to use JHipster 7 to
            develop a Spring Boot + Angular application. He also published a
            video on how to build reactive Java microservices with Spring Boot
            and JHipster.
          </Translate>
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
