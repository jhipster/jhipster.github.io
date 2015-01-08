---
layout: default
title: Setting up Continuous Integration on Windows
sitemap:
priority: 0.7
lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-check-square-o"></i> Setting up Continuous Integration on Windows

## Installing Jenkins

Download Windows Installer from https://wiki.jenkins-ci.org/

The installer configures Jenkins to run as a service using SYSTEM user which can be dangerous, it's safer to change the user's service to a non priviledged one:

http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html

## Configuring Jenkins

### Installing JDK 8

Through Jenkins administration, add a JDK 8 automatic installer.

### Installing Maven 3.2.2

Through Jenkins administration, add a Maven automatic installer from Apache's site.

### Installing PhantomJS

Install binaries from http://phantomjs.org/download.html

CHeck that the executable is included in PATH:

~~~
phantomjs --version
1.9.8
~~~

## Installing NodeJS

Jenkins NodeJS plugin does not work on Windows, so we'll do a manual installation.

Download latest stable version (e.g. 0.10.35) from http://nodejs.org/

Don't install to default directory `C:\Program Files\nodejs` as it requires administration rights, prefer a simpler path like `c:\nodejs`.

http://blog.majgis.com/npm-nodejs-fails-when-run-from-jenkins-on-windows/

Edit `C:\nodejs\node_modules\npm\npmrc` to replace

~~~
prefix=${APPDATA}\npm
~~~

by

~~~
prefix=C:\nodejs\node_modules\npm
~~~

Add the 'C:\nodejs\node_modules\npm' folder to the PATH environment variable, remove the one that was added by the installer: 'C:\Users\<user>\AppData\Roaming\npm'

npm may require git, install it from http://msysgit.github.io/

Ajouter bower et grunt dans les programmes à installer globalement, ici avec leurs versions de base pour avoir un build reproductible.

Il peut être utile de pouvoir faire cohabiter plusieurs version de NodeJS sur la même machine mais les équivalents de nvm sur Windows posent certains problèmes et en fait ne sont utiles qu'en développement, en intégration cotinue on peut s'en passer en configurant le PATH des jobs.



## Installing Ruby and Compass

http://rubyinstaller.org/

Installer la version 1.9.3 sous c:\ruby193

ruby -v
ruby 1.9.3p551 (2014-11-13) [i386-mingw32]

Installer le development Kit sous c:\RubyDevKit pour pouvoir installer des gems nécessitant de la compilation.

https://github.com/oneclick/rubyinstaller/wiki/Development-Kit

http://compass-style.org/install/

gem update --system
gem install compass

Si Ruby et Compass sont installés dans un folder qui n'est pas dans le PATH de Jenkins, le mettre à jour dans les proprietés globales
