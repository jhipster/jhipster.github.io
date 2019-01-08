---
layout: default
title: Using Websockets
permalink: /using-websockets/
redirect_from:
  - /using_websockets.html
sitemap:
    priority: 0.7
    lastmod: 2015-08-31T18:40:00-00:00
---

# <i class="fa fa-envelope"></i> Using WebSockets

WebSockets are useful for having a very dynamic application, where data is shared in near real-time between the server and its clients.

JHipster currently uses Spring WebSockets as its implementation, so you will find a lot more information on this feature on the [Spring WebSockets website](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html).

This option has a few limitations:

- By default, we use the dispatcher provided by Spring Websockets, which is an in-memory implementation. Obviously, it will not scale if you want to use several servers. If you want to do so, have a look at the Spring WebSockets documentation which explains how to configure an external broker.

## The "Tracker" example

JHipster provides a simple "tracker" example out-of-the-box. Located in the `admin` menu, it will track the other users' behavior: you will see their login and IP, and which page they are currently viewing.

- This is provided as an example so you can easily get started using WebSockets, not as a "production-ready" user tracker, but it works quite well.
- It will show you how to integrate WebSockets with Spring Security, which is quite a complex topic
- This works because JHipster is a Single-Page Web Application, so the WebSockets connections are not reinitialized between each page: this is where you get one of the big benefits of JHipster's architecture
