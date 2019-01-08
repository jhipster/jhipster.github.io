---
layout: default
title:
permalink: /managing-server-errors/
sitemap:
    priority: 0.7
    lastmod: 2018-03-07T00:00:00-00:00
---

# <i class="fa fa-fire-extinguisher"></i> Managing server errors

JHipster has first-class support for error handling: it provides error pages and custom mechanisms to handle both business and technical errors on the server-side.

## Error pages

JHipster generates a Single-Page Application (SPA), but it still requires custom error pages for people who do not (or cannot) access the application.

### Dynamic error pages

JHipster provides a generic error page, which is a [Thymeleaf](https://www.thymeleaf.org/) template, located at `src/main/resources/templates/error.html`.

This page will display the server-side error message, for example if the user tried to access a non-existing page, it will display a 404 error, telling the user that the page wasn't found.

### Static 404 error page

JHipster provides a specific, static 404 error page located at `src/main/webapp/404.html`. By default, this page isn't used by JHipster: it is here for projects using a proxy before JHipster (Apache/NGinx/etc.), so that the proxy can also display a 404 error page, even if the JHipster application isn't available.

It needs to be specifically configured on the front-end proxy.

## API errors

To handle Spring MVC REST errors, JHipster uses [Zalando's Problem Spring Web  library](https://github.com/zalando/problem-spring-web), in order to provide rich, JSON-based error messages.

In order to help the end-user, for each known problem this library will provide a link to a specific error page, that will give more details. Those links are configured in the `ErrorConstants` class, and point by default to this website. In your application, you should customize those links, and point them to your own API documentation.

Here are the available error links:

- [Problem with message]({{ site.url }}/problem/problem-with-message)
- [Constraint violation]({{ site.url }}/problem/constraint-violation)
- [Problem with a parameterized message]({{ site.url }}/problem/parameterized)
- [Entity not found]({{ site.url }}/problem/entity-not-found)
- [Invalid password]({{ site.url }}/problem/invalid-password)
- [E-mail already used]({{ site.url }}/problem/email-already-used)
- [Login already used]({{ site.url }}/problem/login-already-used)
- [E-mail not found]({{ site.url }}/problem/email-not-found)
