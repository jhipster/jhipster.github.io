---
layout: default
title: Version 0.4.0
---

Sortie de JHipster 0.4.0
==================

*JHipster vous offre Yeoman + Maven + Spring + AngularJS, tous fonctionnant ensemble dans un seul générateur pratique.*

Nouveautés
----------

- Un support incroyable de HazelCast par [Jerome Mirc](https://twitter.com/JeromeMirc) offrant :
  - Cache de second niveau distribué pour Hibernate
  - Sessions HTTP en cluster
- Un nouveau filtre GZip (également de [Jerome Mirc](https://twitter.com/JeromeMirc) !)
- Spring 4 est maintenant la norme
- Un sous-générateur "entity" est maintenant en version BETA. Si vous voulez le tester :
```
yo jhipster:entity foo
```
- Correction d'un bug dans grunt-time qui bloquait la build en mode "prod"

Comment mettre à niveau
------------

Mettez à jour votre version de JHipster avec :

```
npm update -g generator-jhipster
```
Puis vous pouvez mettre à jour votre projet en exécutant à nouveau

```
yo jhipster
```

Aide et bugs
--------------

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter
- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)