---
layout: default
title: Setting up Continuous Integration
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-03T14:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Continuous Integration

Setting up Continuous Integration (CI) for a JHipster application is harder than for a classic typical Spring MVC application because of the complexity associated with maintaining a build composed of 2 software stacks:

- the Java back-end code with Maven or Gradle
- the JavaScript front-end with NodeJS, NPM or Yarn

Each stack comes with its own dependency management (Maven artifacts, NPM packages) with potential conflicts to solve.

JHipster should support the following CI systems out of the box:

- Jenkins:
    - [Setting up Jenkins 1]({{ site.url }}/setting-up-ci-jenkins1/)
    - [Setting up Jenkins 2]({{ site.url }}/setting-up-ci-jenkins2/) (recommended)
- Travis: refer to the [Travis Documentation](https://docs.travis-ci.com/user/getting-started/)
- GitLab CI: refer to the [GitLab CI Documentation](https://about.gitlab.com/gitlab-ci/)
- Azure Pipelines: refer to the [Azure Pipelines Documentation](https://docs.microsoft.com/fr-fr/azure/devops/pipelines/?view=vsts)

## Running the sub-generator

To generate these config files, run this command in your project folder:

`jhipster ci-cd`

Then answer all the questions.


### What CI/CD pipeline do you want to generate ?

The CI/CD pipeline you want to generate:

- Jenkins pipeline
- Azure Pipelines
- GitLab CI
- Travis CI

**Note**: when you select Jenkins pipeline, a new `src/main/docker/jenkins.yml` file will be generated.
So you can test Jenkins locally by running:

```
docker-compose -f src/main/docker/jenkins.yml up -d
```

### Would you like to perform the build in a Docker container ? (Jenkins / GitLab)

If Docker is installed, you can perform the build inside a Docker container.

### In GitLab CI, perform the build in a docker container (hint: GitLab.com uses Docker container) ? (GitLab)

If you use a private GitLab CI, you can use directly the runners.

If you use official GitLab.com pipeline, you need to use Docker container.

### Would you like to send build status to GitLab ? (Jenkins)

If your Jenkins relies to a GitLab repository, you can send build status to GitLab. Your Jenkins must be correctly configured.

### What tasks/integrations do you want to include ?

- Deploy your application to an *Artifactory*
- Analyze your code with *Sonar*
- Build and publish a *Docker* image
- Deploy to *Heroku* (requires HEROKU_API_KEY set on CI service)

### Deploy your application to an *Artifactory* (Jenkins / GitLab)

- *Artifactory*: what is the ID of distributionManagement for snapshots ?
- *Artifactory*: what is the URL of distributionManagement for snapshots ?
- *Artifactory*: what is the ID of distributionManagement for releases ?
- *Artifactory*: what is the URL of distributionManagement for releases ?

### Analyze your code with *Sonar*

- *Sonar*: what is the name of the Sonar server ?

Choose the name of the Sonar server, defined in your Jenkins Configuration.

- *Sonar*: what is the URL of the Sonar server ?
- *Sonar*: what is the Organization of the Sonar server ? 

Here, you can choose to push your Sonar Analyze to [SonarCloud.io](https://sonarcloud.io).
In this case, you have to add the `SONAR_TOKEN` environment variable.

### Build and publish a *Docker* image

- *Docker*: what is the URL of the Docker registry ?

By default, you can use Docker Hub: [https://registry.hub.docker.com](https://registry.hub.docker.com)

- *Docker*: what is the Jenkins Credentials ID for the Docker registry ?

By default, you can use: `docker login`

- *Docker*: what is the Organization Name for the Docker registry ?

### Deploy to *Heroku*

- *Heroku: name of your Heroku Application ?

You have to add the `HEROKU_API_KEY` environment variable.

Note: before using the deployment to Heroku, you need to use the [Heroku sub-generator]({{ site.url }}/heroku) locally.
It will create all files needed by your Continuous Integration Tool.


## Documentation about environment variables:

- Jenkins pipeline: you should use the [Credentials plugin](https://wiki.jenkins-ci.org/display/JENKINS/Credentials+Plugin)
- GitLab CI: read the [documentation about secret-variables](https://docs.gitlab.com/ce/ci/variables/#secret-variables)
- Travis CI: read the [environment variables](https://docs.travis-ci.com/user/environment-variables/)
