---
layout: default
title: Separating the front-end and the API server
permalink: /separating-front-end-and-api/
sitemap:
    priority: 0.7
    lastmod: 2019-01-29T00:00:00-00:00
---

# <i class="fa fa-unlink"></i> Separating the front-end and the API server

## Introduction

JHipster is a "full-stack" development tool, and its goal is to make you work efficiently with your front-end code (Angular/React) and your back-end code (Spring Boot).

However, it is a common requirement to separate the front-end and the back-end codes, typically because they are developed by different teams and have a different lifecycle.

**Please note** that this isn't the default JHipster way of working: this isn't complex to do, and works well, but this is an advanced topic. If you are just getting started with JHipster, we recommend that you begin by using our standard way of working.

## Generating only a front-end or a back-end application

You can choose to generate only a JHipster back-end or JHipster front-end application. At generation time, this is only a matter of choosing flags which are described in our [application generation documentation]({{ site.url }}/creating-an-app/):

- `jhipster --skip-client` will only generate a back-end application (this is typically what JHipster microservices are)
- `jhipster --skip-server` will only generate a front-end application

This should only work well for monoliths, as this doesn't make much sense for microservices (which have no front-end anyway) and gateways (which are basically a monolith with the Zuul gateway service enabled).

## Directory layout

JHipster uses the standard Maven directory layout. When working on the back-end, you can just read the [Maven standard directory layout documentation](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html).

When working on the front-end, there are 2 directories you need to know:

- `src/main/webapp` is where the client application will be developed
- `target/www` is where your client application will be packaged

If you have separate teams working on the front-end and back-end, you have two solutions:

- Both teams can work on the same project. As the directories are separated, there won't have much conflicts between teams. To make things even cleaner, both teams could work on separate branches.
- The front-end code can be stored in a specific Git project, and then imported into the main back-end project as a Git sub-module. This would require to move the client-side build scripts, but this is a simple refactoring.

## HTTP requests routing and caching

Once the front-end and back-end have been separated, the issue will be how to handle HTTP requests:

- All API calls will use a `/api` prefix. If you are using Angular, there is also a specific `SERVER_API_URL` constant, defined in the `webpack.common.js` configuration, that can enrich this prefix. For example, you can use `"http://api.jhipster.tech:8081/"` as a back-end API server (If you do this, please read our documentation on CORS below).
- Calls to `/` serve static assets (from the front-end), which should not be cached by the browser.
- Calls to `/app` (which contains the client-side application) and to `/content` (which contains the static content, like images and CSS) should be cached in production, as those assets are hashed.
- Calls to a non-existant route should forward the request to `index.html`. This is normally handled in the backend through `ClientForwardController`. When deploying the client separately, this needs to be configured.  See the [Angular](https://angular.io/guide/deployment#server-configuration) or [React](https://facebook.github.io/create-react-app/docs/deployment) documentation for several examples.

# Using BrowserSync

In `dev` mode, JHipster uses BrowserSync for hot-reload of the front-end application. BrowserSync has a proxy ([here is its documentation](https://www.browsersync.io/docs/options#option-proxy)) that will route requests from `/api` to a back-end server (by default, `http://127.0.0.1:8080`).

This only works in `dev` mode, but this is a very powerful way of accessing different API servers from the front-end.

## Using CORS

CORS ([Cross-origin request sharing](https://wikipedia.org/wiki/Cross-origin_resource_sharing)) allow to access different back-end servers with the same front-end, without configuring a proxy.

This is an easy-to-use solution, but it can be less secure in production.

JHipster provides out-of-the-box a CORS configuration:

- CORS can be configured using the `jhipster.cors` property, as defined in [the JHipster common application properties]({{ site.url }}/common-application-properties/)
- It is enabled by default in `dev` mode for monoliths and gateways. It is disabled by default for microservices as you are supposed to access them through a gateway.
- It is disabled by default in `prod` mode, for security reasons.

## Using NGinx

Another solution to separate the front-end and back-end codes is to use a proxy server. This is very common in production, and some teams also use this technique in development.

This configuration will change depending on your specific use-case, so this cannot be automated by the generator, here is below a working configuration.

Create a `src/main/docker/nginx.yml` Docker Compose file:

    version: '2'
    services:
      nginx:
        image: nginx:1.15-alpine
        volumes:
        - ./../../../target/www:/usr/share/nginx/html
        - ./nginx/site.conf:/etc/nginx/conf.d/default.conf
        ports:
        - "8000:80"

This Docker image will configure an NGinx server, that reads the static assets from `target/www`: this is where the JHipster front-end application is generated by default. In production, you will probably have a specific folder for this.

It also reads a `./nginx/site.conf` file: this is a NGinx-specific configuration file.
### configuration lambda
Here is a sample `site.conf`:

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

This configuration means that:

- NGinx will run on port `80`
- It will read the static assets in folder `/usr/share/nginx/html`, and
- It will act as a proxy from `/api` to `http://api.jhipster.tech:8081/api`
- Any unhandled requests will forward to `index.html`

This configuration will require some tuning depending on your specific needs, but should be a good enough starting point for most applications.

### Configuration with Oauth 2.0 and traefik
Here is a sample `site.conf` for Oauth 2.0:
if the server base name is `back`, and the name of the server hosting traefik is `api.jhipster.tech`.
If this configuration is for a docker image, don't use `localhost` instead of `api.jhipster.tech` as it's resolv in container, not your host.

    server {
        listen 80;
        index index.html;
        server_name localhost;
        error_log  /var/log/nginx/error.log;

        root /usr/share/nginx/html;

        location ~* ^/api(.*) {
            proxy_pass http://api.jhipster.tech/services/back/api$1;
        }
        location ~* ^/management(.*) {
            proxy_pass http://api.jhipster.tech/services/back/management$1;
        }
        location ~* ^/swagger-resources(.*) {
            proxy_pass http://api.jhipster.tech/services/back/swagger-resources$1;
        }        
        location ~* ^/v2/api-docs(.*) {
           proxy_pass http://api.jhipster.tech/services/back/v2/api-docs$1;
        }
        location ~* ^/auth(.*) {
           proxy_pass http://api.jhipster.tech/services/back/auth$1;
        }
        location ~* ^/oauth2(.*) {
           proxy_pass http://api.jhipster.tech/services/back/oauth2$1;
        }
        location ~* ^/login(.*) {
           proxy_pass http://api.jhipster.tech/services/back/login$1;
        }
 
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

This configuration means that:

- NGinx will run on port `80`
- It will read the static assets in folder `/usr/share/nginx/html`, and
- It will act as a proxy from `/api` to `http://api.jhipster.tech/services/back`
- `http://api.jhipster.tech/services/back` is load balanced by traefik
- Any unhandled requests will forward to `index.html`