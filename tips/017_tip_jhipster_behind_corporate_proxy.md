---
layout: default
title: JHipster behind a corporate proxy
sitemap:
priority: 0.5
lastmod: 2016-08-18T08:00:00-00:00
---

# JHipster behind a corporate proxy

__Tip submitted by [@pascalgrimaud](https://github.com/pascalgrimaud)__

When you want to use JHipster in Enterprise, you have to configure all tools to bypass the corporate proxy.

You can try to configure the `HTTP_PROXY` and `HTTPS_PROXY` environment variables or to use tool like cntlm.
But sometimes, it's not enough.

## Proxy

Supposing your proxy is defined with:

- username
- password
- host
- port

The result is: `http://username:password@host:port`

If your use cntlm, it should be: `127.0.0.1:3128`

## npm

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

## git

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

## bower

Edit your `~/.bowerrc` file:

```
{
    "proxy":"http://username:password@host;port",
    "https-proxy":"http://username:password@host;port"
}
```

## Maven

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

## Gradle

Need to be completed

## Docker

### Native Docker

Depending on your OS, you have to edit a specific file (`/etc/sysconfig/docker` or `/etc/default/docker`)
Then, you have to restart the docker service with: `sudo service docker restart`

### Docker with docker-machine

You can create your docker-machine with:

```
docker-machine create -d virtualbox \
    --engine-env HTTP_PROXY=http://username:password@host;port \
    --engine-env HTTPS_PROXY=http://username:password@host;port \
    default
```

Or you can edit the file `~/.docker/machine/machines/default/config.json`
