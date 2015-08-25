---
layout: default
title: Setting up Continuous Integration on Linux
sitemap:
priority: 0.7
lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-check"></i> Setting up Continuous Integration on Linux server

The instructions below are for a RedHat/CentOS server but can be easily adapted for other Linux distributions.

## Installing Jenkins

https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+RedHat+distributions

~~~~
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
sudo yum install jenkins

sudo service jenkins start
~~~~

A `jenkins` user has been created, its home directory is `/var/lib/jenkins`

## Configuring Jenkins

### Installing JDK 8

Through Jenkins administration, add a JDK 8 automatic installer.

### Installing Maven 3.2.2

Through Jenkins administration, add a Maven automatic installer from Apache's site.

### Installing NodeJS

Install Jenkins NodeJS plugin.

Through Jenkins administration, add a NodeJS instllation:
- automatic installer from nodejs.org, latest stable 0.10.xx version
- Global npm packages to install: bower grunt

This way we can easily configure different versions of NodeJS if we need it in the future.

Avoid 0.11.xx versions as there are known issues with 0.11.14.

Jenkins NodeJS plugin	0.2.1 has an issue, it proposes 0.10.33 as latest 0.10 version available from nodejs.org while on the site there is also 0.
10.35, so if you want to use latest version you'll have to install manually:

~~~ bash
# specify which version we want
export NODE_VERSION=0.10.35

# download
cd /tmp
wget http://nodejs.org/dist/v$NODE_VERSION/node-v0.10.35.tar.gz
tar xvfz node-v$NODE_VERSION.tar.gz

# build it and install it only locally
cd node-v$NODE_VERSION
./configure --prefix=/var/lib/jenkins/node-v$NODE_VERSION && make && make install

# Check versions of node and  npm
export PATH=/var/lib/jenkins/node-v$NODE_VERSION/bin:$PATH
node --version
# v0.10.35
npm --version
# 1.4.28

# install tools
npm install -g bower grunt-cli
bower --version
# 1.3.12
grunt --version
# 0.1.13
~~~

Make sure you update the Jenkins PATH.
