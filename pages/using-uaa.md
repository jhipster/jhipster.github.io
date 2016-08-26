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
  * basic setup
  * understanding the components
  * common mistakes
4. [secure inter-service-communication using feign clients](#inter-service-communication)
  * some words on Eureka, Ribbon, Hystrix and Feign
  * using `@AuthorizedFeignClients`
5. [testing UAA applications](#testing)
  * stubbing feign clients
  * emulating OAuth2 authentication


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
and remote systems, too. JHipster provides a couple of solutions, based on the
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

### basic setup

The very basic setup consists of:

1. a JHipster UAA service
2. at least one other microservice
3. a JHipster gateway

this is also the order, in which it has to be generated. For UAA you choose UAA as
application type. For all the others UAA must be selected as type of authentication.

In addition to the authentication type, the location of the UAA must be provided.


### understanding the components

The JHipster UAA does 3 things out of the box.

* it serves the default JHipster user domain, containing user and account resource
* it implements `AuthorizationServerConfigurerAdapter` for OAuth2 and is defining basic clients
* it is holding the JWT public key, which have to be consumed by all other microservices

The choices of db adapter, cache solution, search engines, build tools and further
JHipster options are open to the developer.

When a microservice boot up, it usually expects the UAA is already up to share it's
public key. The service first calls "/oauth/token_key" of the UAA, to be able to
identify valid request.

From this point there are two use cases may happen in this basic setup: user calls
and machine calls.

For the user calls, the angular app is requesting a bearer access token (which is
a JWT) using OAuth2's password grant, and saves this token to local storage (so
  no cookies are used at any stage). This bearer token is injected as authorization
header into each request performed by angulars `$http`.

For the machine calls, the machine has to authenticate at UAA using client credentials
grant. This process has a standard solution, described in [secure inter-service-communication using feign clients](#inter-service-communication)

### common mistakes

There is a lot of things can be done or understood wrong. Here is a brief list
of the very major things a developer should be aware of.

### lack of understanding

Using OAuth2 is effectively doing less code while using powerful concepts. But it
turns into a suffer, when these concepts are not clear (authentication vs.
authorization, roles vs. scopes), while interpreting specific exceptions or other
failing situations.

### The public key resolving leads to several issues

Using the token key endpoint of UAA makes it possible to easily change the private
key as often as needed. But the fact, an UAA **must** be up in order to start a
simple service, may cause problems in several use cases as testing or CI.

One workaround is still rendering an static public key from the keytool like this:

``` sh
$ keytool -list -rfc --keystore keystore.jks | openssl x509 -inform pem -pubkey
Keystore-Kennwort eingeben:  password
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhhQiXi8xvkNnDGjOHkVv
wo5TJdW2ITlQV+6Ke5b4EA184YsDCYmRl61KpqdJAWSYM0gfj2N1mSArTLCrG951
S8LJUofr7+bqL8Dn5jBQ+wTA4RSGykRxZua0V1KeQBmSgBFI+KDWMqbfVpuje8mF
qyxF5tGutoLXCTQdr0+LC9rMbW8g3hck9VaEuIUGaPKDN+i0vp8Jy/QtXYz8Jccx
0To2BRSjs97wt/3Uhz0rzMA+l0Q0yGcmUbVH/fzOPyXRwhuoDM+qmQZQCrl38drm
5/RuoYY9zR0LEjD9BnmJTe1Py5/CInpDz4Brs87xqLHttRLqKSWai0VZjFu0bgek
KQIDAQAB
-----END PUBLIC KEY-----
-----BEGIN CERTIFICATE-----
MIIDdzCCAl+gAwIBAgIEctm4NzANBgkqhkiG9w0BAQsFADBsMQkwBwYDVQQGEwAx
CTAHBgNVBAgTADEJMAcGA1UEBxMAMRwwGgYDVQQKExNjb20ubXljb21wYW55Lm15
YXBwMRQwEgYDVQQLEwtEZXZlbG9wbWVudDEVMBMGA1UEAxMMSmF2YSBIaXBzdGVy
MB4XDTE2MDgyNDE3NDEyN1oXDTE2MTEyMjE3NDEyN1owbDEJMAcGA1UEBhMAMQkw
BwYDVQQIEwAxCTAHBgNVBAcTADEcMBoGA1UEChMTY29tLm15Y29tcGFueS5teWFw
cDEUMBIGA1UECxMLRGV2ZWxvcG1lbnQxFTATBgNVBAMTDEphdmEgSGlwc3RlcjCC
ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAIYUIl4vMb5DZwxozh5Fb8KO
UyXVtiE5UFfuinuW+BANfOGLAwmJkZetSqanSQFkmDNIH49jdZkgK0ywqxvedUvC
yVKH6+/m6i/A5+YwUPsEwOEUhspEcWbmtFdSnkAZkoARSPig1jKm31abo3vJhass
RebRrraC1wk0Ha9PiwvazG1vIN4XJPVWhLiFBmjygzfotL6fCcv0LV2M/CXHMdE6
NgUUo7Pe8Lf91Ic9K8zAPpdENMhnJlG1R/38zj8l0cIbqAzPqpkGUAq5d/Ha5uf0
bqGGPc0dCxIw/QZ5iU3tT8ufwiJ6Q8+Aa7PO8aix7bUS6iklmotFWYxbtG4HpCkC
AwEAAaMhMB8wHQYDVR0OBBYEFP/8Ff8Vm8MZI7RG+epJn7eqWIjJMA0GCSqGSIb3
DQEBCwUAA4IBAQAv8OLwsGlf1z8lqSHgPqjudU9rc6OCkcTIo4c9L2JmKd6c3AVm
4G4F0pFoXS5t2NNPzb+8TludX6y8LcFb4VaFidlpXD0E9g7p+7f64TTHFPwX8dkh
9Ylc8DkDZkXTES/s5PPixrwnlPsN2/+zsGtCzoHpqYU1NEe6ldKnWnDySvXfEiPX
18G6TchSwJZl3mwTDmC5Ys2AGVlOOteYW/giLZlpQmKdB0zbR5CzlFrViDHUSrU9
A6WCM2t6MbwdfGMBKfD/zjTLTZoFCb6nI3xT5sbpIDetqQZm1ZJyUB5kCEv9ztBB
fOheJ7Om3so/wKygSrYgmmhEvdNcccPlTbPa
-----END CERTIFICATE-----
```

and copying public key (including dashed lines) as "public.cert" into resource
folder of the microservice. Then, instead of configuring the `JwtAccessTokenConverter`
with load balanced request to uaa, the beans in `MicroserviceSecurityConfiguration`
have to be setted up the following way:

``` java src/main/package/config/MicroserviceSecurityConfiguration.java
    //...

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(jwtAccessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        Resource resource = new ClassPathResource("public.cert");
        String publicKey;
        try {
            publicKey = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        converter.setVerifierKey(publicKey);
        return converter;

    }
```

The benefits of this approach is, that the microservices now have no need of ever
interacting with uaa, to be sure that client requests are valid authorized requests.
Since there is no initial communication between these applications, it's also a bit
more secure.

The disadvantage of course is, that key changes now have to be handled manually,
what makes things like different keys for production/staging harder then the default
solution.

### not using TLS

If an attacker manages to intercept an access token, he will gain all the rights
authorized to this token, until the token expires. There are a lot of ways to achieve
that, in particular when there is no TLS encryption. This was not a problem in the
days of version 1 of OAuth, because protocol level encryption was forced.

### using access tokens in URL

As of standard, access tokens can be either passed by URL or in headers. From the
TLS point of view, both ways are secure. In practice passing tokens via URL is less
secure, since there several ways of getting the URL from records and so on.

### switching to symmetric signing keys

RSA is not required for JWT signing, and spring does provide symmetric token
signing as well. This also solves some problems, which make development harder.
But this is insecure, since an attacker just need to get into one single microservice
to be able to declare own JWTs.


## <a name="inter-service-communication"></a> 4. secure inter-service-communication using feign clients

One interesting part is, how OAuth secured service exchange date with each other.
Currently only JHipster UAA is providing an scalable approach of secure inter-service-communication.

This chapter covers, how to easily get started with that.

### some words on eureka, ribbon, hystrix and feign

When one service wants to request data from another, finally all these four players
come into play. So it is important, to briefly know what each of them is responsible
for:

* Eureka: this is where services (un)register, so you can ask "foo" and get a set of IPs of services of foo
* Ribbon: when someone asked for "foo" and already retrieved a set of IPs, Ribbon does the load balancing over these IPs.

So to sum up, when we got a URL like "http://uaa/oauth/token/" with 2 instances of uaa
running on 10.10.10.1:9999 and 10.10.10.2:9999, way may use Eureka and Ribbon to
quickly transform that URL either to "http://10.10.10.1:9999/oauth/token" or
"http://10.10.10.2:9999/oauth/token" using Round Robin.

* Hystrix: a circuit breaker system solving fall back scenarios on service fails
* Feign: using all that in a declarative style

In real world, there is no warranty of all instaces of all services to be up. So
hystrix works as a circuit breaker, to handle fail scenarios in a well defined way,
using fallbacks.

But wiring and coding all this things manual, is a lot of work. Since the processes
happen are clear, Feign provides the option of writing Ribbon load balanced REST
clients for endpoints registered in Eureka, with fallback implementations controlled
using Hystrix, using nothing more then an java interface with a bunch of annotations.

So for inter-service-communication, feign clients are helpful to use.
When one service needs a rest client to access an "other-service", having some
"other-resource", it's possible to declare an interface like

``` java
@FeingClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

And then accessing it via dependency injection, like:

``` java
@Service
class SomeService {
  private OtherServiceClient otherServiceClient;

  @Inject
  public SomeService(OtherServiceClient otherServiceClient) {
    this.otherServiceClient = otherServiceClient;
  }
}
```

Similar to spring-data-jpa, there is no need to implement that interface. But you
may do so, if using Hystrix. Implemented classes of feign client interfaces act
as fallback implementations.

One open issue is, to make this communication secure, using UAA. To accomplish these,
there should be some request interceptor for feign, which implements the client
credentials flow from OAuth, to authorize the current service for requesting the
other service. In JHipster, you just use `@AuthorizedFeignClients` instead.


### using `@AuthorizedFeignClients`

Considering the above feign client should be used to an "other-service", which
serves protected resources, the interface must be annotated like this:

``` java
@AuthorizedFeingClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

**note**: due to a bug in spring cloud, it's currently not possible to use a different
notation for the service name, as
``` java
@AuthorizedFeingClient("other-service")
```
or
``` java
@AuthorizedFeingClient(value = "other-service")
```

The REST client automatically gets authorized with your UAA, when there is no valid
access token in memory.

Note, that this approach addresses a scenario, where machine request run over a
separate oauth client, not referring to an user session. This is important, in
particular when entity auditing is used on a request, issued by another request in
another service. As an alternative, the access token of the inital request may be
forwared to further calls. Currently, there is no "default solution" provided by
JHipster.

## <a name="testing"></a> testing UAA applications


### stubbing feign clients

TODO

### emulating OAuth2 authentication

TODO



[RBAC]: https://de.wikipedia.org/wiki/Role_Based_Access_Control
[ABAC]: https://en.wikipedia.org/wiki/Attribute-Based_Access_Control
