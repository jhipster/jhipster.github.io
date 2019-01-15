---
layout: default
title: Using JHipster in production
permalink: /production/
redirect_from:
  - /production.html
sitemap:
    priority: 0.7
    lastmod: 2014-02-17T00:00:00-00:00
---

# <i class="fa fa-play-circle"></i> Using JHipster in production

JHipster generates a fully production-ready, optimized and secured application. This section describes the more important options - if you are in hurry, just run a normal production build, but don't forget to read the security section!

1. [Building a production package](#build)
2. [Running in production](#run)
3. [Performance optimizations](#performance)
4. [Security](#security)
5. [Monitoring](#monitoring)

## <a name="build"></a> Building a production package

### Testing a production build

This allows to test a production build from Maven, without building a real package.

To use JHipster in "production" mode, use the pre-configured `prod` profile. With Maven, please run:

`./mvnw -Pprod`

When using Gradle, please run:

`./gradlew -Pprod`

This profile will compile, test and package your application with all productions settings.

If you want more information on the available profiles, please go the section titled "[Development and Production profiles]({{ site.url }}/profiles/)".

### Building an executable WAR file

To package the application as a "production" WAR, with Maven please type:

`./mvnw -Pprod package`

Or when using Gradle, please type:

`./gradlew -Pprod bootWar`

This will generate two files (if your application is called "jhipster"):

When using Maven:
*   `target/jhipster-0.0.1-SNAPSHOT.war`
*   `target/jhipster-0.0.1-SNAPSHOT.war.original`

When using Gradle:
*   `build/libs/jhipster-0.0.1-SNAPSHOT.war`
*   `build/libs/jhipster-0.0.1-SNAPSHOT.war.original`

The first one is an executable WAR file (see next section to run it). It can also be deployed on an application server, but as it includes runtime libraries, we recommend you use the second, `.original` file if you want to deploy JHipster on an application server like Tomcat, Weblogic or Websphere.

When running JHipster in an application server, some of the tuning described in this documentation (like GZipping, HTTP/2 or HTTPS support) will not work anymore, as they will need to be configured at the application server level. This is why we do not recommend using an application server with JHipster.

**Please note** that when building a WAR file with the `prod` profile, the generated archive will not include the `dev` assets.

## <a name="run"></a> Running in production

### Executing the WAR file without an application server

Instead of deploying to an application server, many people find it easier to just have an executable WAR file.

The first WAR file generated in the previous step is such a WAR, so you can run it in "production" mode by typing (on Mac OS X or Linux):

`./jhipster-0.0.1-SNAPSHOT.war`

If you are on Windows, use:

`java -jar jhipster-0.0.1-SNAPSHOT.war`

**Please note** that this WAR file uses the profile we selected when building it. As it was built using the `prod` file in the previous section, it will therefore run with the `prod` profile.

### Running the application in a Docker container

JHipster has first-class support for Docker: it is very easy to bundle your executable WAR file in a Docker image, and run it inside Docker.

To learn how to package your application with Docker, please read our [Docker Compose documentation]({{ site.url }}/docker-compose/).

## <a name="performance"></a> Performance optimizations

### Cache tuning

If you selected a cache provider when generating your application, it has been automatically configured for you by JHipster.

However, the default cache values are quite low, so the application can run on modest hardware, and as those values should be tuned depending on your application's specific business requirements.

Please read:

- [The JHipster "using cache" documentation]({{ site.url }}/using-cache/) to learn more about the caching provider you have selected, and how it can be tuned
- The [last section on monitoring](#monitoring), so you can fine-tune your cache according to your application's real-world usage

### HTTP/2 support

JHipster supports HTTP/2 using the `jhipster.http.version` property, which is configured in the `application-prod.yml` file.

To enable HTTP/2, you need to:

- Set `jhipster.http.version: V_2_0`
- Configure HTTPS (see this documentation's [security section](#security)), as browsers force to use HTTPS with HTTP/2

### GZipping

Within an executable WAR file, which uses the `prod` profile, JHipster configures GZip compression on your Web resources.

By default, compression will work on all static resources (HTML, CSS, JavaScript) and on all REST requests. You can have more information on this configuration by looking at the `server.compression.*` keys in the Spring Boot application properties, configured in the `application-prod.yml` file.

**Please note** that GZipping is done by the application server, so this section only applies if you use the "executable WAR" option described above. If you run your application in an external application server, you will need to configure it separately.

### Cache headers

With the `prod` profile, JHipster configures a Servlet filter that puts specific HTTP cache headers on your static resources (JavaScript, CSS, fonts...) so they are cached by browsers and proxies.

### Generating an optimized JavaScript application with Webpack

This step is automatically triggered when you build your project with the `prod` profile. If you want to run it without launching a Maven build, please run:

`npm run webpack:build`

This will use [Webpack](https://webpack.github.io/) to process all your static resources (CSS, TypeScript, HTML, JavaScript, images...) in order to generate an optimized client-side application.

During this process, Webpack will compile the TypeScript code into JavaScript code, and will also generate source maps, so the client-side application can still be debugged.

Those optimized assets will be generated in `target/www` for Maven or `build/www` for Gradle, and will be included in your final production WAR.

This code will be served when you run the application with the `prod` profile.

## <a name="security"></a> Security

### Securing the default user and admin accounts

JHipster comes with some default users generated for you. In production, you **should** change those default passwords!

Please follow our [security documentation]({{ site.url }}/security/) to learn how to change those passwords, and secure your application.

### HTTPS support

HTTPS can be configured directly in your JHipster application, or using a specific front-end proxy.

#### HTTPS configuration with JHipster

HTTPS is configured using Spring Security's standard `server.ssl` configuration keys in your `application-prod.yml` file.

To enable SSL, generate a certificate using:

    keytool -genkey -alias <your-application> -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 3650

You can also use Let's Encrypt using [this tutorial](https://maximilian-boehm.com/hp2121/Create-a-Java-Keystore-JKS-from-Let-s-Encrypt-Certificates.htm).

Then, modify the `server.ssl` properties so your `application-prod.yml` configuration looks like:

    server:
        port: 443
        ssl:
            key-store: keystore.p12
            key-store-password: <your-password>
            keyStoreType: PKCS12
            keyAlias: <your-application>
            ciphers: TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384, TLS_DHE_RSA_WITH_AES_128_GCM_SHA256, TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_DHE_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA, TLS_DHE_RSA_WITH_AES_128_CBC_SHA256, TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
            enabled-protocols: TLSv1.2

The ciphers suite enforce the security by deactivating some old and deprecated SSL ciphers, this list was tested against [SSL Labs](https://www.ssllabs.com/ssltest/)

Once `server.ssl.ciphers` property is enabled JHipster will force the order on Undertow with this property (true by default) : `jhipster.http.useUndertowUserCipherSuitesOrder`

The `enabled-protocols` deactivate old SSL protocols.

Then, the final touch for achieving the perfect forward secrecy. Add the following flag at the JVM startup :

    -Djdk.tls.ephemeralDHKeySize=2048

For testing your configuration you can go to [SSL Labs](https://www.ssllabs.com/ssltest/).

If everything is OK, you will get A+

#### HTTPS configuration with a front-end proxy

There are many solutions to setup a front-end HTTPS proxy in front of a JHipster application. We describe here the 2 most common ones.

With a microservice architecture, you can use JHipster's Traefik support:

- Follow our [Traefik documentation]({{ site.url }}/traefik/) to configure your architecture
- Follow the [Official Traefik website documentation](https://docs.traefik.io/user-guide/examples/) to set up HTTPS

If you'd rather use the Apache HTTP server, you can set it up with Let's Encrypt:

- Install Apache and Let's Encrypt: `apt-get install -y apache2 python-certbot-apache`
- Configure Let's Encrypt: `certbot --apache -d <your-domain.com> --agree-tos -m <your-email> --redirect`
- Configure auto-renewal of SSL certificates: add `10 3 * * * /usr/bin/certbot renew --quiet` in your crontab

## <a name="monitoring"></a> Monitoring

JHipster comes with full monitoring support from [Metrics](http://metrics.codahale.com/).

In development, Metrics data will be available through JMX: launch your JConsole and you will be able to access it

In production, your application will try to send this data to an [ELK or JHipster Console server]({{ site.url }}/monitoring/) or to a [Graphite server](http://graphite.wikidot.com/), depending on what you have configured in your `application-prod.yml` configuration file.
