---
layout: default
title: Setting up Continuous Integration
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2016-11-03T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Continuous Integration

Setting up Continuous Integration (CI) for a JHipster application is harder than for a classic typical Spring MVC application because of the complexity associated with maintaining a build composed of 2 software stacks:

- the Java back-end code with Maven or Gradle
- the JavaScript front-end with NodeJS, NPM and Gulp

Each stack comes with its own dependency management (Maven artifacts, NPM packages) with potential conflicts to solve.

JHipster should support the following CI systems out of the box:

- Jenkins:
    - [Setting up Jenkins 1]({{ site.url }}/setting-up-ci-jenkins1/)
    - [Setting up Jenkins 2]({{ site.url }}/setting-up-ci-jenkins2/) (recommended)
- Travis: refer to the [Travis Documentation](https://docs.travis-ci.com/user/getting-started/)
- CircleCI: refer to the [CircleCI Documentation](https://circleci.com/docs/getting-started/)
- GitLab CI: refer to the [GitLab CI Documentation](https://about.gitlab.com/gitlab-ci/)

## Running the sub-generator

To generate these config files, run this command in your project folder:

`jhipster ci-cd`

Then answer all the questions.


### What CI/CD pipeline do you want to generate ?

The CI/CD pipeline you want to generate:

- Jenkins pipeline
- Travis CI
- GitLab CI
- CircleCI

### Jenkins pipeline: what tasks/integrations do you want to include ?

The tasks/integrations you want to include in the Jenkins pipeline:

- Perform the build in a Docker container
- Analyze code with Sonar
- Send build status to Gitlab
- Build and publish a Docker image

**Note**: when you select Jenkins pipeline, a new `src/main/docker/jenkins.yml` file will be generated.
So you can test Jenkins locally by running:

```
docker-compose -f src/main/docker/jenkins.yml up -d
```

### What is the name of the Sonar server ?

Choose the name of the Sonar server.

### What is the URL of the Docker registry ?

By default, you can use Docker Hub: [https://registry.hub.docker.com](https://registry.hub.docker.com)

### What is the Jenkins Credentials ID for the Docker registry ?

By default, you can use: `docker login`

### In GitLab CI perform the build in a docker container (hint: gitlab.com uses docker container)?

If you use a private GitLab CI, you can use directly the runners.

If you use official gitlab.com pipeline, you need to use Docker container.

### Deploy to Heroku?

- In Jenkins pipeline
- In GitLab CI
- In CircleCI

You have to add the `HEROKU_API_KEY` environment variable.

- Jenkins pipeline: you should use the [Credentials plugin](https://wiki.jenkins-ci.org/display/JENKINS/Credentials+Plugin)
- GitLab CI: read the [documentation about secret-variables](https://docs.gitlab.com/ce/ci/variables/#secret-variables)
- CircleCI: read the [documentation about setting environment variables](https://circleci.com/docs/environment-variables/#setting-environment-variables-for-all-commands-without-adding-them-to-git)

Before using the deployment to Heroku, you need to use the [Heroku sub-generator]({{ site.url }}/heroku) locally.
It will create all files needed by your Continuous Integration Tool.
