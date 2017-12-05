---
layout: default
title: Doing API-First development
permalink: /doing-api-first-development/
redirect_from:
  - /doing-api-first-development.html
sitemap:
    priority: 0.7
    lastmod: 2017-12-05T00:00:00-00:00
---

# <i class="fa fa-search"></i> Doing API-First development

When generating a JHipster application, you can choose the `API first development using swagger-codegen` option when prompted for additional technologies.
This option will configure your build tool to use [Swagger-Codegen](https://github.com/swagger-api/swagger-codegen) to generate API code from a Swagger (OpenAPI) definition file.

### Rationale for API-First development

In API first development, instead of generating the documentation from the code, you need to write the specification first and then generate code from it. This has the following advantages:

- You can design your API for the consumers and not as a consequence of your implementation.
- You can use the specification file to mock your new server endpoints before they are released so you can more easily decouple frontend and backend devevelopment.
- You don't need a live server to use your swagger documentation.

### Using the swagger-codegen plugins

The swagger specification file will be located at src/main/resources/swagger/api.yml and is used to generate endpoint interfaces that you can implement. Those interfaces have default methods which answer with a 200 HTTP status and an empty body. Write your specification using a tool such as [swagger-editor](http://editor.swagger.io), put it in `src/main/resources/swagger/api.yml`, then run:
```bash
./mvnw generate-sources
```
Or for gradle:
```bash
./gradlew swagger
```
Then implement the interfaces generated in `${buildDirectory}/generated-sources/swagger/src/main/java/${package}/web/api/controller` with `@RestController` classes.

Note : the implementation class and its interface must belong to the same package.

Example of code to write yourself for the famous [petstore](http://petstore.swagger.io):
```java
@RestController
@RequestMapping("/api/petstore")
public class PetStore implements PetApi, StoreApi, UserApi {

    @Override
    public ResponseEntity<List<Pet>> findPetsByStatus(@RequestParam List<String> status) {
        return new ResponseEntity<>(
            status.stream()
                .distinct()
                .map(Pet.StatusEnum::fromValue)
                .map(statusEnum -> new Pet().id(RandomUtils.nextLong()).status(statusEnum))
                .collect(Collectors.toList()),
            HttpStatus.OK);
    }
}
```