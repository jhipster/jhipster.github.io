---
layout: default
title: Profils
permalink: /profiles/
redirect_from:
  - /profiles.html
sitemap:
    priority: 0.7
    lastmod: 2014-11-26T00:00:00-00:00
---

# <i class="fa fa-group"></i> Profils

JHipster est livré avec deux [profils Spring](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html):

*   `dev` pour le développement : il se concentre sur la facilité de développement et la productivité
*   `prod` pour la production : il se concentre sur les performances et la scalabilité

Ces profils se déclinent en deux configurations différentes :

*   Les profils Maven/Gradle sont utilisés au moment de la construction. Par exemple, `./mvnw -Pprod package` ou `./gradlew -Pprod bootJar` empaquetera une application de production.
*   Les profils Spring fonctionnent au moment de l'exécution. Certains beans Spring se comporteront différemment en fonction du profil.

Les profils Spring sont définis par Maven/Gradle, donc nous avons une cohérence entre les deux méthodes : vous aurez un profil `prod` sur Maven/Gradle et Spring en même temps.

_Remarque :_ Les profils Spring sont utilisés pour configurer les propriétés de l'application JHipster, donc vous devriez être intéressé par la lecture de notre [documentation sur les propriétés d'application communes]({{ site.url }}/common-application-properties/).

## Par défaut, JHipster utilisera le profil `dev`

Si vous exécutez l'application sans Maven/Gradle, lancez la classe "Application" (vous pouvez probablement l'exécuter directement depuis votre IDE en cliquant avec le bouton droit dessus).

Si vous exécutez l'application avec Maven, exécutez `./mvnw` pour utiliser notre Maven Wrapper, ou `mvn` pour utiliser votre propre installation Maven.

Si vous exécutez l'application avec Gradle, exécutez `./gradlew` pour utiliser notre Gradle Wrapper, ou `gradle` pour utiliser votre propre installation Gradle.

Lorsque vous utilisez Angular 2+ et Maven si vous avez besoin d'exécuter proprement avec la compilation webpack activée pour le profil `dev`, vous pouvez passer le paramètre `webapp` comme ci-dessous

  `./mvnw -Pdev,webapp`

**Notez** que Gradle lance automatiquement la compilation webpack en profil `dev` si le frontend a changé (uniquement au démarrage, pour le rechargement en direct utilisez `npm start`).

## En production, JHipster doit être exécuté avec le profil `prod`

Vous pouvez exécuter JHipster en production directement avec Maven ou Gradle :

*   Avec Maven, exécutez `./mvnw -Pprod` (ou `mvn -Pprod`)
*   Avec Gradle, exécutez `./gradlew -Pprod` (ou `gradle -Pprod`)

Si vous souhaitez empaqueter votre application en tant que fichier WAR exécutable, vous devez fournir à Maven ou Gradle un profil. Par exemple :

*   Avec Maven, exécutez `./mvnw -Pprod package` (ou `mvn -Pprod package`)
*   Avec Gradle, exécutez `./gradlew -Pprod bootJar` (ou `gradle -Pprod bootJar`)

Lorsque vous exécutez votre application de production à partir d'un fichier WAR, par défaut, vous utilisez les mêmes profil(s) que ceux utilisés lors de l'emballage. Si vous souhaitez remplacer cela, vous pouvez fournir explicitement une alternative en argument VM :

*   `java -jar jhipster-0.0.1-SNAPSHOT.jar --spring.profiles.active=...`

## Commutateurs de profils Spring

JHipster est livré avec trois profils supplémentaires utilisés comme commutateurs :

*   `api-docs` pour activer Swagger
*   `no-liquibase` pour désactiver Liquibase
*   `tls` pour activer la sécurité TLS et utiliser le protocole HTTP/2 (voir [la documentation sur le TLS et le HTTP/2]({{ site.url }}/tls/))

Ceux-ci peuvent être utilisés avec les profils `dev` et `prod`. Veuillez noter que par défaut, le profil `api-docs` n'est pas activé en `prod` et activé en `dev` en définissant la propriété de groupe de profil `spring.profiles.group.dev` dans `application.yml`.

`api-docs`, `no-liquibase`, `tls` ne sont utilisés qu'au moment de l'exécution :

*   Dans votre IDE, exécutez votre classe d'application principale avec `spring.profiles.active=dev,no-liquibase` (veuillez noter que vous devez inclure explicitement le profil `dev` ou `prod`)
*   Avec une application empaquetée : `./java -jar jhipster-0.0.1-SNAPSHOT.war --spring.profiles.active=prod,no-liquibase`

Avec Maven, vous pouvez également utiliser ces profils directement :

*   `./mvnw -Pprod,api-docs,no-liquibase`
*   `./mvnw -Pdev,no-liquibase`

Avec Gradle, vous pouvez également utiliser ces profils directement :

*   `./gradlew -Pprod -Papi-docs -Pno-liquibase`
*   `./gradlew -Pno-liquibase`