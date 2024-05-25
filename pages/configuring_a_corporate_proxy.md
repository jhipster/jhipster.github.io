---
layout: default
title: Configurer un proxy d'entreprise
permalink: /configuring-a-corporate-proxy/
redirect_from:
  - /configuring_a_corporate_proxy.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-18T08:00:00-00:00
---

# <i class="fa fa-exchange"></i> Configurer un proxy d'entreprise

Lorsque JHipster est utilisé dans une entreprise, il est probable que vous devrez configurer tous les outils pour contourner le proxy d'entreprise.

Vous pouvez essayer de configurer les variables d'environnement `HTTP_PROXY` et `HTTPS_PROXY` ou utiliser un outil comme [Cntlm](http://cntlm.sourceforge.net/).

Mais cela ne sera probablement pas suffisant, donc vous devrez configurer séparément tous les outils utilisés avec JHipster.

## Introduction

En supposant que votre proxy soit défini avec :

- nom d'utilisateur
- mot de passe
- hôte
- port

La configuration résultante est : `http://nom_utilisateur:mot_de_passe@hote:port`

Si vous utilisez [Cntlm](http://cntlm.sourceforge.net/), alors votre configuration serait : `127.0.0.1:3128`. Sinon, suivez les étapes suivantes pour configurer chaque outil individuellement.

## Configuration de NPM

Utilisez ces commandes :


```
npm config set proxy http://username:password@host:port
npm config set https-proxy http://username:password@host:port
```

Ou vous pouvez éditer directement votre fichier `~/.npmrc`:

```
proxy=http://username:password@host:port
https-proxy=http://username:password@host:port
https_proxy=http://username:password@host:port
```

## Configuration de NPM

Utilisez ces commandes :

```
npm config set proxy http://username:password@host:port
npm config set https-proxy http://username:password@host:port
```

## Configuration de Git

Utilisez ces commandes :

```
git config --global http.proxy http://username:password@host:port
git config --global https.proxy http://username:password@host:port
```

Ou vous pouvez éditer directement votre fichier `~/.gitconfig`:

```
[http]
        proxy = http://username:password@host:port
[https]
        proxy = http://username:password@host:port
```

## Configuration de Maven

Éditez la session `proxies` dans votre fichier `~/.m2/settings.xml` :

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

Créez un nouveau fichier  `.mvn/jvm.config` dans le dossier du projet et définissez les propriétés en conséquence :

```
-Dhttp.proxyHost=host 
-Dhttp.proxyPort=port 
-Dhttps.proxyHost=host 
-Dhttps.proxyPort=port 
-Dhttp.proxyUser=username 
-Dhttp.proxyPassword=password
```

## Configuration de Gradle

Ajoutez ce qui suit dans votre fichier `gradle.properties` et dans votre fichier  `gradle/wrapper/gradle-wrapper.properties` si vous téléchargez le wrapper via un proxy.

Si vous souhaitez définir ces propriétés globalement, ajoutez-les dans le fichier  `USER_HOME/.gradle/gradle.properties`

```
## Configuration du proxy
systemProp.proxySet="true"
systemProp.http.keepAlive="true"
systemProp.http.proxyHost=hote
systemProp.http.proxyPort=port
systemProp.http.proxyUser=nom_utilisateur
systemProp.http.proxyPassword=mot_de_passe
systemProp.http.nonProxyHosts=local.net|some.host.com

systemProp.https.keepAlive="true"
systemProp.https.proxyHost=hote
systemProp.https.proxyPort=port
systemProp.https.proxyUser=nom_utilisateur
systemProp.https.proxyPassword=mot_de_passe
systemProp.https.nonProxyHosts=local.net|some.host.com
## fin de la configuration du proxy
```

## Docker

### Docker natif

En fonction de votre SE, vous devez éditer un fichier spécifique (`/etc/sysconfig/docker` ou `/etc/default/docker`).

Ensuite, vous devez redémarrer le service docker avec: `sudo service docker restart`.

Cela ne s'appliquera pas à systemd. Consultez cette [page de docker](https://docs.docker.com/engine/admin/systemd/#http-proxy)
pour configurer le proxy.

### Docker avec docker-machine

Vous pouvez créer votre docker-machine avec :

```
docker-machine create -d virtualbox \
    --engine-env HTTP_PROXY=http://nom_utilisateur:mot_de_passe@hote:port \
    --engine-env HTTPS_PROXY=http://nom_utilisateur:mot_de_passe@hote:port \
    default

```

Ou vous pouvez éditer le fichier  `~/.docker/machine/machines/default/config.json`.
