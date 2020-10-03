---
layout: default
title: The User entity
permalink: /user-entity/
sitemap:
    priority: 0.5
    lastmod: 2020-09-14T00:00:42-00:00
---

# <i class="fa fa-user"></i> The User entity

This entity is a special entity as JHipster creates and manages it internally.

It contains some basic information:
  - a first name and a last name,
  - a login,
  - an email address,
  - a password (not in clear text),
  - authorities,
  - etc.

Creating an application from scratch will generate you some default users like the `admin` or the `guest` users.

## Possible relationships

Here are the possible relationships from/to this entity:
  - `many-to-one` relationships to this entity (a `Car` can have a many-to-one relationship to a `User`).
    This will generate a specific query in your new entity repository, so you can filter your entity on the current
    security user, which is a common requirement. On the generated Angular/React client UI you will have a dropdown in
    `Car` to select a `User`.
  - `many-to-many` and `one-to-one` relationships to the `User` entity, but the other entity __must__ be the owner
    of the relationship (a `Team` can have a many-to-many relationship to `User`, but only the team can add/remove users,
    and a user cannot add/remove a team). On the front-end client UI, you will also be able to select a `User` in
    a multi-select box.

When using the UAA authentication type, you can only create relationships to the User entity if the related entity is
also within the UAA microservice.

## Modifying the User entity

If you encounter a problem where you need to alter the `User` entity, we recommend not doing that.
Modifying this default entity might break your app depending on the nature of the changes.

Instead, there are other available solutions like:
  - creating an entity composed of the `User` entity,
  - extending the `User` entity

### Using composition

If you need to add a new field to the entity, or add relationships to it, 
all you need do is create another entity, for instance:

```jdl
entity ApplicationUser {
  additionalField Integer min(42) max(42)
}

relationship OneToOne {
  ApplicationUser{internalUser} to User
}
```

Here's what this snippet does:
  - create a new entity named `ApplicationUser` with a field,
  - create a relationship from this entity to the standard `User` entity:
    - we use a `OneToOne` relationship to link a JHipster-created entity to this new one,
    - we use a unidirectional relationship in order not to modify the internally-managed `User` entity. 

This is the recommended solution as it's doable using the JDL.
This solution is great for adding new fields and relationships (amongst other things) to the `User` entity
without actually modifying it.

### Using inheritance

This solution does the same thing as the previous one, but isn't as straightforward as the first one because you need to:
  - create a new entity by hand,
  - adapt the code to make it use this new entity,
  - potentially manage yourself the database migration to persist this new entity (depending on the nature of the changes).

It possesses, however, the same advantage as the previous one: you needn't change the `User` entity by hand.

### Creating your own default User entity

This one isn't actually recommended, but is possible through the use of the user management skipping option
(`skipUserManagement` application option in the JDL).

JHipster uses this option internally in some cases (for some options), and using it will:
  - not generate any user management code (front-end & back-end),
  - allow you to update the `User` entity (add/delete any field to it),

Additionally, you'll have to create the entity and handle user management yourself.

**It's better to keep it `false` as the first two solutions are quite easy to do**.
