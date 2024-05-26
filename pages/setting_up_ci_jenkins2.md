---
layout: default
title: Configurer l'intégration continue sur Jenkins 2
permalink: /setting-up-ci-jenkins2/
redirect_from:
  - /setting_up_ci_jenkins2.html
sitemap:
    priority: 0.7
    lastmod: 2017-01-19T14:15:00-00:00
---

# <i class="fa fa-stethoscope"></i> Configurer l'intégration continue sur Jenkins 2

## Installer Jenkins 2

### Standard

Installez JDK 17  sur votre machine.

Rendez-vous sur le site officiel [https://jenkins.io/2.0/](https://jenkins.io/2.0/)

Téléchargez le `jenkins.war`

### Avec Docker

Lancez l'[image Docker](https://hub.docker.com/r/jenkins/jenkins) 
(_le port par défaut a été changé en 18080 car l'application JHipster est configurée pour fonctionner sur le port 8080_)

`docker container run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkins/jenkins`

Vous pouvez ensuite accéder au tableau de bord de Jenkins sur 
- http://localhost:18080 (sur MacOS & Linux)
- http://192.168.99.100:18080 (sur Windows)
  - Si cela ne fonctionne pas, remplacez `192.168.99.100` par l'adresse IP par défaut de votre docker : `docker-machine ip default`

Note : Il vous sera demandé un `initialAdminPassword` que vous trouverez dans les journaux lors du démarrage de votre conteneur.
Vous pouvez également y accéder via `docker logs jenkins2`
ex. :

```
*************************************************************
*************************************************************
*************************************************************

La configuration initiale de Jenkins est requise. Un utilisateur administrateur a été créé et un mot de passe généré.
Veuillez utiliser le mot de passe suivant pour procéder à l'installation :

6707db8735be4ee29xy056f65af6ea13

Ceci peut également être trouvé dans : /var/jenkins_home/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************
```

## Create a new Job


## Créer un nouveau Job

- Ajouter un nouvel élément
    - Entrez un nom d'élément
    - Sélectionnez pipeline
    - Cliquez sur OK

![Jenkins2 item]({{ site.url }}/images/jenkins2_add_item.png)

- Définition : Script pipeline depuis SCM
- SCM : Git
- Dépôts
    - URL du dépôt : sélectionnez votre dépôt ici

![Jenkins2 pipeline]({{ site.url }}/images/jenkins2_pipeline.png)

## Jenkinsfile

![Jenkins2 result]({{ site.url }}/images/jenkins2_result.png)
