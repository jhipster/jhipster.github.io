---
layout: default
title: Using DTOs
sitemap:
    priority: 0.7
    lastmod: 2015-05-28T23:41:00-00:00
---

# <i class="fa fa-briefcase"></i> [BETA] Using DTOs

__WARNING!__ This is a new feature, of <b>BETA</b> quality. Use it at your own risk! Feedback is highly welcome!

## Introduction

By default, JHipster uses its domain objects (typically JPA entities) directly in its REST endpoints. This has a lot of benefits, the main one being that it makes the code easy to use, understand and extend.

For complex use cases, however, you might want to use Data Transfer Objects (or DTOs) that will be exposed by the REST endpoints. Those objects add an extra layer on top of the domain objects, and are specifically tuned for the REST layer: their main benefit is that they can aggregate several domain objects.

## How DTOs work in JHipster

When generating a JHipster entity, you have the option to also generate a DTO for this entity. If you select that option:

- A DTO will be generated, and it will be mapped on the underlying entity.
- It will aggregate many-to-one relationships, only using the ID and the field used to display it with AngularJS. For example, a many-to-one relationship to the `User` entity will add a `userId` field and a `userLogin` field to the DTO.
- It will ignore one-to-many relationships and many-to-many relationships on the non-owner side: this matches the way entities work (they have a `@JsonIgnore` annotation on those fields).
- For a many-to-many relationship on the owner side: it will use DTOs from the other entity and use them in a `Set`. Thus, this can only work if the other entity also uses DTOs.

## Using MapStruct to map DTOs and entities

As DTOs look a lot like entities, it's a frequent requirement to have a solution to map them automatically with each other.

The selected solution in JHipster is to use [MapStruct](http://mapstruct.org/). It is an annotation processor, plugged into the Java compiler, that will generate the required mapping automatically.

We have found it very clean and efficient, and liked that it does not use reflection (which is bad for performance when used as heavily as in a mapper).

## Configuring your IDE for MapStruct

MapStruct is an annotation processor, and as such can be set up to be run automatically when your IDE compiles the project. We have found this approach difficult to use, and prefer to use the `mvn compile` goal directly.

If you want to configure your IDE to use MapStruct, you will need to add the MapStruct processor to your `pom.xml`dependencies:

    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct-processor</artifactId>
        <version>${mapstruct.version}</version>
    </dependency>

If you find a good workflow using your IDE as well as Maven, please send us some feedback!

## Advanced MapStruct usage

MapStruct mappers are configured as Spring Beans, and support dependency injection. One nice tip is that you can inject a `Repository` into a mapper, so you can fetch a managed JPA entity from the mapper, using its ID.

Here is an example code, fetching a `User` entity:

    @Mapper
    public abstract class CarMapper {

        @Inject
        private UserRepository userRepository;

        @Mapping(source = "user.id", target = "userId")
        @Mapping(source = "user.login", target = "userLogin")
        public abstract CarDTO carToCarDTO(Car car);

        @Mapping(source = "userId", target = "user")
        public abstract Car carDTOToCar(CarDTO carDTO);

        public User userFromId(Long id) {
            if (id == null) {
                return null;
            }
            return userRepository.findOne(id);
        }
    }

## Future roadmap

In the future, if we find out that MapStruct is not enough for everyone, we will add another DTO mapper. The easiest solution would be to generate that mapping automatically with JHipster, and not use any third-party library.
