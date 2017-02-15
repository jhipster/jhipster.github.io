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
# <i class="fa fa-lock"></i> [BETA] Using UAA for Microservice Security

__WARNING!__ This is a new feature, of <b>BETA</b> quality. Use it at your own risk! Feedback is highly welcome!

JHipster UAA is a user accounting and authorizing service for securing JHipster microservices using the OAuth2 authorization protocol.

To clearly distinct JHipster UAA from other "UAA"s as cloudfoundrys UAA, JHipster UAA is an fully configured OAuth2 authorization server with the users and roles endpoints inside, wrapped into a usual JHipster application. This allows the developer to deeply configure every aspect of his user domain, without restricting on policies by other ready-to-use UAAs.

## Summary

1. [Security claims of microservice architecture](#claims)
2. [Understanding OAuth2 in this context](#oauth2)
3. [Using JHipster UAA](#jhipster-uaa)
  * Basic setup
  * Understanding the components
  * Common mistakes
4. [Securing inter-service-communication using Feign clients](#inter-service-communication)
  * Using Eureka, Ribbon, Hystrix and Feign
  * Using `@AuthorizedFeignClients`
5. [Testing UAA applications](#testing)
  * Stubbing feign clients
  * Emulating OAuth2 authentication


## <a name="claims"></a> 1. Security claims of microservice architecture

Before digging into OAuth2 and its application on JHipster microservices, it's important to clearify the claims to a solid security solution.

### 1. Central authentication

Since microservices is about building mostly independent and autonomous applications, we want to have an consistent authentication experience, so the user won't notice his requests are served by different applications with possibly individual security configuration.

### 2. Statelessness

The core benefit of building microservices is scalability. So the chosen security solution shouldn't affect this. Holding the users session state on server becomes a tricky task, so a stateless solution is highly preferred in this scenario.

### 3. User/machine access distinction

There is a need of having a clear distinction of different users, and also different machines. Using microservice architecture leads to building a large multi-purpose data-center of different domains and resources, so there is a need to restrict different clients, such as native apps, multiple SPAs etc. in their access.

### 4. Fine-grained access control

While maintaining a centralized roles, there is a need of configuring detailed access control policies in each microservice. A microservice should be unaware of the responsibility of recognizing users, and must just authorize incoming requests.

### 5. Safe from attacks

No matter how much problems a security solution may solve, it should be strong against vulnerabilities as best as possible.

### 6. Scalability

Using stateless protocols is not a warranty of the security solution is scalable. In the end, there should not be any single point of failure. An counter-example is a shared auth database or single auth-server-instance, which is hit once per request.


## <a name="oauth2"></a> 2. Understanding OAuth2 in this context

Using the OAuth2 protocol (note: it's a **protocol**, not a framework, not an application) is satisfying all 6 claims. It follows strict standards, what makes this solution compatible to other microservices as well, and remote systems, too. JHipster provides a couple of solutions, based on the following security design:

![JHipster UAA architecture]({{ site.url }}/images/jhipster_uaa.png)

* Every request to any endpoint of the architecture is performed via an "client"
* A "client" is a abstract word for things like "AngularJS $http client", some "REST-Client", "curl", or anything able to perform requests.
* A "client" may also be used in conjunction with user authentication, like the AngularJS $http in the frontend client application
* Every microservice serving resources on endpoints (including the UAA), are resource servers
* Blue arrows show clients authenticate on an oauth authorization server
* Green arrows show requests on resource servers performed by the client
* The UAA server is a combination of authorization server and resource server
* The UAA server is the owner of all the data inside the microservice applications (it approves automatically access to resource servers)
* Clients accessing resources with user authentication, are authenticated using "password grant"
* Clients accessing resources without user, are authenticated using "client credentials grant"
* Every client is defined inside UAA (web-app, internal, ...)

This design may be applied to any microservice architecture independent from language or framework.

As an addition, the following rules can be applied for access control:

* User access is configured using "roles" and [RBAC][]
* Machines access is configured using "scopes" and [RBAC][]
* Complex access configuration is expressed using [ABAC][], using boolean expressions over both "roles" and "scopes"
  * example: hasRole("ADMIN") and hasScope("shop-manager.read", "shop-manager.write")

## <a name="jhipster-uaa"></a> 3. Using JHipster UAA

When scaffolding a JHipster microservice, you may choose the UAA options instead of JWT authentication.

**note**: the UAA solution is also using JWT, which are addressable to custom configuration as well as JWT, using default Spring Cloud Security.

### Basic setup

The very basic setup consists of:

1. A JHipster UAA server (as type of application)
2. At least one other microservice (using UAA authentication)
3. A JHipster gateway (using UAA authentication)

This is the order in which it should be generated.

In addition to the authentication type, the location of the UAA must be provided.

For very basic usage, this setup is working the same way as it does for JWT authentication type, but with one more service.

### Understanding the components

The JHipster UAA server does three things out of the box:

* It serves the default JHipster user domain, containing user and account resource (this is done by gateway in JWT authentication)
* It implements `AuthorizationServerConfigurerAdapter` for OAuth2 and is defining basic clients ("web_app" and "internal")
* It serves the JWT public key on "/oauth/token_key", which has to be consumed by all other microservices

The choices of a database, cache solution, search engine, build tools and further JHipster options are open to the developer.

When a microservice boots up, it usually expects the UAA server is already up to share its public key. The service first calls "/oauth/token_key" to fetch the public key and configure it for key signing (`JwtAccessTokenConverter`)

From this point there are two use cases that may happen in this basic setup: user calls and machine calls.

For the user calls, the Angular application is requesting a bearer access token (which is a JWT token) using OAuth2's password grant, and saves this token to local storage (so no cookies are used at any stage). This bearer token is injected as authorization header into each request performed by the AngularJS `$http` object.

For the machine calls, the machine has to authenticate as a UAA using client credentials grant. JHipster provides a standard solution, described in [secure inter-service-communication using feign clients](#inter-service-communication)

### Common mistakes

Here is a brief list of the very major things a developer should be aware of.

#### ***The public key resolving leads to several issues***

Using the token key endpoint of UAA makes it possible to easily change the signing key as often as needed. The need that a UAA server **must** be up in order to start a simple service, may cause problems in several use cases as testing or CI.

One workaround is rendering a static public key from the keytool like this:

``` sh
$ keytool -list -rfc --keystore keystore.jks | openssl x509 -inform pem -pubkey
Keystore-Password:  password
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

This public key (including dashed lines) must be copied as "public.cert" into the resource folder of the microservice. Then, instead of configuring the `JwtAccessTokenConverter` with load balanced requests to the UAA server, the Beans in `MicroserviceSecurityConfiguration` have to be configured the following way:

``` java


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

The benefit of this approach is that the microservices now have no need of ever interacting with the UAA server, to be sure that client requests are valid authorized requests. Since there is no initial communication between these applications, it's also a bit more secure.

The disadvantage is that signing key changes now have to be handled manually, which makes things like different keys for production/staging harder than with the default solution.

#### ***Using the same signing key for production and staging***

It is strictly recommended to use different signing keys as much as possible. Once a signing key gets into wrong hands, it is possible to generate full access granting key without knowing login credentials of any user.

#### ***Not using TLS***

If an attacker manages to intercept an access token, he will gain all the rights authorized to this token, until the token expires. There are a lot of ways to achieve that, in particular when there is no TLS encryption. This was not a problem in the days of version 1 of OAuth, because protocol level encryption was forced.

#### ***Using access tokens in URL***

As of standard, access tokens can be either passed by URL or in headers. From the TLS point of view, both ways are secure. In practice passing tokens via URL is less secure, since there several ways of getting the URL from records.

#### ***Switching to symmetric signing keys***

RSA is not required for JWT signing, and Spring Security does provide symmetric token signing as well. This also solves some problems, which make development harder. But this is insecure, since an attacker just need to get into one single microservice to be able to generate its own JWT tokens.

## <a name="inter-service-communication"></a> 4. Secure inter-service-communication using Feign clients

Currently only JHipster UAA is providing an scalable approach of secure inter-service-communication.

Using JWT authentication without manually forwarding JWTs from request to internal request forces microservices to call other microservices over the gateway, which involves additional internal requests per one master requests. But even with forwarding, it's not possible to cleanly separate user and machine authentication.

Since JHipster UAA is based on OAuth2, all these problems are solved on protocol definition.

This chapter covers how to easily get started with this.

### Using Eureka, Ribbon, Hystrix and Feign

When one service wants to request data from another, finally all these four players come into play. So it is important, to briefly know what each of them is responsible for:

* Eureka: this is where services (un-)register, so you can ask "foo-service" and get a set of IPs of instances of the foo-service, registered in Eureka
* Ribbon: when someone asked for "foo-service" and already retrieved a set of IPs, Ribbon does the load balancing over these IPs.

So to sum up, when we got a URL like "http://uaa/oauth/token/" with 2 instances of JHipster UAA server running on 10.10.10.1:9999 and 10.10.10.2:9999, we may use Eureka and Ribbon to quickly transform that URL either to "http://10.10.10.1:9999/oauth/token" or "http://10.10.10.2:9999/oauth/token" using a Round Robin algorithm.

* Hystrix: a circuit breaker system solving fall-back scenarios on service fails
* Feign: using all that in a declarative style

In real world, there is no warranty of all instances of all services to be up. So Hystrix works as a circuit breaker, to handle failure scenarios in a well defined way, using fallbacks.

But wiring and coding all these things manually is a lot of work: Feign provides the option of writing ***Ribbon*** load balanced REST clients for endpoints registered in ***Eureka***, with fallback implementations controlled using ***Hystrix***, using nothing more then an Java interfaces with some annotations.

So for inter-service-communication, Feign clients are very helpful. When one service needs a REST client to access an "other-service", serving some "other-resource", it's possible to declare an interface like:

``` java
@FeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

And then, using it via dependency injection, like:

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

Similar to Spring Data JPA, there is no need to implement that interface. But you may do so, if using Hystrix. Implemented classes of Feign client interfaces act as fallback implementations.

One open issue is, to make this communication secure using UAA. To accomplish this, there should be some request interceptor for Feign, which implements the client credentials flow from OAuth, to authorize the current service for requesting the other service. In JHipster, you just use `@AuthorizedFeignClients` instead. This is a special annotation provided by JHipster, which does exactly that.

### Using `@AuthorizedFeignClients`

Considering the above Feign client should be used to an "other-service", which
serves protected resources, the interface must be annotated like this:

``` java
@AuthorizedFeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

**note**: Due to a bug in Spring Cloud, it's currently not possible to use a different
notation for the service name, as

``` java

@AuthorizedFeignClient("other-service")
```

or

``` java

@AuthorizedFeignClient(value = "other-service")
```

The REST client automatically gets authorized with your UAA server, when there is no valid access token stored in memory.

This approach addresses a scenario when machine request run over a separate OAuth client not referring to an user session. This is important, in particular when entity auditing is used on a request, issued by another request in another service. As an alternative, the access token of the initial request may be forwarded to further calls. Currently, there is no "default solution" provided by JHipster.

## <a name="testing"></a> 5. Testing UAA applications

### Mocking Feign clients

Components working with Feign clients should be testable. Using Feign in tests the same way it is used in production would force the JHipster Registry and the UAA server to be up and reachable to the same machine where the tests are run. But in most cases, you don't want to test that Feign itself works (it usually does), but your components using Feign clients.

To test components, which are using feign clients inside is possible using `@MockBean`, which is part of spring boot since 1.4.0.

Here is an example, testing `SomeService` works as expected, with mocked values for the client:

``` java

@RunWith(SpringRunner.class)
@SpringBootTest(App.class)
public class SomeServiceTest {

    @MockBean
    private OtherServiceClient otherServiceClient;

    @Inject
    private SomeService someService;

    @Test
    public void testSomeService() {
        given(otherServiceClient.getResourcesFromOtherService())
        .willReturn(Arrays.asList(new OtherResource(...));

        someService.performActionWhichInkvokesTheAboveMentionedMethod();

        //assert that your application is in the desired state
    }
}
```

So with this technology you are simulating the behavior of the other service, and provide expected resource entity which would come from the origin.
All Beans injecting a client will behave as mocked, so you can focus on the logic of these Beans.

### Emulating OAuth2 authentication

Using Springs integration tests against the REST controllers is usually bypassing the security configuration, since it would make testing hard, when the only intention is to prove the controller is functional doing what it should do. But sometimes, testing a controllers security behavior is part of testing, too.

For this use-case, JHipster is providing an component called `OAuth2TokenMockUtil`, which can emulate a valid authentication without forcing the user or client to exist.

To use this feature, two things have to be done:

#### 1. Enabling security in the mock Spring MVC context and inject the mock util

``` java

    @Inject
    private OAuth2TokenMockUtil tokenUtil;

    @PostConstruct
    public void setup() {
        this.restMockMvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply(springSecurity())
            .build();

    }
```

***In this test no single instance of the controller has to be mocked, but the
application's `WebApplicationContext`***

#### 2. Using the `OAuth2TokenMockUtil`

The util offers a method "oaut2authentication", which is usable to MockMvc "with" notation. Currently it can be configured to mock a authentication with the following fields:

* username
* roles (Set<String>)
* scope (Set<String>)

Here is an example:

``` java

@Test
public void testInsufficientRoles() {
    restMockMvc.peform(
        get("url/requiring/ADMIN/role")
        .with(tokenUtil.oauth2authentication("unpriveleged.user@example.com", Sets.newSet("some-scope"), Sets.newSet("ROLE_USER")))
    ).andExpect(status().isForbidden());
}
```

[RBAC]: https://de.wikipedia.org/wiki/Role_Based_Access_Control
[ABAC]: https://en.wikipedia.org/wiki/Attribute-Based_Access_Control
