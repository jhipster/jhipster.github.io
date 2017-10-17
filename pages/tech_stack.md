---
layout: default
title: Technology stack
permalink: /tech-stack/
redirect_from:
  - /tech_stack.html
sitemap:
    priority: 0.8
    lastmod: 2014-05-16T00:00:00-00:00
---

# <i class="fa fa-stack-overflow"></i> 技术栈

## 客户端技术栈

单页面应用：

*   [Angular 4](https://angular.io/) 或 [AngularJS v1.x](http://angularjs.org/)
*   响应式页面设计： [Twitter Bootstrap](http://getbootstrap.com/)
*   [HTML5 Boilerplate](http://html5boilerplate.com/)
*   兼容 IE11 和更多主流浏览器
*   完整国际化支持
*   可选：[Sass](https://www.npmjs.com/package/node-sass) 支持 CSS 扩展
*   可选：使用 Spring Websocket 来支持 WebSocket 协议

棒棒的开发流程：

*   使用 [Yarn](https://yarnpkg.com/) 或 [Bower](http://bower.io/) 来安装额外的 JavaScript 库
*   使用 [Webpack](https://webpack.js.org/) 或 [Gulp.js](http://www.gulpjs.com) 编译、优化、热加载
*   使用 [Karma](http://karma-runner.github.io/), [Headless Chrome](https://github.com/GoogleChrome/puppeteer) 以及 [Protractor](http://www.protractortest.org) 进行测试

单页面应用还不能满足需要？

*   支持使用 [Thymeleaf](http://www.thymeleaf.org/) 模板引擎，来在服务端渲染页面

## 服务端技术栈

完整的 [Spring 应用](http://spring.io/):

*   使用 [Spring Boot](http://projects.spring.io/spring-boot/) 来简化应用配置
*   使用 [Maven](http://maven.apache.org/) 或 [Gradle](http://www.gradle.org/) 配置编译、测试、运行应用
*   使用 ["development" 及 "production" profiles]({{ site.url }}/profiles/) (同时支持 Maven 和 Gradle)
*   使用 [Spring Security](http://docs.spring.io/spring-security/site/index.html)
*   使用 [Spring MVC REST](http://spring.io/guides/gs/rest-service/) + [Jackson](https://github.com/FasterXML/jackson)
*   使用 Spring Websocket 支持 WebSocket 协议
*   使用 [Spring Data JPA](http://projects.spring.io/spring-data-jpa/) + Bean Validation
*   使用 [Liquibase](http://www.liquibase.org/) 管理数据库版本
*   使用 [Elasticsearch](https://github.com/elastic/elasticsearch) 提供全文搜索引擎
*   使用 [MongoDB](http://www.mongodb.org) 作为基于文档格式的 NoSQL 数据库而不是使用 JPA
*   使用 [Cassandra](http://cassandra.apache.org/) 作为基于列对象的 NoSQL 数据库而不是使用 JPA
*   使用 [Kafka](http://kafka.apache.org/) 使用发布-分发消息系统

## 微服务技术栈

微服务是可选的，同时也是完全支持的：

* HTTP 路由：[Netflix Zuul](https://github.com/Netflix/zuul) 或 [Traefik](https://traefik.io/)
* 服务发现： [Netflix Eureka](https://github.com/Netflix/eureka) 或 [HashiCorp Consul](https://www.consul.io/)

## Ready to go into production:

*   监控：[Metrics](http://metrics.dropwizard.io/) 及 [the ELK Stack](https://www.elastic.co/products)
*   缓存：[ehcache](http://ehcache.org/) (本地缓存), [hazelcast](http://www.hazelcast.com/) 或 [Infinispan](http://infinispan.org/)
*   可选的 HTTP session 集群：[hazelcast](http://www.hazelcast.com/)
*   优化静态资源 (gzip 过滤, HTTP cache headers)
*   日志管理：[Logback](http://logback.qos.ch/), 可运行时配置
*   连接池管理：[HikariCP](https://github.com/brettwooldridge/HikariCP) 来优化性能
*   编译为标准 WAR 包或可执行 JAR 包
*   完整的 Docker 及 Docker Compose 支持
*   支持主流云平台：AWS, Cloud Foundry, Heroku, Kubernetes, OpenShift, Docker...
