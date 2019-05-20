---
layout: default
title: Code Quality
permalink: /code-quality/
sitemap:
    priority: 0.7
    lastmod: 2018-08-18T12:40:00-00:00
---

# <i class="fa fa-diamond"></i> Code quality

Code quality can be easily analyzed using [SonarCloud](https://sonarcloud.io), which is automatically configured by JHipster.

## Using Sonar with JHipster

JHipster provides a specific Docker Compose configuration for Sonar ([here is the JHipster Docker Compose documentation]({{ site.url }}/docker-compose/)) that provides an out-of-the box Sonar instance. At the root of your project, please run:

    docker-compose -f src/main/docker/sonar.yml up -d

If you use Maven, it has been automatically configured:

    ./mvnw -Pprod clean verify sonar:sonar -Dsonar.host.url=http://localhost:9001

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

    ./mvnw initialize sonar:sonar -Dsonar.host.url=http://localhost:9001

If you use Gradle, it has also been automatically configured:

    ./gradlew -Pprod clean check sonarqube -Dsonar.host.url=http://localhost:9001

In every cases you can, now, run analysis with [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) if you already have installed it.

    sonar-scanner

Once the analysis completes, it will be available on the Sonar dashboard, which by default is available on [http://127.0.0.1:9001/](http://127.0.0.1:9001/).

## Excluding Files from Jacoco Analysis

In case you would like to exclude certain classes from coverage analysis (e.g. generated classes or the application class) and would like to have the correct
coverage in the default jacoco html report you have to exclude the classes from analysis and from reporting.

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

The JHipster generator project publishes a sample project which is analyzed every time a new commit is merged in the "master" branch:

[Analysis of the sample JHipster project](https://sonarcloud.io/dashboard?id=io.github.jhipster.sample%3Ajhipster-sample-application)

This allows the JHipster team to make sure that you will start developing your project on the cleanest code possible.

This analysis is provided for free by [SonarCloud](https://sonarcloud.io).
