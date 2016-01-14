---
layout: default
title: Managing relationships
sitemap:
priority: 0.7
lastmod: 2015-10-24T18:40:00-00:00
---

# <i class="fa fa-sitemap"></i> Managing relationships

When JPA is used, the [entity sub-generator]({{ site.url }}/pages/creating_an_entity.html) can create relationships between entities.

## Presentation

Relationships only work when JPA is used. If you choose to use [Cassandra]({{ site.url }}/pages/using_cassandra.html) or [MongoDB]({{ site.url }}/pages/using_mongodb.html), they won't be available.

A relationship works between two entities, and JHipster will generate the code for:

- Managing this relationship with JPA in the generated entities
- Creating the correct Liquibase changelog, in order for the relationship to exist in the database
- Generating the AngularJS front-end so you can manage this relationship graphically in the user interface

As we use JPA, the usual one-to-many, many-to-one, many-to-many and one-to-one relationships are available:

1. [A bidirectional one-to-many relationship](#1)
2. [A unidirectional many-to-one relationship](#2)
3. [A unidirectional one-to-many relationship](#3)
4. [A unidirectional one-to-one relationship](#4)
5. [Two one-to-many relationships on the same two entities](#5)
6. [A many-to-many relationship](#6)
7. [A one-to-one relationship](#7)

_Tip: the `User` entity_

Please note that the `User` entity, which is handled by JHipster, is specific. You can do `many-to-one` relationships to this entity (a `Car` can have a many-to-one relationship to a `User`). This will generate a specific query in your new entity repository, so you can filter your entity on the current security user, which is a common requirement.

## <a name="1"></a> A bidirectional one-to-many relationship

Let's start with two entities, a `Owner` and a `Car`. A owner can have many cars, and a car can have only one owner.

So this is a simple one-to-many relationship (one owner has many cars) on one side, and a many-to-one relationship (many cars have one owner) on the other side:

    Owner (1) <-----> (*) Car

As the `Car` table will need to have a foreign key on the `Owner` table, we need to create the `Owner` first. Here are the relevant JHipster questions for the `Owner`:

    yo jhipster:entity Owner
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? owner

Please note that we selected the default options concerning the names of the relationships.

Now we can generate the `Car`:

    yo jhipster:entity Car
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Owner
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with AngularJS, which field from 'Owner' do you want to use? id

That's it, you now have a one-to-many relationship between those two entities!

## <a name="2"></a> A unidirectional many-to-one relationship

In the previous example we had a bidirectional relationship: from a `Car` instance you could find its owner, and from a `Owner` instance you could get all of its cars.

A many-to-one unidirectional relationship means that the cars know their owner, but not the opposite.

    Owner (1) <----- (*) Car

You would do that relationship for two reasons:

- From a business point of view, you only use your entities in this way. So you don't want to have an API that allows developers to do something which doesn't make sense.
- You have a small performance gain when using the `Owner` entity (as it won't have to manage the collection of cars).

In that case, you would still create the `Owner` first, this time with no relationship:

    yo jhipster:entity Owner
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? No

And then the `Car` entity, as in the previous example:

    yo jhipster:entity Car
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Owner
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with AngularJS, which field from 'Owner' do you want to use? id

This will work as in the previous example, but you won't be able to add or remove cars from the `Owner` entity.

## <a name="3"></a> A unidirectional one-to-many relationship

A many-to-one unidirectional relationship means that the `Owner` instance can get its collection of cars, but not the opposite. It is the opposite from the previous example.

    Owner (1) -----> (*) Car

This type of relationship is not provided by default in JHipster at the moment, see [#1569](https://github.com/jhipster/generator-jhipster/issues/1569) for more information.

You have two solutions for this:

- Do a bidirectional mapping, and use it without modification: this is our recommended approach, as it is much simpler
- Do a bidirectional mapping, and then modify it to transform it into a unidirectional mapping:
    - Remove the "mappedBy" attribute on your `@OneToMany` annotation
    - Generate the required join table: you can do a `mvn liquibase:diff` to generate that table, see the [documentation about using Liquibase diff]({{ site.url }}/pages/development.html)


## <a name="4"></a> A unidirectional one-to-one relationship

A unidirectional one-to-one relationship means that the `citizen` instance can get its passport, but the `passport` instance can't get to its owner.

    Citizen (1) -----> (1) Passport

Generate the `Passport` entity first, without any relationship to its owner:

    yo jhipster:entity Passport
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? No

Then, generate the `Citizen` entity:

    yo jhipster:entity Citizen
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Passport
    ? What is the name of the relationship? passport
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? Yes
    ? What is the name of this relationship in the other entity? citizen
    ? When you display this relationship with AngularJS, which field from 'Passport' do you want to use? id

After doing this, a `Citizen` possesses a passport, but no `Citizen` instance is defined in `Passport`.


## <a name="5"></a> Two one-to-many relationships on the same two entities

For this example, a `Person` can be the owner of many cars, and he can also be the driver of many cars:

    Person (1) <---owns-----> (*) Car
    Person (1) <---drives---> (*) Car

For this we need to use the relationship names, which we have left with their default values in the previous examples.

Generate the `Person` entity, which has tow one-to-many relationships to the `Car` entity:

    yo jhipster:entity Person
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? ownedCar
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? owner
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? drivedCar
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? driver

Generate the `Car` entity, which use the same relationship name has was configured in the `Person` entity:

    yo jhipster:entity Car
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Person
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with AngularJS, which field from 'Person' do you want to use? id
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Person
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with AngularJS, which field from 'Person' do you want to use? id

A `Car` can now have a driver and a owner, which are both `Person` entities.

## <a name="6"></a> A many-to-many relationship

A `Driver` can drive many cars, but a `Car` can also have many drivers.

    Driver (*) <-----> (*) Car

At the database level, this means we will have a join table between the `Driver` and the `Car` tables.

For JPA, one of those two entities will need to manage the relationship: in our case, that would be the `Car` entity, which will be responsible to add or remove drivers.

First generate the non-owning side of the relationship, the `Driver`, with a many-to-many relationship:

    yo jhipster:entity Driver
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? many-to-many
    ? Is this entity the owner of the relationship? No
    ? What is the name of this relationship in the other entity? driver

Then generate the `Car`, with the owning side of the many-to-many relationship:

    yo jhipster:entity Car
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Driver
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? many-to-many
    ? Is this entity the owner of the relationship? Yes
    ? When you display this relationship with AngularJS, which field from 'Driver' do you want to use? id

In the user interface, you will be able to add/remove drivers from the `Car` management page.

## <a name="7"></a> A one-to-one relationship

Following our example, a one-to-one relationship would mean that a `Driver` can drive only one `Car`, and a `Car` can only have one `Driver`.

    Driver (1) <-----> (1) Car

First create the non-owning side of the relationship, in our case the `Driver`:

    yo jhipster:entity Driver
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? No
    ? What is the name of this relationship in the other entity? driver

Then generate the `Car`, which owns the relationship:

    yo jhipster:entity Car
    ...
    Generating relationships with other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Driver
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? Yes
    ? What is the name of this relationship in the other entity? car
    ? When you display this relationship with AngularJS, which field from 'Driver' do you want to use? id
