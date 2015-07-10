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

Make sure you update jenkins PATH.

## Installing Ruby and Compass

Ruby's version in offical RedHat depots is rather old 1.8.x, we'd rather compile latest patch of 1.9.3.
We will do a simple and single installation.

~~~ bash
# install development tools
sudo yum install gcc-c++ patch readline readline-devel zlib zlib-devel
sudo yum install libyaml-devel libffi-devel openssl-devel make
sudo yum install bzip2 autoconf automake libtool bison iconv-devel

# download ruby source tarball
wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p551.tar.gz
# unpack it
tar xvzf ruby-1.9.3-p551.tar.gz

# build ruby
cd ruby-1.9.3-p551
./configure && make && sudo make install

# check that ruby is in path and in expected version
ruby -v
ruby 1.9.3p551 (2014-11-13 revision 48407) [x86_64-linux]

# install Compass and implicitly SASS
gem install compass
compass --version
~~~

If Ruby and Compass have been installed in a directory that is not included in jenkins user's PATH, you can either update it in bash or through Jenkins UI in global properties:

~~~
name: PATH
value: /usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
~~~
