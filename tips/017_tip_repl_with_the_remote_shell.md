---
layout: default
title: REPL with the remote shell
sitemap:
priority: 0.5
lastmod: 2016-09-22T22:22:00-00:00
---

# REPL with the remote shell

__Tip submitted by [@cbornet](https://github.com/cbornet)__

**As the Spring Boot remote shell will be removed in Spring Boot 2.0, this tip is deprecated**

Since v3.8, JHipster has a `shell` Maven/Gradle profile that will include the [Spring Boot remote shell](http://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-remote-shell.html).
If your project was generated with JHipster < 3.8, you'll need to add the `spring-boot-starter-remote-shell` dependency manually.

This brings some useful commands that can help debugging a live application and you can also write your own.

Another nice feature which is not documented in Spring Boot docs is that you can execute Groovy script code on a live app in a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) way.
For this:

  * Start your app

  * Open an ssh session in a terminal (here for user admin, password: admin):

```
ssh -p2000 admin@localhost
```

  * Once connected, switch to Groovy REPL mode:

```
> repl groovy
```

  * Get the BeanFactory:

```
> bf = context.attributes['spring.beanfactory']
```

  * Now you can use the BeanFactory to get Spring beans and call their methods:

```
> bf.getBean('userRepository').findAll().login
[system, anonymoususer, admin, user]
> bf.getBean('userService').getUserWithAuthoritiesByLogin('user').get().authorities.name
[ROLE_USER]
```
