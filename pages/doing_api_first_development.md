---
layout: default
title: Doing API-First development
permalink: /doing-api-first-development/
redirect_from:
  - /doing-api-first-development.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-11T00:00:00-00:00
---

# <i class="fa fa-search"></i> Doing API-First development

When generating a JHipster application, you can choose the `API first development using OpenAPI-generator` option when prompted for additional technologies.
This option will configure your build tool to use [OpenAPI-generator](https://github.com/OpenAPITools/openapi-generator) to generate API code from an OpenAPI (Swagger) definition file.
Both Swagger v2 and OpenAPI v3 formats are supported.

### Rationale for API-First development

In API first development, instead of generating the documentation from the code, you need to write the specification first and then generate code from it.
This has the following advantages:

- You can design your API for the consumers and not as a consequence of your implementation.
- You can use the specification file to mock your new server endpoints before they are released so you can more easily decouple frontend and backend development.
- You don't need a live server to use your OpenAPI documentation.

### Using the OpenAPI-generator plugins

The OpenAPI specification file will be located at src/main/resources/swagger/api.yml and is used to generate endpoint interfaces that you can implement. 
Those interfaces have default methods which answer with a `501 Not implemented` HTTP status and an empty body.
Write your specification using a tool such as [swagger-editor](http://editor.swagger.io), put it in `src/main/resources/swagger/api.yml`, then run:
```bash
./mvnw generate-sources
```
Or for gradle:
```bash
./gradlew openApiGenerate
```
Then implement the "Delegate" interfaces generated in `${buildDirectory}/generated-sources/openapi/src/main/java/${package}/web/api/` with `@Service` classes.

Example of code to write yourself for the famous [petstore](http://petstore.swagger.io):
```java
@Service
public class PetApiDelegateImpl implements PetApiDelegate {

    @Override
    public ResponseEntity<List<Pet>> findPetsByStatus(List<String> status) {
        return ResponseEntity.ok(
            status.stream()
                .distinct()
                .map(Pet.StatusEnum::fromValue)
                .map(statusEnum -> new Pet().id(RandomUtils.nextLong()).status(statusEnum))
                .collect(Collectors.toList())
        );
    }
}
```
If you provide the `NativeWebRequest` bean to the delegate interface, then basic example bodies will be returned for the methods that have not been overridden (still with a 501 HTTP status code).
This is useful to mock your endpoints before providing the actual implementation.
```java
@Service
public class PetApiDelegateImpl implements PetApiDelegate {

    private final NativeWebRequest request;

    public PetApiDelegateImpl(NativeWebRequest request) {
        this.request = request;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }
}
```
Then you can get the examples
```sh
$ curl -X GET --header 'Accept: application/json' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
{  "photoUrls" : [ "photoUrls", "photoUrls" ],  "name" : "doggie",  "id" : 0,  "category" : {    "name" : "name",    "id" : 6  },  "tags" : [ {    "name" : "name",    "id" : 1  }, {    "name" : "name",    "id" : 1  } ],  "status" : "available"}%
$ curl -X GET --header 'Accept: application/xml' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
<Pet>  <id>123456789</id>  <name>doggie</name>  <photoUrls>    <photoUrls>aeiou</photoUrls>  </photoUrls>  <tags>  </tags>  <status>aeiou</status></Pet>%
```
### Using the `openapi-client` Sub-Generator

JHipster also provides support for generation of client code using [Spring-Cloud FeignClients](https://projects.spring.io/spring-cloud/spring-cloud.html#spring-cloud-feign) using an OpenAPI/Swagger specification.
The generated FeignClient can be used in both Monolithic and Micro-service applications and supports Swagger v2 and OpenAPI v3 definitions. To invoke this sub-generator run `jhipster openapi-client`.




