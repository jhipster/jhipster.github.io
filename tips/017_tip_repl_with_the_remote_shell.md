---
layout: default
title: REPL avec le shell distant
sitemap:
priority: 0.5
lastmod: 2016-09-22T22:22:00-00:00
---

# REPL avec le shell distant

__Conseil soumis par [@cbornet](https://github.com/cbornet)__

**Comme le shell distant de Spring Boot sera supprimé dans Spring Boot 2.0, ce conseil est obsolète**

Depuis la version 3.8, JHipster dispose d'un profil Maven/Gradle `shell` qui inclura le [shell distant de Spring Boot](http://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-remote-shell.html).
Si votre projet a été généré avec JHipster < 3.8, vous devrez ajouter manuellement la dépendance `spring-boot-starter-remote-shell`.

Cela apporte quelques commandes utiles qui peuvent aider au débogage d'une application en direct et vous pouvez également écrire les vôtres.

Une autre fonctionnalité intéressante qui n'est pas documentée dans la documentation de Spring Boot est que vous pouvez exécuter du code de script Groovy sur une application en direct de manière [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop).
Pour cela :

  * Démarrez votre application

  * Ouvrez une session ssh dans un terminal (ici pour l'utilisateur admin, mot de passe : admin) :
```
ssh -p2000 admin@localhost
```

  * Une fois connecté, passez en mode REPL Groovy :

```
> repl groovy
```

  * Obtenez le BeanFactory :

```
> bf = context.attributes['spring.beanfactory']
```

  * Maintenant, vous pouvez utiliser le BeanFactory pour obtenir des beans Spring et appeler leurs méthodes :

```
> bf.getBean('userRepository').findAll().login
[system, anonymoususer, admin, user]
> bf.getBean('userService').getUserWithAuthoritiesByLogin('user').get().authorities.name
[ROLE_USER]
```
