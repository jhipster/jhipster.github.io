import { RxStack } from 'react-icons/rx';
import { MdOutlineStyle } from 'react-icons/md';
import { GoWorkflow } from 'react-icons/go';
import { TbCloudDataConnection } from 'react-icons/tb';
import { GrDeploy } from 'react-icons/gr';

import {
  SectionDescription,
  SectionTitle,
} from '@site/src/components/ui/SectionWrapper';
import styles from './styles.module.scss';

export default function Goals() {
  return (
    <div className={styles.section}>
      <SectionTitle align="start">Goal</SectionTitle>

      <SectionDescription align="start">
        <p>
          Our goal is to generate a complete and modern web app or microservice
          architecture, unifying:
        </p>
      </SectionDescription>

      <ul className={styles.sectionList}>
        <li>
          <div>
            <div className={styles.cardIcon}>
              <RxStack className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>Robust server-side stack</h3>
            <p className={styles.cardDescription}>
              A high-performance and robust server-side stack with excellent
              test coverage
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <MdOutlineStyle className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>Modern Sleek</h3>
            <p className={styles.cardDescription}>
              A sleek, modern, mobile-first UI with Angular, React or Vue +
              Bootstrap for CSS
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <GoWorkflow className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>Powerful workflow</h3>
            <p className={styles.cardDescription}>
              A powerful workflow to build your application with Webpack and
              Maven or Gradle
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <TbCloudDataConnection className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>Resilient architecture</h3>
            <p className={styles.cardDescription}>
              A resilient microservice architecture with cloud native principles
              in mind
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <GrDeploy className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>Quickly deploy</h3>
            <p className={styles.cardDescription}>
              Infrastructure as code so you can quickly deploy to the ☁️
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
