---
layout: default
title: Local SMTP Server
sitemap:
priority: 0.5
lastmod: 2016-05-21T22:22:00-00:00
---

# Local SMTP Server

__Tip submitted by [@pascalgrimaud](https://github.com/pascalgrimaud)__

**Warning!** This tip depends on another project which is not supported directly by JHipster.

The project [djfarrelly/maildev](https://github.com/djfarrelly/MailDev) is a simple way to test your project's generated emails during development with an easy to use web interface.

To start locally the SMTP server with Docker:

```
docker container run -d -p 1080:80 -p 25:25 djfarrelly/maildev
```
