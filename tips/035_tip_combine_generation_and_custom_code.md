---
layout: default
title: Combinaison de génération et de code personnalisé
sitemap:
priority: 0.1
lastmod: 2021-09-09T21:22:00-00:00
---

__Astuce soumise par [@tcharl](https://github.com/tcharl)__

# Combinaison de génération et de code personnalisé

_Objectif:_ JHipster est très utile pour gérer vos entités de modèle grâce à son puissant langage spécifique au domaine.
Mais obtenir le meilleur des deux mondes, entre le code personnalisé et le monde génératif, est toujours une tâche difficile.
Voici les différents schémas que vous pouvez adopter pour y parvenir.

## Schéma 1 - Générer une fois

Cette approche est la plus simple et est utilisée dans la plupart des cas d'utilisation.
Elle consiste à modéliser vos entités une fois, générer le premier modèle, puis remplacer ce que vous voulez après ce premier tir.
Si un jour vous voulez resynchroniser, vous pouvez toujours régénérer dans une autre branche, puis comparer les deux codes via votre IDE.
Cependant, ce processus ultérieur est toujours laborieux et vous pouvez passer des jours pour une mise à niveau majeure.

### Avantages

- Faites ce que vous voulez

### Inconvénients

- Vous avez tendance à ne pas bénéficier des nouvelles fonctionnalités de JHipster

## Schéma 2 - Diviser le code généré et le code personnalisé

Avec cette approche, vous essayerez d'éviter de modifier les classes générées et de héberger votre code personnalisé dans des classes dédiées.
Ici, vous pouvez utiliser l'option --with-generated-flag de la CLI JHipster pour différencier facilement les classes générées de vos propres classes.
Enfin, vous ne modifierez que le routeur principal de la partie frontend pour router vers votre page d'accueil personnalisée au lieu de celle générée.

Pour éviter que votre fichier de routage ne soit remplacé à chaque génération, vous pouvez créer un fichier `.yo-resolve` à la racine de votre projet et indiquer à Yeoman le comportement attendu.

Exemple :

```
src/main/resources/swagger/api.yml skip
src/main/webapp/app/modules/home/home.tsx skip
```

### Avantages

- Peut combiner génération et code personnalisé sans trop de tracas

### Inconvénients

- Code mort
- Classes personnalisées avec des noms ou des packages différents de votre modèle (peut être considéré comme une meilleure pratique de DDD mais néanmoins).

## Schéma 3 - Côte à côte

Ici, l'objectif est d'utiliser des extensions de classes et la prépondérance des beans pour injecter votre code personnalisé à la place de celui généré.

Prenons un exemple avec une entité jhipster `Customer`.

### Repository

Au niveau du repository, vous annoterez le repository généré par jhipster en utilisant l'annotation `NoRepositoryBean` afin de désactiver la découverte.
Vous pouvez ensuite créer votre classe de repository personnalisée

```
@Repository
@Primary
MemberRepositoryPrimary extends MemberRepository
```

### Service

Ici, vous utiliserez l'option `serviceImpl` afin de pouvoir injecter votre Bean personnalisé dans votre Contrôleur.
Ensuite, vous pouvez simplement étendre le service généré et annoter votre bean avec `@Primary` pour obtenir la prépondérance.

### Contrôleur

Vous utiliserez un autre préfixe d'API pour vos points de terminaison personnalisés (par exemple `/api/v2`).

### Angular

La même extension s'applique côté frontend, vous pouvez ensuite configurer la prépondérance de vos beans dans le fichier `app.module.ts` :

```
providers: [
// keep other entries
{ provide: MemberDomainService, useExisting: MemberDomainServicePrimary },
]
```

### Avantages

- Peut remplacer le comportement du code généré
- Facile à trouver le code personnalisé
- Garde la meilleure structure de JHipster même pour le code personnalisé

### Inconvénients

- Duplication de fichiers