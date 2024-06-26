---
layout: default
title: Doing API-First development
permalink: /doing-api-first-development
redirect_from:
  - /doing-api-first-development.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-11T00:00:00-00:00
---

# <i class="fa fa-search"></i> Doing API-First development

When generating a JHipster application and prompted "Which other technologies would you like to use?" choose the `API first development using OpenAPI-generator` option to leverage the [OpenAPI-generator](https://github.com/OpenAPITools/openapi-generator), as shown below:

```shell
# ... other prompts answered ...
? Which other technologies would you like to use? (Press <space> to select, <a> to toggle all, <i> to invert selection, 
and <enter> to proceed)
 ◯ Apache Kafka as asynchronous messages broker
 ◯ Apache Pulsar as asynchronous messages broker
❯◉ API first development using OpenAPI-generator
```

This option will configure the build tool, [Maven or Gradle](https://openapi-generator.tech/docs/plugins), to generate API code from an OpenAPI (Swagger) Specification (OAS) file. Both Swagger v2 and OpenAPI v3 formats are supported.

## Rationale for API-First development

In API first development, also called "Contract First Development," the API specification is written first and then code is generated from the API specification. Contrast this with generating the documentation from the code.

API first development provides the following advantages:

- The API is designed for the consumers and not as a consequence of the implementation.
- The specification file can be used to mock new server endpoints in development further decoupling the frontend and backend.
- Use of the specification file does not require a live server.

## Default Configuration

This HOWTO will use JHipster's default configuration that leverages Spring's Delegate Pattern. The generated code by the [OpenAPI Generator for Spring](https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/spring.md) will produce the models and delegates for implementation.

The plugin's default configuration is shown below (Maven) and defined in the project level `build` profile of the `pom.xml`. The configuration is adapted for Gradle projects by JHipster.

```xml
<plugin>
    <!--
        Plugin that provides API-first development using openapi-generator-cli to
        generate Spring-MVC endpoint stubs at compile time from an OpenAPI definition file
    -->
    <groupId>org.openapitools</groupId>
    <artifactId>openapi-generator-maven-plugin</artifactId>
    <version>${openapi-generator-maven-plugin.version}</version>
    <executions>
        <execution>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <inputSpec>${project.basedir}/src/main/resources/swagger/api.yml</inputSpec>
                <generatorName>spring</generatorName>
                <apiPackage>demo.jhipster.myapp.web.api</apiPackage>
                <modelPackage>demo.jhipster.myapp.service.api.dto</modelPackage>
                <supportingFilesToGenerate>ApiUtil.java</supportingFilesToGenerate>
                <skipValidateSpec>false</skipValidateSpec>
                <configOptions>
                    <!-- the delegatePattern is only available to the spring generator -->
                    <delegatePattern>true</delegatePattern>
                    <title>jhipster</title>
                    <useSpringBoot3>true</useSpringBoot3>
                </configOptions>
            </configuration>
        </execution>
    </executions>
</plugin>
```

> ℹ️ JHipster users are always encouraged to adapt the build tooling to the specifics of the environment or the standards adopted within an organization. JHipster puts a project on the right foundation with tools and practices that have been tested at scale. If the JHipster's use of the Spring Delegate pattern is not the standard for an organization the `configOption:delegatePattern` can be removed (the default is `false`).
>
> As always, users are expected to understand the implications of changes to JHipster's default behavior. Just as JHipster cannot teach users how to use Spring, changes to Spring may result in behavior that cannot not be documented by JHipster.

## Using the openapi-generator-maven-plugin

The OpenAPI Specification (OAS) file is read by the generator from the defined file in the plugin's `inputSpec` element. JHipster's default location for the OAS is `src/main/resources/swagger/api.yml`. The plugin generates interfaces and Data Transfer Objects (DTOs) from the OAS for implementation. The interfaces have default methods which respond with a `501 Not implemented` HTTP status and an empty body.

### Developing an API with the OpenAPI Specification 

This guide will use the classic Pet Store specification from OpenAPI for simplicity as writing an OAS is beyond the scope of this guide. API developers can write an OAS and place it in `src/main/resources/swagger/api.yml` using a tool such as [swagger-editor](http://editor.swagger.io). Many IDEs provide OAS tools for editing as well.

#### Pro Tip

JHipster, when choosing `API first development using OpenAPI-generator`, provides a Docker Compose descriptor for the Swagger Editor at `src/main/docker/swagger-editor.yml`. To use this editor locally, run `docker compose -f src/main/docker/swagger-editor.yml up -d`.

### JHipster's Layered Architecture and Technical Structure Tests by ArchUnit

Prior to implementing the delegates generated by the OpenAPI Generator plugin, take a moment to review and understand JHipster's layered architecture design. This architecture is tested by [TNG Tech's ArchUnit](https://www.archunit.org/motivation) and defined in `src/test/java/com/mycompany/myapp/TechnicalStructureTest.java`. Proper implementation of the delegate classes must be followed so as not to violate this layered architecture.

## Implementation Guide

### The Pet Store v3

Hereafter, this guide will be based on a [JHipster-ready version of Expanded Pet Store v3](api/api.yml) from the OpenAPI Initiative ([found here](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore-expanded.yaml)). This JHipster-version sets the `server:url` to the JHipster defaults of `http://localhost:8081/api` (where the port defaults to `8081` and the generated controller has a base path of `/api`, matching the default `SecurityConfiguration#filterChain(HttpSecurity,  MvcRequestMatcher.Builder)` implementation).

### Generating the Server Sources

```bash
./mvnw generate-sources
```
Or for gradle:
```bash
./gradlew openApiGenerate
```

### Validate tooling

Validate that the generated classes in `target/generated-sources` are on the classpath for implementation. Most IDEs look for and, automatically, configure these directories. Refer to the IDE's documentation to resolve any issues.

### Review the Generated Classes

Take a moment to review the `generated-sources`.

```text
target/generated-sources
└── openapi
    └── src
        └── main
            └── java
                └── demo
                    └── jhipster
                        ├── service
                        │   └── api
                        │       └── dto
                        │           ├── Error.java
                        │           ├── NewPet.java
                        │           └── Pet.java
                        └── web
                            └── api
                                ├── ApiUtil.java
                                ├── PetsApi.java
                                ├── PetsApiController.java
                                └── PetsApiDelegate.java
```

> ⚠️The OpenAPI Generator is responsible for the creation of DTOs ("models") and delegates. Implementations MUST not be placed in the `target/generated-sources`. These classes are subject to generation at anytime and SHOULD NOT be committed to source control.
 
### Implementation

The following steps will be repeated as needed for each delegate implementation:

1. [Implement the Delegate](#implement-the-delegate)
2. [Test Drive the Implementation](#test-drive-the-implementation)
3. [Mocking Endpoints in Development](#mocking-endpoints-in-development)

#### Implement the Delegate

The implementation class will use the Spring `@Service` annotation.

##### Create the API package

Create the `api` package in the `web` layer, i.e., `mkdir -p src/main/java/demo/jhipster/web/api`. See [Pro Tip](#pro-tip-1).

##### Override the methods of the PetApi

The OpenAPI Generator creates `@RequestMapping` methods in the `demo.jhipster.web.api.PetApi` interface for each `paths` element defined in the OAS using the `operationId`. The writing of the OAS is beyond the scope of this guide, but observe in the `demo.jhipster.web.api.PetApi` each `@RequestMapping` annotation and the generated method. A notable example is the `operationId: find by pet id` and the resulting interface method of `findPetById`, overridden in the example that follows:

```java
package demo.jhipster.web.api;

import demo.jhipster.service.api.dto.Pet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PetsApiDelegateImpl implements PetsApiDelegate {
    
    private final List<Pet> pets = new ArrayList<>();

   @Override
    public ResponseEntity<Pet> findPetById(Long id) {
        Pet pet = getPets().stream().filter(p -> id.equals(p.getId())).findAny().orElse(null);
        if (pet != null) {
            return ResponseEntity.ok(pet);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    private List<Pet> getPets() {
        Pet pet0 = new Pet();
        pet0.setId(1L);
        pet0.setName("Chessie Cat");
        pet0.setTag("cat");
        pets.add(pet0);
        return pets;
    }
}
```

##### Pro Tip

If the OpenAPI Generator is not producing the types or code desired, review the documentation. The JHipster default settings are generically adapted to most APIs. Consider reviewing the `importMappings` and `typeMappings` [options of the provided plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-maven-plugin) for additional flexibility.

#### Test Drive the Implementation

Perform the following in a terminal (or "command prompt"):

```shell
./mvnw # start the server, also try 'npm run app:start', see the package.json for more scripts!
curl -H "Accept: application/json" http://localhost:8081/api/pets/1 
{
  "name" : "Chessie Cat",
  "tag" : "cat",
  "id" : 1
}
```

### Mocking Endpoints in Development

Providing the `NativeWebRequest` bean to the Delegate interface can return example response bodies for the methods that have not been overridden. The endpoints still respond with a `501 Not Implemented` HTTP status code, but the example response may be useful for mocking endpoints before the actual implementation.

> ℹ️ The OAS sample provides example bodies as documented. The `schemas` for each operation MUST define an `example` for the OpenAPI Generator to produce the response bodies. The following snippet is helpful:

```yaml
# ...
# trimmed for brevity
components:
  schemas:
    Pet:
      allOf:
        - $ref: '#/components/schemas/NewPet'
        # trimmed for brevity
      example:
        name: Chessie Cat
        id: 1
        tag: cat
```

#### Override the default constructor of the Delegate Implementation

With the OAS properly defined, add the `NativeWebRequest` to the implementation as shown below. Each step is shown in the example implementation below and follows:

1. Add `NativeWebRequest request` property to the implementation.
2. Override the default no-args constructor,`public PetsApiDelegateImpl(NativeWebRequest request){...}`
3. Override the `demo.jhipster.web.api.PetsApiDelegate#getRequest()` returning the `Optional<NativeWebRequest>`.

```java
package demo.jhipster.web.api;

import demo.jhipster.service.api.dto.Pet;
// imports trimmed for brevity

@Service
public class PetsApiDelegateImpl implements PetsApiDelegate {

    private final NativeWebRequest request;
    private final List<Pet> pets = new ArrayList<>();

    public PetsApiDelegateImpl(NativeWebRequest request) {
        this.request = request;
    }

    /**
     * Provides the NativeWebRequest to the implementation class.
     */
    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<Pet> findPetById(Long id) {
        // previously shown above
    }

    /**
     * Implements the method used at the RequestMapping of /pets in the PetsApi.
     * <p> 
     * Returns an HTTP Status of 501 Not Implemented with an example response body defined 
     * OpenAPI Specification file and generated by the OpenAPI Generator for Spring.
     */
    @Override
    public ResponseEntity<List<Pet>> findPets(List<String> tags, Integer limit) {
        return PetsApiDelegate.super.findPets(tags, limit);
    }

    private List<Pet> getPets() {
        // previously shown above
    }
}
```

Restart the server and observe the following in a terminal (or "command prompt") with `curl` or other HTTP tooling, e.g., Insomina, Postman, httpie:

```shell
$ curl -H "Accept: application/json" http://localhost:8081/api/pets/1
 {
  "name" : "Chessie Cat",
  "tag" : "cat",
  "id" : 1
}
$ curl -H "Accept: application/json" http://localhost:8081/api/pets?tags=cat
*   Trying [::1]:8081...
* Connected to localhost (::1) port 8081
> GET /api/pets?tags=cat HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/8.4.0
> Accept: application/json
> 
< HTTP/1.1 501 Not Implemented
# additional headers trimmed for brevity
< Content-Type: application/json; charset=UTF-8
< Content-Length: 108
< 
{ [108 bytes data]
* Connection #0 to host localhost left intact
[ { "name" : "Chessie Cat", "id" : 1, "tag" : "cat" }, { "name" : "Chessie Cat", "id" : 1, "tag" : "cat" } ]
```

The example body is returned though the HTTP Status of the response is `501 Not Implemented`.

### Authentication

JHipster, by default, secures `/api/**` in `demo.jhipster.config.SecurityConfiguration#filterChain(HttpSecurity,  MvcRequestMatcher.Builder)` requiring authentication, e.g., `.requestMatchers(mvc.pattern("/api/**")).authenticated()`.

Authentication is beyond the scope of this guide. However, review of the `demo.jhipster.security.jwt.TokenAuthenticationIT` integration test can provide some insight into testing authentication in Insomina, Postman, curl, and other HTTP tools. For example, it is possible to generate a JWT Bearer token using Docker as follows:

```shell
docker run --rm --name jwt-cli bitnami/jwt-cli encode \
-S b64:<JHIPSTER_JWT_SECRET> \
-P 'auth=["ROLE_ADMIN"]' \
-e=$(date -v+60S +%s) \ # man date; produce an epoch system time + 60 seconds, macOS date command shown
-s anonymous \
-A HS512 \
--no-typ
```

This will generate a Bearer token for API calls, as follows:

```shell
curl -v -H "Accept: application/json" -H "Authorization: Bearer <ENCODED_TOKEN>" http://localhost:8081/api/pets/1
```
