import Translate from '@docusaurus/Translate';
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
      <SectionTitle align="start">
        <Translate>Goal</Translate>
      </SectionTitle>

      <SectionDescription align="start">
        <p>
          <Translate>
            Our goal is to generate a complete and modern web app or
            microservice architecture, unifying:
          </Translate>
        </p>
      </SectionDescription>

      <ul className={styles.sectionList}>
        <li>
          <div>
            <div className={styles.cardIcon}>
              <RxStack className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>
              <Translate>Robust server-side stack</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate>
                A high-performance and robust server-side stack with excellent
                test coverage
              </Translate>
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <MdOutlineStyle className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>
              <Translate>Modern Sleek</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate>
                A sleek, modern, mobile-first UI with Angular, React or Vue +
                Bootstrap for CSS
              </Translate>
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <GoWorkflow className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>
              <Translate>Powerful workflow</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate>
                A powerful workflow to build your application with Webpack and
                Maven or Gradle
              </Translate>
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <TbCloudDataConnection className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>
              <Translate>Resilient architecture</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate>
                A resilient microservice architecture with cloud native
                principles in mind
              </Translate>
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <GrDeploy className="h-6 w-6" />
            </div>
            <h3 className={styles.cardTitle}>
              <Translate>Quickly deploy</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate>
                Infrastructure as code so you can quickly deploy to the ☁️
              </Translate>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
