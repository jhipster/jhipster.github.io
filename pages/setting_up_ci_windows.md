---
layout: default
title: Configuration de Jenkins 1 sur Windows
permalink: /setting-up-ci-windows/
redirect_from:
  - /setting_up_ci_windows.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---


# <i class="fa fa-stethoscope"></i> Configuration de Jenkins 1 sur Windows

## Installation de Jenkins

Téléchargez l'installateur Windows de Jenkins depuis [https://jenkins.io/](https://jenkins.io/)

L'installateur configure Jenkins pour s'exécuter en tant que service en utilisant l'utilisateur SYSTEM, ce qui peut être dangereux. Il est plus sûr de changer le service de l'utilisateur en un utilisateur non privilégié:

[http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html](http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html)

## Configuration de Jenkins

### Installation de JDK 17

À travers l'administration de Jenkins, ajoutez un installateur automatique JDK 17.

### Installation de Maven

À travers l'administration de Jenkins, ajoutez un installateur automatique Maven depuis le site Apache.

### Installation de PhantomJS

Installez les binaires depuis [http://phantomjs.org/download.html](http://phantomjs.org/download.html)

Vérifiez que l'exécutable est inclus dans le PATH :

~~~
phantomjs --version
2.1.1
~~~

## Installation de NodeJS

Le plugin Jenkins NodeJS ne fonctionne pas sur Windows, donc nous ferons une installation manuelle.

Téléchargez la dernière version LTS (Long Term Support) 64 bits depuis [http://nodejs.org/](http://nodejs.org/)

N'installez pas NodeJS dans le répertoire par défaut `C:\Program Files\nodejs` car cela nécessite des droits d'administration, préférez un chemin plus simple comme `c:\nodejs`.

Modifiez `C:\nodejs\node_modules\npm\npmrc` pour remplacer

~~~
prefix=${APPDATA}\npm
~~~

par

~~~
prefix=C:\nodejs\node_modules\npm
~~~

Ajoutez le dossier 'C:\nodejs\node_modules\npm' à la variable d'environnement PATH, supprimez celui qui a été ajouté par l'installateur : 'C:\Users\<user>\AppData\Roaming\npm'

npm peut nécessiter Git, installez-le depuis [https://git-for-windows.github.io/](https://git-for-windows.github.io/)

Ajoutez Bower et Gulp :

~~~
npm install -g bower gulp
bower --version
gulp --version
~~~

Il peut être utile d'avoir plusieurs versions de NodeJS sur la même machine mais les équivalents de `nvm` sur Windows se concentrent davantage sur l'environnement de développement que sur l'intégration continue. Donc, si un job nécessite une autre version de NodeJS, modifiez sa variable PATH.