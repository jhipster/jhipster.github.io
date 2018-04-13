---
layout: default
title: Setting up Jenkins 1 on Linux
permalink: /setting-up-ci-linux/
redirect_from:
  - /setting_up_ci_linux.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Jenkins 1 on Linux

The instructions below are for a Red Hat/CentOS server but can be easily adapted for other Linux distributions.

## Installing Jenkins

Follow the instructions from [https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions)

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

### Installing Maven

Through Jenkins administration, add a Maven automatic installer from Apache's site.

### Installing NodeJS

You could install NodeJS globally but it's very likely that you may want to have different versions of NodeJS for different projects.

We suggest 2 alternatives below, choose the one you prefer.

#### Jenkins NodeJS plugin

Install Jenkins NodeJS plugin.

Through Jenkins administration, add a NodeJS installation:

- Automatic installer from nodejs.org, use the latest LTS (Long Term Support) 64-bit version
- Global npm packages to install: bower gulp

#### Local NodeJS installation

Install NodeJS locally using the script below and then update the Jenkins PATH to use it.

~~~ bash
# specify which version we want
export NODE_VERSION=4.3.1

# download
cd /tmp
wget http://nodejs.org/dist/v$NODE_VERSION/node-v4.3.1.tar.gz
tar xvfz node-v$NODE_VERSION.tar.gz

# build it and install it only locally
cd node-v$NODE_VERSION
./configure --prefix=/var/lib/jenkins/node-v$NODE_VERSION && make && make install

# Check versions of node and  npm
export PATH=/var/lib/jenkins/node-v$NODE_VERSION/bin:$PATH
node --version
# v4.3.1
npm --version
# 3.7.5

# install tools
npm install -g bower gulp
bower --version
# 1.7.7
gulp --version
# 3.9.1
~~~

Make sure you update the Jenkins PATH.
