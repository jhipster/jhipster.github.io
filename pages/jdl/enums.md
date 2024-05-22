---
layout: default
title: Langage de Domaine JHipster - Enums
permalink: /jdl/enums
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> Langage de Domaine JHipster (JDL) -  Énumérations

## Sommaire

1. [Syntaxe](#syntaxe)
1. [Exemples](#exemples)
   1. [Exemple de base](#exemple-de-base)
   1. [Avec valeurs](#avec-valeurs)
   1. [Commentaire](#Commentaire)

---

### Syntaxe

La déclaration d'une énumération se fait comme suit :


```
enum <nom de l'énum> {
<CLÉ DE L'ÉNUM> [(<valeur de l'énum>)]
}
```


  - Les valeurs des entrées de l'énumération sont obligatoires
    - Et des clés en majuscules doivent être utilisées
  - Les valeurs des entrées de l'énumération sont optionnelles et doivent être enveloppées entre parenthèses

---

### Exemples

#### Exemple de base

```jdl
enum Country {
  BELGIUM,
  FRANCE,
  ITALY
}

```

Et son utilisation :

```jdl
enum Country {}

entity A {
  country Country
}
```

---

#### Avec valeurs

À partir de JHipster Core v6, les valeurs des énumérations peuvent avoir des valeurs explicites :

```jdl
enum Country {
  BELGIUM (Belgium),
  FRANCE (France),
  ITALY (Italy),
  CHINA ("中国")
}
```

---

#### Commentaire

Comme pour les relations, entités et champs, il est possible de commenter les énumérations, selon les mêmes règles.

Les commentaires seront ensuite ajoutés en tant que commentaires Javadoc par JHipster. Le JDL possède son propre type de commentaire :
  - // un commentaire ignoré
  - /** un commentaire non ignoré */

Ainsi, tout ce qui commence par  `//` iest considéré comme un commentaire interne pour JDL, et ne sera pas pris en compte comme Javadoc.
Veuillez noter que les directives de JDL Studio qui commencent par `#` seront ignorées lors de l'analyse.

```jdl
/** Ce commentaire sera pris en compte */
enum Country {
  // Mais pas celui-ci !
  FRANCE
}
```
