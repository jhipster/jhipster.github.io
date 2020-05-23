---
layout: default
title: JHipster Domain Language - Applications
permalink: /jdl/applications
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Applications

1. [Syntax](#syntax)
1. [Examples](#examples)
   1. [Basic Example](#basic-example)
   1. [More than one application](#more-than-one-application)
   1. [With entities](#with-entities)
1. [Microservice workflow](#microservice-workflow)
1. [Available application options](#available-application-options)

***

### Syntax

The application declaration is done as follows:

```
application {
  config {
    <application option name> <application option value>
  }
  [entities <application entity list>]
}
```

  - Application configuration keys/values are specified under `config` (which must be inside `application`)
  - There can be 0, 1 or any application option as you want (provided they are valid)
  - Entities that will be generated inside the application are listed via `entities`, this is the recommended way to
    generate entities in applications.
    - This can be omitted but generating entities inside the app would require doing it:
      - from another JDL file inside the app
      - or with the CLI
  - The `entities` keyword is optional: you can omit it, but every entity in the JDL file will be generated inside the
    application

---

### Examples

#### Basic example

```jdl
application {
  config {
    baseName exampleApp
    applicationType gateway
  }
}
```

---

#### More than one application

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
}

application {
  config {
    baseName exampleApp3
    applicationType gateway
    serverPort 9000
  }
}
```

---

#### With entities

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
  entities A
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
  entities * except A
}

entity A
entity B
entity C
```

---

### Complete example breakdown

```jdl
application {
  config {
    baseName myMonolith
    applicationType monolith
  }
  entities * except C, D
}
application {
  config {
    baseName myGateway
    applicationType gateway
    serverPort 9042
  }
  entities * except A, B
}
application {
  config {
    baseName microserviceA
    applicationType microservice
  }
  entities C
}
application {
  config {
    baseName microserviceB
    applicationType microservice
    serverPort 8082
  }
  entities D
}
entity A
entity B
entity C
entity D
dto * with mapstruct
service * with serviceClass
paginate D with pager
```

Now, several things will happen when generating these applications and folders:
  - Four applications will be created:
    - myMonolith in `./myMonolith`, with the server port `8080`
    - myGateway in `./myGateway`, with the server port `9042`
    - microserviceA in `./microserviceA`, with the server port `8081`
      - Even though we didn't specify a server port, JHipster sets one by default.
      - For microservices, the default one is `8081`
      - For gateways and monoliths, it's `8080`
      - For UAA apps, it's `9999`
    - microserviceB in `./microserviceB` with the server port `8082`
  - Four entities will be generated
    - `A` and `B` in the monolith
    - `C` and `D` both in the gateway
      - `C` in the first microservice
      - `D` in the second microservice
  - The `microservice` option is implicit for `C` and `D`
    - Because they get generated on the two microservices, this option will be set by default.
  - Options work the same way as before

Note that the generator sets default values if they aren't present (like the `databaseType`).
JHipster Core does the exact same things for you.

---

### Microservice workflow

Dealing with microservices is a almost tricky, but the JDL gives you some options to handle your entities as you see fit.
With the `microservice <ENTITIES> with <MICROSERVICE_APP_NAME>` you can specify which entity gets generated in which microservice.

Take this setup for instance:
```
entity A
entity B
entity C
microservice A with firstMS
microservice B with secondMS
```

Given two JHipster applications ('firstMS' and 'secondMS'), here's what you're going to get if you import the JDL file
in the two applications:
  - In 'firstMS', entities `A` and `C` will be generated.
  - In 'secondMS', entities `B` and `C` will be generated.

`C` gets generated in both because if there's no microservice option specifying where this entity gets generated, it
will be generated everywhere.

If you decide to import this JDL in a monolith app, every entity will be generated (monoliths don't have restriction
options in the JDL).

_Note: if you want to make the same entity be generated in two different microservices, you can write two JDL files
instead of updating the JDL file. Everytime._

The previous example couldn't have been written like this:
```
entity A
entity B
entity C
microservice * except B with firstMS
microservice * except A with secondMS
```

Here's the result:
  - In 'firstMS', only the entity `C` will be generated
  - In 'secondMS', entities `B` and `C` will be generated.

It's because, at parsing-time, if an option overlaps with another, the latter takes precedence.
You can also create an entire microservice stack using JDL, [see this blog post](https://medium.com/@deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-ecc6e7fc3f77) for example

---

### Available application options

Here are the application options supported in the JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL option name</th>
    <th>Default value</th>
    <th>Possible values</th>
    <th>Comment</th>
  </tr>
  <tr>
    <td>applicationType</td>
    <td>monolith</td>
    <td>monolith, microservice, gateway, uaa</td>
    <td></td>
  </tr>
  <tr>
    <td>authenticationType</td>
    <td>jwt or uaa</td>
    <td>jwt, session, uaa, oauth2</td>
    <td>uaa for UAA apps, jwt otherwise</td>
  </tr>
  <tr>
    <td>baseName</td>
    <td>jhipster</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>blueprint</td>
    <td></td>
    <td>Name of an additional blueprint (see <a href="https://www.jhipster.tech/modules/marketplace/#/list">Marketplace</a>)</td>
    <td>DEPRECATED. String</td>
  </tr>
  <tr>
    <td>blueprints</td>
    <td></td>
    <td>Names of additional blueprints (see <a href="https://www.jhipster.tech/modules/marketplace/#/list">Marketplace</a>)</td>
    <td></td>
  </tr>
  <tr>
    <td>buildTool</td>
    <td>maven</td>
    <td>maven, gradle</td>
    <td></td>
  </tr>
  <tr>
    <td>cacheProvider</td>
    <td>ehcache or hazelcast</td>
    <td>caffeine, ehcache, hazelcast, infinispan, memcached, redis, no</td>
    <td>ehcache for monoliths and gateways, hazelcast otherwise</td>
  </tr>
  <tr>
    <td>clientFramework</td>
    <td>angularX</td>
    <td>angularX, react</td>
    <td></td>
  </tr>
  <tr>
    <td>clientPackageManager</td>
    <td>npm</td>
    <td>npm, yarn</td>
    <td></td>
  </tr>
  <tr>
    <td>clientTheme</td>
    <td>none</td>
    <td>Something or none</td>
    <td>You can put whatever value you want, provided you know it will work (like yeti).</td>
  </tr>
  <tr>
    <td>clientThemeVariant</td>
    <td></td>
    <td>Something or primary</td>
    <td>You can put whatever value you want, provided you know it will work (like dark, or light), can also be empty</td>
  </tr>
  <tr>
    <td>databaseType</td>
    <td>sql</td>
    <td>sql, mongodb, cassandra, couchbase, no</td>
    <td></td>
  </tr>
  <tr>
    <td>devDatabaseType</td>
    <td>h2Disk</td>
    <td>h2Disk, h2Memory, *</td>
    <td>* + the prod database type</td>
  </tr>
  <tr>
    <td>dtoSuffix</td>
    <td>DTO</td>
    <td></td>
    <td>Suffix for DTOs. false for empty string.</td>
  </tr>
  <tr>
    <td>enableHibernateCache</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableSwaggerCodegen</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableTranslation</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>entitySuffix</td>
    <td></td>
    <td></td>
    <td>Suffix for entities. false for empty string.</td>
  </tr>
  <tr>
    <td>jhiPrefix</td>
    <td>jhi</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>languages</td>
    <td>[en, fr]</td>
    <td>Languages available in JHipster</td>
    <td>Braces are mandatory</td>
  </tr>
  <tr>
    <td>messageBroker</td>
    <td>false</td>
    <td>kafka, false</td>
    <td></td>
  </tr>
  <tr>
    <td>nativeLanguage</td>
    <td>en</td>
    <td>Any language supported by JHipster</td>
    <td></td>
  </tr>
  <tr>
    <td>packageName</td>
    <td>com.mycompany.myapp</td>
    <td></td>
    <td>Sets the packageFolder option</td>
  </tr>
  <tr>
    <td>prodDatabaseType</td>
    <td>mysql</td>
    <td>mysql, mariadb, mssql, postgresql, oracle, no</td>
    <td></td>
  </tr>
  <tr>
    <td>reactive</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>searchEngine</td>
    <td>false</td>
    <td>elasticsearch, false</td>
    <td></td>
  </tr>
  <tr>
    <td>serverPort</td>
    <td>8080, 8081 or 9999</td>
    <td></td>
    <td>Depends on the app type</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>false</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipUserManagement</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>testFrameworks</td>
    <td>[]</td>
    <td>protractor, cucumber, gatling</td>
    <td>Braces mandatory</td>
  </tr>
  <tr>
    <td>uaaBaseName</td>
    <td></td>
    <td></td>
    <td>Mandatory for gateway and microservices if auth type is uaa, must be between double-quotes</td>
  </tr>
  <tr>
    <td>useSass</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>websocket</td>
    <td>false</td>
    <td>spring-websocket, false</td>
    <td></td>
  </tr>
</table>
