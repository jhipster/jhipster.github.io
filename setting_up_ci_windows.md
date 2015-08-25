---
layout: default
title: Setting up Continuous Integration on Windows
sitemap:
priority: 0.7
lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-check"></i> Setting up Continuous Integration on Windows

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

Add bower and grunt:

~~~
npm install -g bower grunt-cli
bower --version
grunt --version
~~~

It can be useful to have multiple versions of NodeJS on same machine but 'nvm' equivalents on Windows focus more on development environment than continuous integration. So if a job requires another version of NodeJS, change its PATH.
