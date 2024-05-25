---
layout: default
title: Vérification des vulnérabilités des dépendances
permalink: /dependency-vulnerabities-check/
sitemap:
    priority: 0.7
    lastmod: 2018-09-15T19:00:00-00:00
---


# <i class="fa fa-check-circle-o"></i> Vérification des vulnérabilités des dépendances

## Pourquoi les dépendances du projet doivent être vérifiées

JHipster utilise de nombreuses technologies, et le projet est très attentif lors de leur sélection. Mais peut-être que le projet a omis une vulnérabilité parmi ces nombreuses dépendances, ou peut-être avez-vous ajouté ou mis à jour une dépendance qui a déclenché une nouvelle vulnérabilité.

Selon [OWASP Top 10 Most Critical Web Application Security Risks](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project), l'utilisation de composants (c'est-à-dire de dépendances) présentant des vulnérabilités connues est classée 9e, et il existe de nombreuses histoires connues de violations de sécurité causées par des dépendances tierces (malveillantes ou non).

## Pourquoi la vérification des dépendances n'est pas fournie par défaut par JHipster

La proposition d'une vérification des dépendances par défaut dans la construction de JHipster a été discutée à plusieurs reprises ([#6329](https://github.com/jhipster/generator-jhipster/issues/6329), [#8191](https://github.com/jhipster/generator-jhipster/issues/8191)). En résumé, il est compliqué d'obtenir un rapport réaliste (en supprimant les faux positifs) et dépendant du contexte (la sécurité est toujours un compromis entre le risque/criticité réel et l'effort pour le prévenir).

Cependant, nous recommandons vivement d'utiliser un outil d'analyse des dépendances tel que [Dependabot](https://dependabot.com/) ou [Snyk](https://snyk.io/) si vous utilisez JHipster en production.

## Que faire si vous détectez une vulnérabilité dans l'une des dépendances de JHipster

Si vous trouvez une vulnérabilité dans l'une des dépendances de JHipster, veuillez d'abord vérifier s'il n'y a pas déjà un [problème](https://github.com/jhipster/generator-jhipster/issues) ouvert concernant cette vulnérabilité.

Si rien n'est mentionné, veuillez nous envoyer un rapport de vulnérabilité de sécurité de manière privée. Veuillez lire notre [politique de sécurité](https://github.com/jhipster/generator-jhipster/security/policy) sur la manière de procéder. Incluez les étapes de reproduction de l'exploit, le rapport de sécurité, l'article de blog, etc.

Soyez assuré que l'équipe JHipster s'engage à fournir une pile de développement de haute qualité, prête pour l'entreprise et sécurisée, et que cette question sera une priorité absolue pour nous.

# Comment vérifier les dépendances d'un projet JHipster

## Vérification côté serveur

Pour vérifier si une dépendance Java a une vulnérabilité connue du Common Vulnerabilities and Exposures (CVE), visitez la [base de données nationale des vulnérabilités NIST](https://nvd.nist.gov/) qui maintient une liste à jour.

Le projet OWASP fournit des plugins Maven et Gradle pour vérifier automatiquement toute la chaîne de dépendances, générer un rapport et même bloquer une construction (non recommandé, cela peut être très agressif lors de l'intégration continue).

[Voici la documentation expliquant comment lire le rapport de vérification des dépendances](https://jeremylong.github.io/DependencyCheck/general/thereport.html).

### Utilisation de Maven

Voir la [documentation du plugin OWASP Maven Dependency Check](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/index.html)

Ajoutez le plugin owasp dependency-check :
```
<build>
...
  <plugins>
  ...
  <plugin>
      <groupId>org.owasp</groupId>
      <artifactId>dependency-check-maven</artifactId>
      <version>5.2.4</version>
      <executions>
        <execution>
          <goals>
            <goal>check</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  ..
  </plugins>
  ...
</build>
```
Exécutez `./mvnw verify` pour générer un rapport de vérification des dépendances dans le répertoire `target`.

### Utilisation de Gradle
Voir la [documentation du plugin OWASP Gradle Dependency Check](https://jeremylong.github.io/DependencyCheck/dependency-check-gradle/index.html)

Mettez à jour le fichier `build.gradle` pour appliquer le  [plugin gradle OWASP dependency-check-gradle](https://plugins.gradle.org/plugin/org.owasp.dependencycheck).

```
plugins {
  // Add the plugin in the existing plugins block
  id "org.owasp.dependencycheck" version "5.2.4"

}

if(project.hasProperty('strict-security')) {
  check.dependsOn dependencyCheckAnalyze
}
```

Exécutez  `./gradlew dependencyCheckAnalyze` pour générer un rapport de vérification des dépendances dans le répertoire `build/report`.

La mise à jour des constructions d'intégration continue avec une vérification des dépendances se fait en exécutant `./gradlew check -Pstrict-security`

## Vérification côté client

Depuis la version 6, NPM inclut une vérification de sécurité par défaut pour chaque installation de dépendance. Consultez la page [About security audits
](https://docs.npmjs.com/getting-started/running-a-security-audit) pour plus d'informations.
