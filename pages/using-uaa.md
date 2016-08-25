---
layout: default
title: Using UAA for Microservice Security
permalink: /using-uaa/
redirect_from:
  - /security.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-25T00:00:00-00:00
---
# <i class="fa fa-sitemap"></i> Using UAA for Microservice Security

This documentation leads through the new feature JHipster UAA, an user accounting
and authorizing service for securing JHipster microservices using the OAuth2
authorization protocol.

To clearly distinct JHipster UAA from other "UAA"s as cloudfoundry uaa, JHipster UAA
is an fully configured OAuth2 authorization server with the users and roles endpoints
inside, wrapped into a usual JHipster application. This allows the developer to
deeply configure every aspect of his user domain, without restricting on policies
by other ready to use UAAs.


## Summary

1. [security claims of microservice architecture](#claims)
2. [understanding OAuth2 in this context](#oauth2)
3. [using JHipster UAA](#jhipster-uaa)
4. [secure inter-service-communication using feign clients](#inter-service-communication)
5. [testing UAA applications](#testing)

## <a name="claims"></a> security claims of microservice architecture

Before digging into OAuth2 and its application on JHispter microservice, it's important
to clearify the claims to a solid security solution.

### 1. central authentication

Since microservices mean building partial independend and autonomous applications, we want
to have an consistent authentication experience, so the user won't notice his
requests are served by different applications with possibly individual security
configuration.

### 2. statelessness

The core benefit of using microservices is the scalability. So any security solution
shouldn't affect this. Holding the users session state on server becomes a tricky
task, so a stateless solution is highly prefered in this scenario.

### 3. user/machine access distinction

One thing is not quite obvious while designing a security solution, that there
is a need of having a clear distinction of different users, and also different
machines. Using microservice architecture leads to building a large multi-purpose
database of different domains and resources, so there is a need to restrict different
clients, such as native apps, multiple SPAs etc. in their access.

### 4. fine-grained access control

While maintaining a centralized roles, there is a need of configure detailes
access control policies in each microservice. Here it is the best, when a microservice
itself is unaware of the responsibility of recognizing users, but just authorizing
incoming requests.

### 5. safe from attacks

No matter how much problems a security solution should solve, it should have as
least vulnerabilities as possible.

### 6. scalability

Using stateless protocols is not a warranty of the security solution is scabable.
In the end, there should not be any single point of failure, which can be attacked
to break the system.


## <a name="oauth2"></a> understanding OAuth2 in this context

Using the OAuth2 protocol (note: it's a **protocol**, not a framework, not an app)
is satisfying all 6 claims. As mentioned, OAuth2 is a protocol, so it follows
strict standards, what makes this solution compatible to other microservices as well,
and remote systems, too. JHipster provides a couple of solution, based on the
following security design:

![JHipster UAA architecture]({{ site.url }}/images/microservice_secured_oauth.png)

***diagram created for internal presentation in a "bachelor seminar about complex distributed IT systems" in TU-Berlin***
***Note: in JHipster the gateway combines the edge server and "Webapp Service"***


* every request to any endpoint of the architecture is performed via an "client"
* a "client" is a abstract word for things like "frontend", "REST-Client", "curl", or something able to perform requests.
* a "client" may also be used in conjunction with user authentication, like the angular frontend client
* every microservice serving resources (including the UAA), are resource servers
* the UAA is a combination of authorization server and resource server
* the UAA is the owner of all the data inside the microservice application
* clients accessing resources with user authentication, are authenticated using "password grant"
* clients accessing resources without user, are authenticated using "client credentials grant"
* every client is defined inside UAA

This design may be applied to any microservice architecture independent from
language or framework.


As an addition, the following rules can be applied for access control:

* users are access controlled using "roles" and [RBAC][]
* machines are access controlled using "scopes" and [RBAC][]
* complex restriction are expressed using [ABAC][], like using boolean expressions over both "roles" and "scopes"

## <a name="jhipster-uaa"></a> using JHipster UAA

When scaffolding a JHipster microservice, you may choose the UAA options instead
of JWT authentication.

**note**: the UAA solution is also using JWT, which are addressable to custom configuration
as well as JWT, using default Spring Cloud Security.

The very basic setup consists of:

* a JHipster UAA service
* at least one other microservice
* a JHipster gateway





[RBAC]: https://de.wikipedia.org/wiki/Role_Based_Access_Control
[ABAC]: https://en.wikipedia.org/wiki/Attribute-Based_Access_Control
