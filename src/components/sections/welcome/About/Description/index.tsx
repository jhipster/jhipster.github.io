import styles from './styles.module.scss';

export default function Description() {
  return (
    <ul className={styles.section}>
      <li>
        JHipster is a development platform to quickly generate, develop, and
        deploy modern web applications and microservice architectures.
      </li>
      <li>
        We support many frontend technologies, including Angular, React, and
        Vue. We even have mobile app support for Ionic and React Native!
      </li>
      <li>
        On the backend, we support Spring Boot (with Java or Kotlin), Micronaut,
        Quarkus, Node.js, and .NET.
      </li>
      <li>
        For deployment, we embrace cloud native principles with Docker and
        Kubernetes.
      </li>
      <li>
        Deployment support exists for AWS, Azure, Cloud Foundry, Google Cloud
        Platform, Heroku, and OpenShift.
      </li>
    </ul>
  );
}
