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

The result is: http://username:password@host:port

If your use cntlm, it should be: `127.0.0.1:3128`

## npm

Use these commands:

```
npm config set proxy http://username:password@host:port
npm config set https-proxy http://username:password@host:port
```

Or you can edit directly your `~/.npmrc` file:


## git

Use these commands:

```
git config --global http.proxy http://username:password@host:port
git config --global https.proxy http://username:password@host:port
```

Or you can edit directly your `.gitconfig` file:


## bower

Edit your `~/.bowerrc` file:

```
{
    "proxy":"http://username:password@host;port",
    "https-proxy":"http://username:password@host;port"
}
```

## Maven

Edit your `~/.m2/settings.xml` file:

```
aaa
```

## Gradle

Need to be completed

## Docker

### Native Docker

### Docker with docker-machine
