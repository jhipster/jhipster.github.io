---
layout: default
title: Séparation du front-end et du serveur API
permalink: /separating-front-end-and-api/
sitemap:
    priority: 0.7
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-unlink"></i> Séparation du front-end et du serveur API

## Introduction

JHipster est un outil de développement "full-stack" dont le but est de vous faire travailler efficacement avec votre code front-end (Angular/React) et votre code back-end (Spring Boot).

Cependant, il est courant de séparer les codes front-end et back-end, généralement parce qu'ils sont développés par des équipes différentes et ont un cycle de vie différent.

**Veuillez noter** que ce n'est pas la façon de travailler par défaut de JHipster : ce n'est pas complexe à faire, et fonctionne bien, mais c'est un sujet avancé. Si vous débutez avec JHipster, nous vous recommandons de commencer par utiliser notre façon de travailler standard.

## Génération d'une seule application front-end ou back-end

Vous pouvez choisir de générer uniquement une application back-end JHipster ou une application front-end JHipster. Au moment de la génération, il suffit de choisir les indicateurs qui sont décrits dans notre [documentation sur la génération d'application]({{ site.url }}/creation-dune-application/):

- `jhipster --skip-client` générera uniquement une application back-end (c'est généralement ce que sont les microservices JHipster)
- `jhipster --skip-server [options]` générera uniquement une application front-end (par exemple, `jhipster --skip-server --db=sql --auth=jwt`)

Cela devrait fonctionner correctement pour les monolithes, car cela n'a pas beaucoup de sens pour les microservices (qui n'ont de toute façon pas de front-end) et les passerelles (qui sont des monolithes avec le service Spring Cloud Gateway activé).

## Organisation des répertoires

JHipster utilise la structure de répertoires standard de Maven. Lorsque vous travaillez sur le back-end, vous pouvez consulter la [documentation sur la structure de répertoire standard de Maven](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html).

Lorsque vous travaillez sur le front-end, il y a 2 répertoires que vous devez connaître :

- `src/main/webapp` est l'endroit où l'application cliente sera développée
- `target/classes/static` est l'endroit où votre application cliente sera empaquetée

Si vous avez des équipes distinctes travaillant sur le front-end et le back-end, vous avez deux solutions :

- Les deux équipes peuvent travailler sur le même projet. Comme les répertoires sont séparés, il n'y aura pas beaucoup de conflits entre les équipes. Pour rendre les choses encore plus propres, les deux équipes pourraient travailler sur des branches séparées.
- Le code front-end peut être stocké dans un projet Git spécifique, puis importé dans le projet principal back-end en tant que sous-module Git. Cela nécessiterait de déplacer les scripts de construction côté client.

## Routage et mise en cache des requêtes HTTP

Une fois que le front-end et le back-end ont été séparés, la question sera de savoir comment gérer les requêtes HTTP :

- Tous les appels API utiliseront un préfixe `/api`. Si vous utilisez Angular, il existe également une constante spécifique `SERVER_API_URL`, définie dans la configuration `webpack.common.js`, qui peut enrichir ce préfixe. Par exemple, vous pouvez utiliser `"http://api.jhipster.tech:8081/"` comme serveur API back-end (Si vous faites cela, veuillez lire notre documentation sur CORS ci-dessous).
- `/index.html` ne doit pas être mis en cache par le navigateur ou le serveur.
- Les appels à `/` qui servent des ressources statiques (du front-end) `/app` (qui contient l'application côté client) et `/content` (qui contient le contenu statique, comme les images et le CSS) doivent être mis en cache en production, car ces ressources sont hachées.
- Les appels à `/i18n` peuvent être mis en cache mais les fichiers eux-mêmes ne sont pas hachés, des chaînes de requête d'URL sont utilisées
- Les appels à une route inexistante doivent rediriger la requête vers `index.html`. Cela est normalement géré dans le backend via `ClientForwardController`. Lors du déploiement du client séparément, cela doit être configuré. Voir la documentation [Angular](https://angular.io/guide/deployment#server-configuration) ou [React](https://facebook.github.io/create-react-app/docs/deployment) pour plusieurs exemples.

# Utilisation de BrowserSync
En mode `dev`, JHipster utilise BrowserSync pour le rechargement à chaud de l'application front-end. BrowserSync a un proxy ([voici sa documentation](https://www.browsersync.io/docs/options#option-proxy)) qui redirigera les requêtes de `/api` vers un serveur back-end (par défaut, `http://127.0.0.1:8080`).

Cela ne fonctionne qu'en mode `dev`, mais c'est un moyen très puissant d'accéder à différents serveurs API depuis le front-end.

## Utilisation de CORS

CORS ([Cross-origin request sharing](https://wikipedia.org/wiki/Cross-origin_resource_sharing)) permet d'accéder à différents serveurs back-end avec le même front-end, sans configurer de proxy.

C'est une solution facile à utiliser, mais elle peut être moins sécurisée en production.

JHipster fournit une configuration CORS prête à l'emploi :

- CORS peut être configuré en utilisant la propriété `jhipster.cors`, comme défini dans [les propriétés d'application communes de JHipster]({{ site.url }}/common-application-properties/)
- Il est activé par défaut en mode `dev` pour les monolithes et les passerelles. Il est désactivé par défaut pour les microservices car vous êtes censé y accéder via une passerelle.
- Il est désactivé par défaut en mode `prod`, pour des raisons de sécurité.

## Utilisation de NGinx

Une autre solution pour séparer les codes front-end et back-end est d'utiliser un serveur proxy. C'est très courant en production, et certaines équipes utilisent également cette technique en développement.

Cette configuration changera en fonction de votre cas d'utilisation spécifique, elle ne peut donc pas être automatisée par le générateur, voici ci-dessous une configuration de base.

Créez un fichier Docker Compose `src/main/docker/nginx.yml` :

    version: '2'
    services:
      nginx:
        image: nginx:1.15-alpine
        volumes:
        - ./../../../target/static:/usr/share/nginx/html
        - ./nginx/site.conf:/etc/nginx/conf.d/default.conf
        ports:
        - "8000:80"

Cette image Docker configurera un serveur NGinx, qui lira les ressources statiques à partir de `target/static` : c'est là que l'application front-end JHipster est générée par défaut. En production, vous aurez probablement un dossier spécifique pour cela.

Elle lit également un fichier `./nginx/site.conf` : il s'agit d'un fichier de configuration spécifique à NGinx.
### configuration lambda
Voici un exemple de `site.conf` :

    server {
        listen 80;
        index index.html;
        server_name localhost;
        error_log  /var/log/nginx/error.log;

        root /usr/share/nginx/html;

        location /api {
            proxy_pass http://api.jhipster.tech:8081/api;
        }
        location /management {
            proxy_pass http://api.jhipster.tech:8081/management;
        }
        location /swagger-resources {
            proxy_pass http://api.jhipster.tech:8081/swagger-resources;
        }        
        location /v2 {
           proxy_pass http://api.jhipster.tech:8081/v2;
        }
        location /auth {
           proxy_pass http://api.jhipster.tech:8081/auth;
        }
 
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

Cette configuration signifie que :

- NGinx fonctionnera sur le port `80`
- Il lira les ressources statiques dans le dossier `/usr/share/nginx/html`, et
- Il agira comme un proxy de `/api` vers `http://api.jhipster.tech:8081/api`
- Toute requête non traitée sera redirigée vers `index.html`

Cette configuration nécessitera quelques ajustements en fonction de vos besoins spécifiques, mais devrait être un bon point de départ pour la plupart des applications.