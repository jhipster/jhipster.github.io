---
layout: default
title: L'entité Utilisateur
permalink: /user-entity/
sitemap:
    priority: 0.5
    lastmod: 2020-09-14T00:00:42-00:00
---

# <i class="fa fa-user"></i> L'entité Utilisateur (User)

NOTE : Ceci n'est pas créé pour les microservices utilisant certains types de sécurité, comme détaillé
<a href="/creating-microservices/">ici</a>.

Cette entité est spéciale car JHipster la crée et la gère en interne.

Elle contient quelques informations de base :
  - un prénom et un nom de famille,
  - un identifiant de connexion,
  - une adresse e-mail,
  - un mot de passe (non en clair),
  - des autorisations,
  - etc.

Créer une application à partir de zéro vous générera quelques utilisateurs par défaut comme les utilisateurs `admin` ou `guest`.

## Relations possibles

Voici les relations possibles de/vers cette entité :
  - les relations `many-to-one` vers cette entité (une `Voiture` peut avoir une relation many-to-one avec un `User`).
    Cela générera une requête spécifique dans le nouveau référentiel de votre entité, vous permettant de filtrer votre entité sur l'utilisateur de sécurité actuel, ce qui est une exigence courante. Sur l'interface utilisateur Angular/React générée, vous aurez une liste déroulante dans `Voiture` pour sélectionner un `User`.
  - les relations `many-to-many` et `one-to-one` avec l'entité `User`, mais l'autre entité __doit__ être le propriétaire
    de la relation (une `Équipe` peut avoir une relation many-to-many avec `User`, mais seule l'équipe peut ajouter/supprimer des utilisateurs,
    et un utilisateur ne peut pas ajouter/supprimer une équipe). Sur l'interface utilisateur frontale, vous pourrez également sélectionner un `User` dans
    une boîte de sélection multiple.

## Modification de l'entité Utilisateur

Si vous rencontrez un problème où vous devez modifier l'entité `User`, nous vous recommandons de ne pas le faire.
Modifier cette entité par défaut pourrait entraîner la rupture de votre application en fonction de la nature des modifications.

Au lieu de cela, d'autres solutions sont disponibles comme :
  - créer une entité composée de l'entité `User`,
  - étendre l'entité `User`

### Utilisation de la composition

Si vous devez ajouter un nouveau champ à l'entité, ou ajouter des relations à celle-ci,
vous n'avez qu'à créer une autre entité, par exemple :

```jdl
entity ApplicationUser {
  champSupplémentaire Integer min(42) max(42)
}

relationship OneToOne {
  ApplicationUser{internalUser(login)} to @OnDelete("CASCADE") @Id User with builtInEntity
}
```

Voici ce que fait cet extrait :
  - créer une nouvelle entité nommée `ApplicationUser` avec un champ,
  - créer une relation de cette entité vers l'entité `User` standard :
    - nous utilisons une relation `OneToOne` pour lier une entité créée par JHipster à celle-ci,
    - nous utilisons une relation unidirectionnelle afin de ne pas modifier l'entité `User` gérée en interne.

C'est la solution recommandée car elle est faisable en utilisant le JDL.
Cette solution est idéale pour ajouter de nouveaux champs et des relations (entre autres choses) à l'entité `User`
sans la modifier réellement.

### Utilisation de l'héritage

Cette solution fait la même chose que la précédente, mais n'est pas aussi directe que la première car vous devez :
  - créer une nouvelle entité manuellement,
  - adapter le code pour qu'il utilise cette nouvelle entité,
  - potentiellement gérer vous-même la migration de la base de données pour persister cette nouvelle entité (selon la nature des modifications).

Elle possède cependant le même avantage que la précédente : vous n'avez pas besoin de modifier l'entité `User` manuellement.

### Création de votre propre entité Utilisateur par défaut

Celle-ci n'est pas vraiment recommandée, mais est possible grâce à l'option de saut de gestion des utilisateurs
(`skipUserManagement` option d'application dans le JDL).

JHipster utilise cette option en interne dans certains cas (pour certaines options), et l'utiliser :
  - ne générera aucun code de gestion des utilisateurs (front-end et back-end),
  - vous permettra de mettre à jour l'entité `User` (ajouter/supprimer tout champ),

De plus, vous devrez créer l'entité et gérer vous-même la gestion des utilisateurs.

**Il vaut mieux laisser cette option sur `false` car les deux premières solutions sont assez faciles à réaliser**.