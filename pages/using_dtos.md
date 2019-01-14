---
layout: default
title: Using DTOs
permalink: /using-dtos/
redirect_from:
  - /using_dtos.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-28T23:41:00-00:00
---

# <i class="fa fa-briefcase"></i> Using DTOs

## Introduction

By default, JHipster uses its domain objects (typically JPA entities) directly in its REST endpoints. This has a lot of benefits, the main one being that it makes the code easy to use, understand and extend.

For complex use cases, however, you might want to use Data Transfer Objects (or DTOs) that will be exposed by the REST endpoints. Those objects add an extra layer on top of the domain objects, and are specifically tuned for the REST layer: their main benefit is that they can aggregate several domain objects.

## How DTOs work in JHipster

When generating a JHipster entity, you have the option to add a service layer: the DTO option will only be available if you choose to have a service layer, as it needs that layer to handle the mapping (if you are using JPA, this is because the service layer is transactional, so lazy-loading will work).

Once you have selected to have a service layer, you will have the option to generate a DTO for the entity. If you select that option:

- A DTO will be generated, and it will be mapped on the underlying entity.
- It will aggregate many-to-one relationships, only using the ID and the field used to display it in your client-side framework (Angular, for example). As a result, a many-to-one relationship to the `User` entity will add a `userId` field and a `userLogin` field to the DTO.
- It will ignore one-to-many relationships and many-to-many relationships on the non-owner side: this matches the way entities work (they have a `@JsonIgnore` annotation on those fields).
- For a many-to-many relationship on the owner side: it will use DTOs from the other entity and use them in a `Set`. Thus, this can only work if the other entity also uses DTOs.

## Using MapStruct to map DTOs and entities

As DTOs look a lot like entities, it's a frequent requirement to have a solution to map them automatically with each other.

The selected solution in JHipster is to use [MapStruct](http://mapstruct.org/). It is an annotation processor, plugged into the Java compiler, that will generate the required mapping automatically.

We have found it very clean and efficient, and liked that it does not use reflection (which is bad for performance when used as heavily as in a mapper).

## Configuring your IDE for MapStruct

MapStruct is an annotation processor, and as such it should also be set up to be run automatically when your IDE compiles the project.

If you are using Maven, you need to activate the `IDE` maven profile in your IDE. Gradle users don't need to apply anything IDE-specific.

Instructions for activating the profile are included in [Configuring your IDE]({{ site.url }}/configuring-ide/).

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
