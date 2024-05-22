---
layout: default
title: JHipster Domain Language - Relations
permalink: /jdl/relationships
sitemap:
    priority: 0.5
    lastmod: 2019-11-03T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Relations

## Sommaire

1. [Types de relation](#types-de-relation)
1. [Méthodes de relation](#méthodes-de-relation)
1. [Corps de relation multiples](#corps-de-relation-multiples)
1. [Syntaxe](#syntaxe)
1. [Exemples](#exemples)
   1. [Exemple de base](#exemple-de-base)
   1. [Avec champs injectés](#avec-champs-injectés)
   1. [Avec champs joints](#avec-champs-joints)
   1. [Avec méthodes](#avec-méthodes)
   1. [Avec options](#avec-options)
   1. [Avec côtés requis](#avec-côtés-requis)
   1. [Relations réflexives](#relations-réflexives)
   1. [Commentaire](#Commentaire)

---

### Types de relation

Mentionné après le mot-clé `relationship`.

Il y a quatre types de relation :
  - `OneToOne`
  - `OneToMany`
  - `ManyToOne`
  - `ManyToMany`

Pour en savoir plus sur les relations et ce qu'il est possible de réaliser, vous pouvez consulter
[la page dédiée](/managing-relationships).

Une note sur les noms pluriels : JHipster les gère pour vous éviter de le faire dans vos relations.

---

### Méthodes de relation

Mentionnées après l'entité source et de destination, utilisées avec le mot-clé `with`.

Méthodes prises en charge :
  - `builtInEntity` : requis lorsque l'entité de destination est une entité intégrée comme `User` et `Authority`

---

### Corps de relation multiples

Si vous en avez assez d'avoir _n_ relations du même type dans votre fichier JDL, ne vous inquiétez pas ! Il y a une solution.

Prenez cet exemple de JDL :
```jdl
relationship OneToOne {
  A to B
}
relationship OneToOne {
  B to C
}
relationship OneToOne {
  C to D
}
relationship OneToOne {
  D to A
}

```

La solution consiste à mettre chaque corps de relation dans une déclaration de relation unique, comme ceci :

```jdl
relationship OneToOne {
  A to B,
  B to C,
  C to D,
  D to A
}
```

Cette syntaxe est très utile lorsque :
  - Vous avez beaucoup de relations du même type,
  - Vous voulez savoir quelles sont les relations,
  - Vous ne voulez pas perdre de temps à les chercher dans votre(vos) fichier(s) JDL

---

### Syntaxe

La déclaration de relation se fait comme suit:
```
relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
  @<option>("<option value>")+ <from entity>[{<relationship name>[(<display field>)]}] to @<option>("<option value>")+ <to entity>[{<relationship name>[(<display field>)]}]+
}
```

  - `(OneToMany | ManyToOne| OneToOne | ManyToMany)` est le type de votre relation,
  - `<option>` est l'une des valeurs prises en charge : `Id | OnDelete | OnUpdate`. Assurez-vous de le mettre du bon côté de la relation. La sensibilité à la casse du premier caractère n'est pas prise en compte (l'export JDL générera en majuscules).
  - `<option value>` est l'une des valeurs optionnelles correspondant à l'option donnée : `NO ACTION | RESTRICT | CASCADE | SET NULL | SET DEFAULT`
  - `<from entity>` est le nom de l'entité propriétaire de la relation : la source,
  - `<to entity>` est le nom de l'entité où va la relation : la destination,
  - `<relationship name>` est le nom du champ ayant l'autre extrémité comme type,
  - `<display field>` est le nom du champ qui doit apparaître dans les boîtes de sélection (par défaut : `id`),
  - `required` indique si le champ injecté est requis.
  - `with builtInEntity` indique si la destination de la relation est une entité intégrée
  - Et vous pouvez avoir plus d'un corps de relation
    - Voir la section  [Corps de relation multiples](#multiple-relationship-bodies) pour plus d'informations!

---

### Exemples

#### Exemple de base

```jdl
relationship OneToOne {
  A to B
}
```

Notez que cet exemple est le même que :
```jdl
relationship OneToOne {
  A{b} to B{a}
}
```
Ne pas spécifier de champ injecté est la forme courte d'avoir une relation bidirectionnelle.

Un autre exemple :
```jdl
relationship OneToOne {
  A{b} to B
}
```
Cela générera une relation unidirectionnelle. Vous ne pouvez trouver l'entité B que par l'entité A, mais vous ne pouvez pas trouver l'entité A par l'entité B.


---

#### Avec champs injectés

```jdl
relationship ManyToMany {
  A{b} to B{a}
}
```

C'est une relation bidirectionnelle, ce qui signifie que les deux entités seront générées avec une "instance" de l'autre entité.

---

---

#### Avec méthodes

```jdl
relationship OneToOne {
  A to User with builtInEntity
}
```

---

#### Avec options

```jdl
relationship ManyToOne {
   A to @OnDelete("SET NULL") @OnUpdate("CASCADE") B
}
```
Note :

En Hibernate/JPA, la suppression d'une entité parente dans une relation many-to-one avec des entités enfants dépend de la configuration de la relation et du comportement de cascade.

Suppression en cascade : Lorsqu'elle est activée, la suppression de la parent supprime automatiquement ses enfants associés. Cela est réalisé en utilisant CascadeType.REMOVE dans l'annotation @OneToMany sur la classe de l'entité parente.
```
@OneToMany(mappedBy = "parent", cascade = CascadeType.REMOVE)
private List<ChildEntity> children;
```
Suppression sans cascade : Si elle n'est pas activée, la suppression d'une parent avec des enfants entraînera une violation de contrainte de clé étrangère. Vous devez supprimer ou dissocier manuellement les enfants avant de supprimer la parent.
Utilisez la suppression en cascade avec prudence car elle peut entraîner une perte de données non intentionnelle.

Alternative pour éviter l'erreur de suppression : Utilisez l'annotation @OnDelete dans JDL qui configurera le schéma de la base de données pour la suppression en cascade ou ajoutez cascade = CascadeType.REMOVE au code Java généré (le cas échéant).
---

#### Avec côtés requis

Utilisé pour rendre au moins un côté de la relation requis.

```jdl
relationship ManyToMany {
  A{b required} to B{a}
}

// or

relationship ManyToMany {
  A{b} to B{a required}
}

or

relationship ManyToMany {
  A{b(name) required} to B{a required}
}
```

---

#### Relations réflexives

Une relation réflexive est une relation dont les entités source et destination sont les mêmes.

```jdl
relationship ManyToMany {
  A{parent} to A{child}
}
```

---

#### Une note sur les relations réflexives requises

Comme mentionné [ici](https://github.com/jhipster/generator-jhipster/issues/11495), les relations requises vers la même entité ne sont pas prises en charge. Le problème est qu'un enfant doit **toujours** avoir un parent, qui à son tour doit en avoir un aussi, etc.
Une solution de contournement possible est d'avoir des entités racines et enfants explicites.

----

#### Commentaire

Ajouter des commentaires pour les relations est possible :

```jdl
relationship OneToOne {
  /** Ce commentaire sera placé avant b dans l'entité A */
  A{b}
  to
  /** Ce commentaire sera placé avant a dans l'entité B */
  B{a}
}

```

Les mêmes règles de commentaire s'appliquent ici.
Ces commentaires seront plus tard ajoutés comme commentaires Javadoc par JHipster. Le JDL possède son propre type de commentaire :
  - // un commentaire ignoré
  - /** pas un commentaire ignoré */

Par conséquent, tout ce qui commence par `//` est considéré comme un commentaire interne pour JDL, et ne sera pas compté comme Javadoc.
Veuillez noter que les directives JDL Studio qui commencent par `#` seront ignorées lors de l'analyse.
