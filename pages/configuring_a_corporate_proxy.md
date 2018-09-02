---
layout: default
title: Configuring a corporate proxy
permalink: /configuring-a-corporate-proxy/
redirect_from:
  - /configuring_a_corporate_proxy.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-18T08:00:00-00:00
---

# <i class="fa fa-exchange"></i> Configuring a corporate proxy

When JHipster is used in a company, you probably will need to configure all tools to bypass the corporate proxy.

You can try to configure the `HTTP_PROXY` and `HTTPS_PROXY` environment variables or use a tool like [Cntlm](http://cntlm.sourceforge.net/).

But this probably won't be enough, so you will need to configure separately all the tools that are used with JHipster.

## Introduction

Supposing your proxy is defined with:

- username
- password
- host
- port

The resulting configuration is: `http://username:password@host:port`

If your use [Cntlm](http://cntlm.sourceforge.net/), then your configuration would be: `127.0.0.1:3128`. Otherwise, follow the next steps to configure each tool individually.

## NPM configuration

Use these commands:

```
npm config set proxy http://username:password@host:port
npm config set https-proxy http://username:password@host:port
```

Or you can edit directly your `~/.npmrc` file:

```
proxy=http://username:password@host:port
https-proxy=http://username:password@host:port
https_proxy=http://username:password@host:port
```

## Yarn configuration

Use these commands:

```
yarn config set proxy http://username:password@host:port
yarn config set https-proxy http://username:password@host:port
```

## Git configuration

Use these commands:

```
git config --global http.proxy http://username:password@host:port
git config --global https.proxy http://username:password@host:port
```

Or you can edit directly your `~/.gitconfig` file:

```
[http]
        proxy = http://username:password@host:port
[https]
        proxy = http://username:password@host:port
```

## Maven configuration

Edit the `proxies` session in your `~/.m2/settings.xml` file

```
<proxies>
    <proxy>
        <id>id</id>
        <active>true</active>
        <protocol>http</protocol>
        <username>username</username>
        <password>password</password>
        <host>host</host>
        <port>port</port>
        <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
</proxies>
```

### Maven Wrapper

Create a new file `.mvn/jvm.config` inside the project folder and set the properties accordingly:

```
-Dhttp.proxyHost=host 
-Dhttp.proxyPort=port 
-Dhttps.proxyHost=host 
-Dhttps.proxyPort=port 
-Dhttp.proxyUser=username 
-Dhttp.proxyPassword=password
```

## Gradle configuration

Add the below in your `gradle.properties` file and in your `gradle/wrapper/gradle-wrapper.properties` file if you are downloading the wrapper over a proxy

If you want to set these properties globally then add it in `USER_HOME/.gradle/gradle.properties` file

```
## Proxy setup
systemProp.proxySet="true"
systemProp.http.keepAlive="true"
systemProp.http.proxyHost=host
systemProp.http.proxyPort=port
systemProp.http.proxyUser=username
systemProp.http.proxyPassword=password
systemProp.http.nonProxyHosts=local.net|some.host.com

systemProp.https.keepAlive="true"
systemProp.https.proxyHost=host
systemProp.https.proxyPort=port
systemProp.https.proxyUser=username
systemProp.https.proxyPassword=password
systemProp.https.nonProxyHosts=local.net|some.host.com
## end of proxy setup
```

## Docker

### Native Docker

Depending on your OS, you have to edit a specific file (`/etc/sysconfig/docker` or `/etc/default/docker`).

Then, you have to restart the docker service with: `sudo service docker restart`.

It will not apply to systemd. See this [page from docker](https://docs.docker.com/engine/admin/systemd/#http-proxy)
to configure the proxy.

### Docker with docker-machine

You can create your docker-machine with:

```
docker-machine create -d virtualbox \
    --engine-env HTTP_PROXY=http://username:password@host:port \
    --engine-env HTTPS_PROXY=http://username:password@host:port \
    default
```

Or you can edit the file `~/.docker/machine/machines/default/config.json`.
