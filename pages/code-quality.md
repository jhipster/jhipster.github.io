---
layout: default
title: Code Quality
permalink: /code-quality/
sitemap:
    priority: 0.7
    lastmod: 2018-08-18T12:40:00-00:00
---

# <i class="fa fa-diamond"></i> Code quality

Code quality can be analyzed using [SonarCloud](https://sonarcloud.io), which is automatically configured by JHipster.

## Using Sonar with JHipster

JHipster provides a specific Docker Compose configuration for Sonar ([here is the JHipster Docker Compose documentation]({{ site.url }}/docker-compose/)) that provides an out-of-the box Sonar instance. At the root of your project, please run:

    docker-compose -f src/main/docker/sonar.yml up -d

If you use Maven, it has been automatically configured:

    ./mvnw -Pprod clean verify sonar:sonar -Dsonar.host.url=http://localhost:9001

> <i class="fa fa-info-circle"></i> **Note for SonarQube 9.6.0 on Apple Silicon (M1)**
>
> SonarQube does not work with Apple Silicon using official images, a native image is not provided, and it fails in compatibility mode. You can build the Docker image locally to solve the problem: 
>
> ```
> git clone https://github.com/SonarSource/docker-sonarqube.git
> cd docker-sonarqube/9/community
> git checkout 9.6.0
> docker build -t sonarqube:9.6.0-community .
> ```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

    ./mvnw initialize sonar:sonar -Dsonar.host.url=http://localhost:9001

If you use Gradle, it has also been automatically configured:

    ./gradlew -Pprod clean check jacocoTestReport sonarqube -Dsonar.host.url=http://localhost:9001

In every cases you can, now, run analysis with [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) if you already have installed it.

    sonar-scanner

Once the analysis completes, it will be available on the Sonar dashboard, which by default is available on [http://127.0.0.1:9001/](http://127.0.0.1:9001/).

## Excluding Files from Jacoco Analysis

In case you would like to exclude certain classes from coverage analysis (e.g. generated classes or the application class) and would like to have the correct
coverage in the default jacoco html report you have to exclude the classes from analysis and from reporting.

### Maven

You need to add exclusions to the `prepare-agent` and `report` goal of both unit and integration tests:

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>${jacoco-maven-plugin.version}</version>
    <executions>
        <execution>
            <id>pre-unit-tests</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.utReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-unit-test</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from reporting-->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.utReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
        <execution>
            <id>pre-integration-tests</id>
            <goals>
                <goal>prepare-agent-integration</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.itReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-integration-tests</id>
            <phase>post-integration-test</phase>
            <goals>
                <goal>report-integration</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from reporting-->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.itReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Gradle

You can add the following to `sonar.gradle` file:

```gradle
test {
    jacoco {
        excludes += ['build/generated/**']
    }
}

jacocoTestReport {
    afterEvaluate {
        classDirectories = files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                    '**/*_.class'
            ])
        })
    }
}
```

## Automatic analysis of the default generated project

The JHipster generator project publishes a sample project which is analyzed every time a new commit is merged in the "main" branch:

[Analysis of the JHipster Sample Application](https://sonarcloud.io/dashboard?id=jhipster-sample-application) under the [JHipster Organization](https://sonarcloud.io/organizations/jhipster)

This allows the JHipster team to make sure that you will start developing your project on the cleanest code possible.

This analysis is provided for free by [SonarCloud](https://sonarcloud.io).
