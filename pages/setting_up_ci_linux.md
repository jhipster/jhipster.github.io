---
layout: default
title: Configuration de Jenkins 1 sur Linux
permalink: /setting-up-ci-linux/
redirect_from:
  - /setting_up_ci_linux.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Configuration de Jenkins 1 sur Linux

Les instructions ci-dessous sont pour un serveur Red Hat/CentOS mais peuvent être adaptées pour d'autres distributions Linux.

## Installation de Jenkins

Suivez les instructions depuis [https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions)

~~~~
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
sudo yum install jenkins

sudo service jenkins start
~~~~

Un utilisateur `jenkins` a été créé, son répertoire principal est `/var/lib/jenkins`

## Configuration de Jenkins

### Installation de JDK 17

À travers l'administration de Jenkins, ajoutez un installateur automatique JDK 17.

### Installation de Maven

À travers l'administration de Jenkins, ajoutez un installateur automatique Maven depuis le site Apache.

### Installation de NodeJS

Vous pourriez installer NodeJS globalement mais il est très probable que vous voudriez avoir différentes versions de NodeJS pour différents projets.

Nous suggérons 2 alternatives ci-dessous, choisissez celle que vous préférez.

#### Plugin Jenkins NodeJS

Installez le plugin Jenkins NodeJS.

À travers l'administration de Jenkins, ajoutez une installation NodeJS :

- Installateur automatique depuis nodejs.org, utilisez la dernière version LTS (Long Term Support) 64 bits
- Packages npm globaux à installer : bower gulp

#### Installation locale de NodeJS

Installez NodeJS localement en utilisant le script ci-dessous puis mettez à jour le PATH de Jenkins pour l'utiliser.

~~~ bash
# spécifiez la version que nous voulons
export NODE_VERSION=4.3.1

# téléchargement
cd /tmp
wget http://nodejs.org/dist/v$NODE_VERSION/node-v4.3.1.tar.gz
tar xvfz node-v$NODE_VERSION.tar.gz

# construisez-le et installez-le uniquement localement
cd node-v$NODE_VERSION
./configure --prefix=/var/lib/jenkins/node-v$NODE_VERSION && make && make install

# Vérifiez les versions de node et npm
export PATH=/var/lib/jenkins/node-v$NODE_VERSION/bin:$PATH
node --version
# v4.3.1
npm --version
# 3.7.5

# installez des outils
npm install -g bower gulp
bower --version
# 1.7.7
gulp --version
# 3.9.1
~~~

Assurez-vous de mettre à jour le PATH(chemin) de Jenkins.
