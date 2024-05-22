---
layout: default
title: Langage de Domaine JHipster - Entités & champs
permalink: /jdl/entities-fields
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> Langage de Domaine JHipster (JDL) - Entités

## Sommaire

1. [Syntaxe](#syntaxe)
1. [Exemples](#exemples)
   1. [Exemple de base](#exemple-de-base)
   1. [Avec un nom de table personnalisé](#avec-un-nom-de-table-personnalisé)
   1. [Avec des champs](#avec-des-champs)
   1. [Avec des validations de champ](#avec-des-validations-de-champ)
   1. [Déclaration de Blob](#déclaration-de-blob)
   1. [Expressions régulières](#expressions-régulières)
   1. [Commentaire](#commentaire)
1. [Types de champs et validations](#types-de-champs-et-validations)

---

### Syntaxe

La déclaration d'entité se fait comme suit :
```
[<javadoc de l'entité>]
[<annotation de l'entité>]
entity <nom de l'entité> [(<nom de la table>)] {
[<javadoc du champ>]
[<annotation du champ>]
<nom du champ> <type du champ> [<validation>*]
}
```


  - `<nom de l'entité>` le nom de l'entité,
  - `<nom du champ>` le nom d'un champ de l'entité,
  - `<type du champ>` le type de champ supporté par JHipster,
  - et en option :
    - `<javadoc de l'entité>` la documentation de l'entité,
    - `<annotation de l'entité>` les options pour l'entité (voir [OptionsEntity][] pour une liste complète des options disponibles),
    - `<nom de la table>` le nom de la table de la base de données (si vous souhaitez spécifier un nom différent de celui automatiquement calculé à partir du nom de l'entité),
    - `<javadoc du champ>` la documentation du champ,
    - `<annotation du champ>` les options pour le champ (voir [OptionsField][] pour une liste complète des options disponibles),
    - `<validation>` les validations pour le champ.

---

### Exemples

#### Exemple de base

```jdl
entity A

```

Ceci équivaut à :

```jdl
entity A(a) {}
```

La première forme est plus simple, sans spécifier de "corps" (accolades pour les champs) ni de nom de table.

---

#### Avec un nom de table personnalisé

Il est également possible de spécifier un nom de table personnalisé :

```jdl
 entity A(my_super_entity)
```

---

#### Avec des champs

```jdl
entity A {
  name String required
  age Integer
}
```

---

#### Avec des validations de champ

```jdl
entity A {
  name String required
  age Integer min(42) max(42)
}
```

---

#### Déclaration de Blob

JHipster offre un grand choix, car on peut choisir entre un type d'image ou tout type binaire. JDL vous permet de faire de même.
Créez un type personnalisé (voir DataType) avec l'éditeur, nommez-le selon ces conventions :
  - `AnyBlob` ou `Blob`  pour créer un champ du type binaire "any";
  - `ImageBlob` pour créer un champ destiné à être une image.
  - `TextBlob` pour créer un champ pour un CLOB (long texte).

Et vous pouvez créer autant de DataTypes que vous le souhaitez.

---

#### Expressions régulières

Ceci est une validation spécifique (disponible uniquement pour les types String), et sa syntaxe est :

```jdl
entity A {
  name String pattern(/^[A-Z][a-z]+\d$/)
}
```

Décomposons cela:
  - `pattern` est le mot-clé pour déclarer une validation regex (avec les parenthèses normales)
  - `/.../` le motif est déclaré entre deux barres obliques
  - `\` les anti-slashs n'ont pas besoin d'être échappés

---

#### Commentaire

Les commentaires sont possibles dans le JDL pour les entités et les champs, et généreront de la documentation (Javadoc ou JSDoc, selon le backend).

```jdl
/**
 * Ceci est un commentaire
 * à propos d'une classe
 * @author Quelqu'un
 */
entity A {
  /**
   * Ce commentaire sera également utilisé !
   * @type...
   */
   name String
   age Integer // ceci est un autre commentaire
}

```

Ces commentaires seront ensuite ajoutés comme commentaires Javadoc par JHipster. Le JDL possède son propre type de commentaire :
  - // un commentaire ignoré
  - /** un commentaire non ignoré  */

Par conséquent, tout ce qui commence par `//` est considéré comme un commentaire interne pour JDL et ne sera pas pris en compte comme Javadoc.
Veuillez noter que les directives JDL Studio qui commencent par  `#` seront ignorées lors de l'analyse.

Une autre forme de commentaires est la suivante :
```
entity A {
  name String /** Mon super champ */
  count Integer /** Mon autre super champ */
}

```

Ici, le nom de A sera commenté avec `Mon super champ`, celui de B avec  `Mon autre super champ`.

Oui, les virgules ne sont pas obligatoires, mais il est plus sage de les utiliser pour éviter les erreurs dans le code.
**Si vous souhaitez mélanger les virgules et les commentaires suivants, attention!**
```
entity A {
  name String, /** Mon commentaire */
  count Integer
}
```
Le nom de A n'aura pas le commentaire, car le count l'aura.

---

### Types de champs et validations

Chaque type de champ a sa propre liste de validations. Voici les types supportés dans le JDL :

<table class="table table-striped table-responsive">
  <tr>
    <th>Type JDL</th>
    <th>Validations</th>
  </tr>
  <tr>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern, unique</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>required, unique</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Duration</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>UUID</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
</table>

[OptionsEntity]: options#entity-options "Options"
[OptionsField]: options#field-options "Options"
