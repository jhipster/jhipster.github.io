---
layout: default
title: Serveur SMTP local
sitemap:
priority: 0.5
lastmod: 2016-05-21T22:22:00-00:00
---

# Serveur SMTP local

__Conseil soumis par [@pascalgrimaud](https://github.com/pascalgrimaud)__

**Attention !** Ce conseil dépend d'un autre projet qui n'est pas directement pris en charge par JHipster.

Le projet [djfarrelly/maildev](https://github.com/djfarrelly/MailDev) est un moyen simple de tester les e-mails générés par votre projet lors du développement avec une interface web facile à utiliser.

Pour démarrer localement le serveur SMTP avec Docker :

```
docker container run -d -p 1080:80 -p 25:25 djfarrelly/maildev
```
