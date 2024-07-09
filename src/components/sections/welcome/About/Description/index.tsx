import Translate from '@docusaurus/Translate';
import styles from './styles.module.scss';

export default function Description() {
  return (
    <ul className={styles.section}>
      <li>
        <Translate>
          JHipster is a development platform to quickly generate, develop, and
          deploy modern web applications and microservice architectures.
        </Translate>
      </li>
      <li>
        <Translate>
          We support many frontend technologies, including Angular, React, and
          Vue. We even have mobile app support for Ionic and React Native!
        </Translate>
      </li>
      <li>
        <Translate>
          On the backend, we support Spring Boot (with Java or Kotlin),
          Micronaut, Quarkus, Node.js, and .NET.
        </Translate>
      </li>
      <li>
        <Translate>
          For deployment, we embrace cloud native principles with Docker and
          Kubernetes.
        </Translate>
      </li>
      <li>
        <Translate>
          Deployment support exists for AWS, Azure, Cloud Foundry, Google Cloud
          Platform, Heroku, and OpenShift.
        </Translate>
      </li>
    </ul>
  );
}
