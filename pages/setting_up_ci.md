---
layout: default
title: Configuration de l'intégration continue
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-03T14:40:00-00:00
---


# <i class="fa fa-stethoscope"></i> Configuration de l'intégration continue

Configurer l'intégration continue (CI) pour une application JHipster est plus complexe que pour une application Spring MVC typique en raison de la complexité associée à la maintenance d'une construction composée de deux piles logicielles :

- le code back-end Java avec Maven ou Gradle
- le front-end JavaScript avec NodeJS, NPM

Chaque pile est livrée avec sa propre gestion des dépendances (artefacts Maven, paquets NPM) avec des conflits potentiels à résoudre.

JHipster devrait prendre en charge les systèmes CI suivants dès le départ :

- Jenkins :
    - [Configurer Jenkins 1]({{ site.url }}/configuration-ci-jenkins1/)
    - [Configurer Jenkins 2]({{ site.url }}/configuration-ci-jenkins2/) (recommandé)
- Travis : consultez la [documentation Travis](https://docs.travis-ci.com/user/getting-started/)
- GitLab CI : consultez la [documentation GitLab CI](https://about.gitlab.com/gitlab-ci/)
- Azure Pipelines : consultez la [documentation Azure Pipelines](https://docs.microsoft.com/fr-fr/azure/devops/pipelines/?view=vsts)
- GitHub Actions : consultez la [documentation GitHub Actions](https://github.com/features/actions)
- CircleCI : consultez la [documentation CircleCI](https://circleci.com/docs/)

## Exécution du sous-générateur

Pour générer ces fichiers de configuration, exécutez cette commande dans le dossier de votre projet :

`jhipster ci-cd`

Puis répondez à toutes les questions.

### Quel pipeline CI/CD voulez-vous générer ?

Le pipeline CI/CD que vous souhaitez générer :

- Pipeline Jenkins
- Azure Pipelines
- GitLab CI
- GitHub Actions
- Travis CI
- CircleCI

**Remarque** : lorsque vous sélectionnez le pipeline Jenkins, un nouveau fichier `src/main/docker/jenkins.yml` sera généré.
Ainsi, vous pouvez tester Jenkins localement en exécutant :

```
docker-compose -f src/main/docker/jenkins.yml up -d
```

### Souhaitez-vous effectuer la construction dans un conteneur Docker ? (Jenkins / GitLab)

Si Docker est installé, vous pouvez effectuer la construction à l'intérieur d'un conteneur Docker.

### Dans GitLab CI, effectuez-vous la construction dans un conteneur docker (indice : GitLab.com utilise un conteneur Docker) ? (GitLab)

Si vous utilisez un GitLab CI privé, vous pouvez utiliser directement les runners.

Si vous utilisez le pipeline officiel GitLab.com, vous devez utiliser un conteneur Docker.

### Souhaitez-vous envoyer le statut de la construction à GitLab ? (Jenkins)

Si votre Jenkins dépend d'un dépôt GitLab, vous pouvez envoyer le statut de la construction à GitLab. Votre Jenkins doit être correctement configuré.

### Quelles tâches/intégrations souhaitez-vous inclure ?

- Déployer votre application vers un *Artifactory*
- Analyser votre code avec *Sonar*
- Construire et publier une image *Docker*
- *Snyk* : analyse des dépendances pour les vulnérabilités de sécurité (nécessite SNYK_TOKEN)
- Déployer vers *Heroku* (nécessite HEROKU_API_KEY défini sur le service CI)
- Souhaitez-vous activer le tableau de bord Cypress (nécessite à la fois CYPRESS_PROJECT_ID et CYPRESS_RECORD_KEY définis sur le service CI)

### Déployer votre application vers un *Artifactory* (Jenkins / GitLab)

- *Artifactory* : quel est l'ID de distributionManagement pour les snapshots ?
- *Artifactory* : quelle est l'URL de distributionManagement pour les snapshots ?
- *Artifactory* : quel est l'ID de distributionManagement pour les versions ?
- *Artifactory* : quelle est l'URL de distributionManagement pour les versions ?

### Analyser votre code avec *Sonar*

- *Sonar* : quel est le nom du serveur Sonar ?

Choisissez le nom du serveur Sonar, défini dans votre configuration Jenkins.

- *Sonar* : quelle est l'URL du serveur Sonar ?
- *Sonar* : quelle est l'organisation du serveur Sonar ?

Ici, vous pouvez choisir de pousser votre analyse Sonar vers [SonarCloud.io](https://sonarcloud.io).
Dans ce cas, vous devez ajouter la variable d'environnement `SONAR_TOKEN`.

### Construire et publier une image *Docker*

- *Docker* : quelle est l'URL du registre Docker ?

Par défaut, vous pouvez utiliser Docker Hub : [https://registry.hub.docker.com](https://registry.hub.docker.com)

- *Docker* : quel est l'identifiant des crédits Jenkins pour le registre Docker ?

Par défaut, vous pouvez utiliser : `docker login`
- *Docker*: quel est le nom de l'organisation pour le registre Docker ?

### Snyk : analyse des dépendances pour les vulnérabilités de sécurité

Vous devez ajouter la variable d'environnement `SNYK_TOKEN` (vérifiez votre [compte Snyk](https://app.snyk.io/account))

Consultez la documentation complète sur [https://snyk.io/](https://snyk.io/)

### Tableau de bord Cypress : enregistrez vos tests dans une application Web fournie par Cypress

Vous devez ajouter les variables d'environnement `CYPRESS_PROJECT_ID` et `CYPRESS_RECORD_KEY` (vérifiez votre [projet Dashboard](https://dashboard.cypress.io/))

Vous pouvez désactiver l'enregistrement en changeant la valeur de la variable d'environnement `CYPRESS_ENABLE_RECORD` en false.

Consultez la documentation complète sur [cypress.io/dashboard](https://www.cypress.io/dashboard/)

### Déploiement vers *Heroku*

- *Heroku* : nom de votre application Heroku ?

Vous devez ajouter la variable d'environnement `HEROKU_API_KEY`.

Remarque : avant d'utiliser le déploiement vers Heroku, vous devez utiliser le [sous-générateur Heroku]({{ site.url }}/heroku) localement.
Il créera tous les fichiers nécessaires à votre outil d'intégration continue.

## Informations supplémentaires

En fonction de votre système d'exploitation et de l'endroit où vous avez poussé votre projet, vous devrez probablement rendre l'enveloppe exécutable avant d'utiliser une CI/CD.

Si vous utilisez Maven :

- `chmod +x mvnw`
- `git update-index --chmod=+x mvnw`

Si vous utilisez Gradle :

- `chmod +x gradlew`
- `git update-index --chmod=+x gradlew`

## Documentation sur les variables d'environnement :

- Pipeline Jenkins : vous devriez utiliser le [plugin Credentials](https://wiki.jenkins-ci.org/display/JENKINS/Credentials+Plugin)
- GitLab CI : consultez la [documentation sur les variables secrètes](https://docs.gitlab.com/ce/ci/variables/#secret-variables)
- Travis CI : lisez les [variables d'environnement](https://docs.travis-ci.com/user/environment-variables/)
- GitHub Actions : consultez la [documentation sur les variables d'environnement](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables)
- Azure Pipelines : lisez la [documentation sur les variables prédéfinies](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)
- CircleCI : consultez la [documentation sur les variables d'environnement](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables)