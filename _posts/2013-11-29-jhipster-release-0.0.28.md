---
layout: default
title: Release 0.0.28
---

JHipster release 0.0.28
==================


The Maven profiles named "development" and "production" have been renamed "dev" and "prod" so they are quicker to type.

In "dev" mode, there shouldn't be anything new.

In "prod" mode, there are many new things:

- A full "grunt build" is automatically triggered when you package the application
- This will put a minified, optimized version of the static resources in "src/main/webapp/dist"
- 2 new Servlet filters are activated: one is just used to serve the static content from the "/dist" directory, and the other adds HTTP headers so this content is cached
