---
layout: default
title: Version 0.3.0 publiée
---

Sortie de JHipster version 0.3.0
==================

*JHipster vous offre Yeoman + Maven + Spring + AngularJS, tout fonctionnant ensemble dans un générateur pratique.*

Nouveautés
----------

- JDK 7 est désormais un minimum requis (si vous utilisez JDK 6, ne vous appelez pas un hipster!)
- La configuration Spring est désormais sans XML ! Le seul fichier de configuration XML restant appartient à Spring Security. Nous devons attendre la prochaine version de Spring Security pour remplacer ce fichier.
- Le pool de connexions a changé : nous utilisons maintenant [HikariCP](https://github.com/brettwooldridge/HikariCP)
- Pour les utilisateurs qui ont choisi d'utiliser Spring 4, mise à jour de l'application vers Spring 4.0.0.RC2


Comment mettre à jour
------------

Mettez à jour votre version de JHipster avec :


```
npm update -g generator-jhipster
```

Vous pouvez supprimer les fichiers XML désormais inutiles :

- src/main/resources/META-INF/persistence.xml
- src/main/resources/META-INF/spring/applicationContext-database.xml
- src/test/resources/META-INF/spring/applicationContext-database.xml

Et ensuite, vous pouvez mettre à jour votre projet lorsque vous exécutez à nouveau

```
yo jhipster
```

Aide et bugs
--------------

Si vous rencontrez des problèmes avec cette version, n'hésitez pas à :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter
- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)