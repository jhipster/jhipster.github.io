---
layout: default
title: Setting up Jenkins 1 on Windows
permalink: /setting-up-ci-windows/
redirect_from:
  - /setting_up_ci_windows.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Jenkins 1 on Windows

## Installing Jenkins

Download the Jenkins Windows Installer from [https://jenkins.io/](https://jenkins.io/)

The installer configures Jenkins to run as a service using the SYSTEM user which can be dangerous, it's safer to change the user's service to a non priviledged one:

[http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html](http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html)

## Configuring Jenkins

### Installing JDK 8

Through Jenkins administration, add a JDK 8 automatic installer.

### Installing Maven

Through Jenkins administration, add a Maven automatic installer from Apache's site.

### Installing PhantomJS

Install binaries from [http://phantomjs.org/download.html](http://phantomjs.org/download.html)

Check that the executable is included in PATH:

~~~
phantomjs --version
2.1.1
~~~

## Installing NodeJS

Jenkins NodeJS plugin does not work on Windows, so we'll do a manual installation.

Download latest LTS (Long Term Support) 64-bit version from [http://nodejs.org/](http://nodejs.org/)

Don't install NodeJS to the default directory `C:\Program Files\nodejs` as it requires administration rights, prefer a simpler path like `c:\nodejs`.

Edit `C:\nodejs\node_modules\npm\npmrc` to replace

~~~
prefix=${APPDATA}\npm
~~~

by

~~~
prefix=C:\nodejs\node_modules\npm
~~~

Add the 'C:\nodejs\node_modules\npm' folder to the PATH environment variable, remove the one that was added by the installer: 'C:\Users\<user>\AppData\Roaming\npm'

npm may require Git, install it from [https://git-for-windows.github.io/](https://git-for-windows.github.io/)

Add Bower and Gulp:

~~~
npm install -g bower gulp
bower --version
gulp --version
~~~

It can be useful to have multiple versions of NodeJS on the same machine but `nvm` equivalents on Windows focus more on development environment than continuous integration. So if a job requires another version of NodeJS, change its PATH variable.
