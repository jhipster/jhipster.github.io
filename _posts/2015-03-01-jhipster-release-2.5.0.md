---
layout: default
title: Release 2.5.0
---

JHipster release 2.5.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

The big news in this release is our [Gatling](http://gatling.io/) support, for doing performance tests of the generated entities!

Our REST interfaces have also been improved:

- The generated entities now use the PUT verb (__warning__ this could break some of your existing front-end code)
- The POST verb better follow HATEOAS principles and sends back the "location" header, giving back the URL of the generated entity

We are also going to improve the "GET" verb and add pagination in a future release: of course when you do performance tests with Gatling, not having pagination is an issue! If you have some feedback on using pagination, thank you for sharing it! Here is our current roadmap:

- On the backend, follow the principles used by the [Github API](https://developer.github.com/v3/#pagination). You can have more information on doing pagination on a REST API on this [best practices document](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- Maybe we will use the pagination support from Spring Data, but we are not sure about this yet
- On the front-end, we will add [ngTable](http://bazalt-cms.com/ng-table/) support

The _User_ entity, which is a special entity handled by JHipster, has been modified so you can do many-to-one relationships to it:

- This is a common requirement to have some entities linked to the user. For example, many "orders" could be linked to one "user".
- As usually you will want to restrict those entities to the current user, we also provide a helper Repository method, called _findAllForCurrentUser()_ which will be automatically generated
- If you have a look at this method, you will see that we use the Spring Security Principal in a Spring Data JPA query. This is because we added [SpEL support in Spring Data JPA](https://spring.io/blog/2014/07/15/spel-support-in-spring-data-jpa-query-definitions)!

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.5.0+is%3Aclosed)__.

How to upgrade
------------

Update your version of JHipster with:

```
npm update -g generator-jhipster
```

And then you can update your project when you run again

```
yo jhipster
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
