---
layout: default
title: Build status
sitemap:
priority: 0.7
lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-industry"></i> Build status

This page is the result of our [automated samples project](https://github.com/jhipster/jhipster-automated-samples), and gives a matrix of the build status of all our sample projects.

## Continuous Integration

Each sample project is tested by two Continuous Integration systems:

- [drone.io](https://drone.io/) for our Java code (using Maven or Gradle)
- [Travis CI](https://travis-ci.org/) for our JavaScript code (using Grunt or Gulp.js)

## Generated entities

Most projects have 3 entities generated, with some one-to-many, many-to-many and many-to-one relationships, so that the entity sub-generator is also correctly tested.

## Build matrix

| Project          | Description       | Java build    | JavaScript build |
| ------------- | ----------------- | ------------- | ------------- |
| [jhipster/jhipster-sample-app](https://github.com/jhipster/jhipster-sample-app) | JHipster sample project, with all default options | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app)  |
| [jhipster/jhipster-sample-app-gradle](https://github.com/jhipster/jhipster-sample-app-gradle) | Sample project, with the Gradle build option | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-gradle/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-gradle/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-gradle.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-gradle)  |
| [jhipster/jhipster-sample-app-java7](https://github.com/jhipster/jhipster-sample-app-java7) | Sample project, with the Java 7 build option | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-java7/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-java7/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-java7.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-java7)  |
| [jhipster/jhipster-sample-app-gulp](https://github.com/jhipster/jhipster-sample-app-gulp) | Sample project, with the Gulp.js build option | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-gulp/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-gulp/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-gulp.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-gulp)  |
| [jhipster/jhipster-sample-app-mongodb](https://github.com/jhipster/jhipster-sample-app-mongodb) | Sample project, with the MongoDB build option | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-mongodb/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-mongodb/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-mongodb.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-mongodb)  |
| [jhipster/jhipster-sample-app-cassandra](https://github.com/jhipster/jhipster-sample-app-cassandra) | Sample project, with the Cassandra build option | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-cassandra/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-cassandra/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-cassandra.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-cassandra)  |
| [jhipster/jhipster-sample-app-dto](https://github.com/jhipster/jhipster-sample-app-dto) | Sample project, using DTOs with MapStruct | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-dto/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-dto/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-dto.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-dto)  |
| [jhipster/jhipster-sample-app-elasticsearch](https://github.com/jhipster/jhipster-sample-app-elasticsearch) | Sample project, using Elasticsearch | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-elasticsearch/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-elasticsearch/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-elasticsearch.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-elasticsearch)  |
| [jhipster/jhipster-sample-app-hazelcast](https://github.com/jhipster/jhipster-sample-app-hazelcast) | Sample project, using the Hazelcast cache | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-hazelcast/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-hazelcast/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-hazelcast.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-hazelcast)  |
| [jhipster/jhipster-sample-app-nocache](https://github.com/jhipster/jhipster-sample-app-nocache) | Sample project, without a 2nd level cache | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-nocache/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-nocache/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-nocache.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-nocache)  |
| [jhipster/jhipster-sample-app-noi18n](https://github.com/jhipster/jhipster-sample-app-noi18n) | Sample project, without i18n | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-noi18n/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-noi18n/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-noi18n.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-noi18n)  |
| [jhipster/jhipster-sample-app-websocket](https://github.com/jhipster/jhipster-sample-app-websocket) | Sample project, using Websockets | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-websocket/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-websocket/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-websocket.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-websocket)  |
| [jhipster/jhipster-sample-app-oauth2](https://github.com/jhipster/jhipster-sample-app-oauth2) | Sample project, using OAuth2 authentication | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-oauth2/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-oauth2/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-oauth2.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-oauth2)  |
| [jhipster/jhipster-sample-app-token](https://github.com/jhipster/jhipster-sample-app-token) | Sample project, using token authentication | [![Java Build Status](https://drone.io/github.com/jhipster/jhipster-sample-app-token/status.png)](https://drone.io/github.com/jhipster/jhipster-sample-app-token/latest)  | [![JavaScript Build Status](https://travis-ci.org/jhipster/jhipster-sample-app-token.svg?branch=master)](https://travis-ci.org/jhipster/jhipster-sample-app-token)  |
