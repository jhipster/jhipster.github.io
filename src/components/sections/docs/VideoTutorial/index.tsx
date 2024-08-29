import ContentMediaCard from '@site/src/components/ContentMediaCard';
import styles from './styles.module.scss';

export default function VideoTutorial() {
  return (
    <section>
      <div className={styles.sectionList}>
        <ContentMediaCard title="JHipster Blog Demo" video="6lf64CctDAQ">
          <p>
            This 15-minute tutorial shows how to create a JHipster 7
            application, work with the provided tools, use the JDL Studio to
            create several entities with their relationships, and deploy the end
            result to the cloud.
          </p>
          <p>
            Presented by Matt Raible (
            <a href="https://x.com/mraible">@mraible</a>)
          </p>
          <p>Published on 30 Apr 2021</p>
        </ContentMediaCard>
      </div>

      <h2 className={styles.sectionTitle}>Other recent JHipster videos</h2>

      <div className={styles.sectionList}>
        <ContentMediaCard
          title="Micro Frontends for Java Microservices"
          video="haTQ1xJKQQ8"
        >
          <p>
            <a href="https://x.com/mraible">Matt Raible</a> explains what micro
            frontends are and shows how you can use them with React, Spring
            Boot, and JHipster microservices.
          </p>
          <p>
            Published on Jan 1, 2023 |{' '}
            <a href="https://youtube.com/oktadev">OktaDev YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="What is JHipster Lite and why should you care?"
          video="RnLGnY-vzLI"
        >
          <p>
            <a href="https://x.com/juliendubois">Julien Dubois</a> compares
            JHipster and JHipster Lite and shows how JHipster Lite works.
          </p>
          <p>
            Published on Oct 14, 2022 |{' '}
            <a href="https://www.youtube.com/@DevoxxForever">Devoxx YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Build and deploy cloud native Java microservices on Kubernetes with Istio service mesh"
          video="NucXvPL1z5o"
        >
          <p>
            <a href="https://x.com/deepu105">Deepu K Sasidharan</a> shows how to
            build and deploy Java microservices to the cloud using Istio,
            Kubernetes, JHipster, and Spring Cloud.
          </p>
          <p>
            Published on Oct 11, 2022 |{' '}
            <a href="https://www.youtube.com/@DevoxxForever">Devoxx YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Scaling Secure Applications with Spring Session and Redis"
          video="3kGrkVUZ_Fo"
        >
          <p>
            <a href="https://x.com/mraible">Matt Raible</a> shows how to
            configure a Spring Boot application to store sessions in Redis with
            Spring Session. The session will be shared among multiple nodes and
            preserved when a node failure happens.
          </p>
          <p>
            Published on Apr 5, 2022 |{' '}
            <a href="https://youtube.com/oktadev">OktaDev YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Full Stack Java with React, Spring Boot, and JHipster"
          video="PECnQs5bVbQ"
        >
          <p>
            <a href="https://x.com/mraible">Matt Raible</a> shows how to create
            a slick-looking, full-stack, secure Java application using React,
            Spring Boot, and JHipster.
          </p>
          <p>
            Published on Jan 26, 2022 |{' '}
            <a href="https://youtube.com/oktadev">OktaDev YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Kubernetes to the Cloud with Spring Boot and JHipster"
          video="SQFl7ggNYIE"
        >
          <p>
            <a href="https://x.com/mraible">Matt Raible</a> shows how to deploy
            a microservices architecture to Minikube and Google Cloud with
            Kubernetes. The architecture is developed with Spring Cloud Gateway,
            Spring Boot, and JHipster.
          </p>
          <p>
            Published on Aug 23, 2021 |{' '}
            <a href="https://youtube.com/oktadev">OktaDev YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Generating Fullstack Springboot & Angular 12 Application with JHipster"
          video="V1g0aZtPAkw"
        >
          <p>
            <a href="https://x.com/bloch_gaetan">Gaëtan Bloch</a> shows how to
            generate a fullstack application with JHipster and explore the
            different features: tests (JUnit, Jest, Integration with
            Testcontainers, e2e with Cypress, performance with Gatling),
            security (JWT), i18n, API documentation (OAS/Swagger), QA
            (SonarQube, OWASP vulnerabilities check) and CI/CD pipeline (GitHub
            Actions) and cloud deployment to Heroku.
          </p>
          <p>
            Streamed live on Aug 04, 2021 |{' '}
            <a href="https://geekle.us/software_architecture">
              Geekle.us Worldwide Architecture Summit Vol.2
            </a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Build Reactive Java Microservices with Spring Boot and JHipster"
          video="clkEUHWT9-M"
        >
          <p>
            <a href="https://x.com/mraible">Matt Raible</a> shows how to create
            a reactive microservices architecture with Spring Boot and JHipster.
          </p>
          <p>
            Published on 13 May 2021 |{' '}
            <a href="https://youtube.com/oktadev">OktaDev YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard title="Introduction to JHipster" video="hfIIGc5lkME">
          <p>
            <a href="https://x.com/juliendubois">Julien Dubois</a> presents
            about JHipster at{' '}
            <a href="DawsCon">https://www.dawsoncollege.qc.ca/dawscon/</a>.
          </p>
          <p>Streamed live on Jan 15, 2021</p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Choose Your Own Adventure with JHipster and Kubernetes"
          video="AG4z18qePEw"
        >
          <p>
            <a href="https://x.com/saturnism">Ray Tsang</a> and{' '}
            <a href="https://x.com/mraible">Matt Raible</a> show how to build a
            microservices architecture with JHipster, configure it to use Okta,
            and deploy it with Kubernetes.
          </p>
          <p>
            Streamed live on Jan 13, 2021 |{' '}
            <a href="https://www.youtube.com/channel/UChJ6IHM_uy6dWLBiDAwYkpw">
              JChampions Conf YouTube
            </a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Build a Secure Micronaut and Angular App with JHipster"
          video="zg2UtuD3-RE"
        >
          <p>
            Learn how to create a secure Micronaut and Angular app with Java +
            JHipster and deploy it to Heroku. By{' '}
            <a href="https://x.com/mraible">Matt Raible</a>.
          </p>
          <p>
            Published on Sep 17, 2020 |{' '}
            <a href="https://youtube.com/oktadev">OktaDev YouTube</a>
          </p>
        </ContentMediaCard>

        <ContentMediaCard
          title="Convert JHipster from JWT Authentication to OAuth 2.0 / OIDC Authentication in 10 Minutes"
          video="YIRjgd_3sMQ"
        >
          <p>
            This screencast shows you how to convert a JHipster app from using
            JWT for authentication to using OAuth 2.0 / OIDC. By{' '}
            <a href="https://x.com/mraible">@mraible</a>
          </p>
          <p>
            Published on 20 Sep 2019 |{' '}
            <a href="https://youtube.com/oktadev">OktaDev YouTube</a>
          </p>
        </ContentMediaCard>
      </div>
    </section>
  );
}
