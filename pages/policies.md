---
layout: default
title: Politiques
permalink: /policies/
redirect_from:
  - /policies.html
sitemap:
  priority: 0.7
  lastmod: 2015-07-31T18:40:00-00:00
---
# <i class="fa fa-gavel"></i> Politiques

L'équipe de développement de JHipster suit certaines politiques de codage. Vous pouvez les considérer comme des "meilleures pratiques" ou des "directives". Elles sont appliquées sur le projet lui-même, et non sur le code généré : si vous utilisez JHipster pour générer votre projet, vous n'êtes absolument pas obligé de les suivre !

Ces politiques sont suivies par la [équipe de développement]({{ site.url }}/team/), et vous devriez les suivre si vous soumettez une demande de tirage.

## Politique 0 : Les politiques sont votées par l'équipe de développement

Chaque politique peut être discutée ou modifiée par l'équipe de développement sur la [liste de diffusion](https://groups.google.com/forum/?hl=en#!forum/jhipster-dev). Toute modification significative doit être votée (+1 si vous êtes d'accord, -1 si vous êtes en désaccord).

## Politique 1 : Les technologies utilisées par JHipster ont leur configuration par défaut et leurs meilleures pratiques utilisées autant que possible

Par exemple, nous utilisons JPA, Spring, Angular et React de la "manière habituelle", sans certaines options de configuration lourdes et avec leurs conventions de nommage et de codage habituelles. Nous faisons cela car :

- Chaque technologie a généralement une très bonne raison d'avoir ces valeurs par défaut
- Il est beaucoup plus facile de comprendre comment fonctionne JHipster si nous ne reconfigurons pas tout

Nous ne modifions peut-être la configuration par défaut que si cela pose problème avec les autres technologies utilisées par JHipster. Par exemple, pour faire fonctionner Spring Security et Angular ensemble, nous avons dû modifier la configuration par défaut de Spring Security ou si la configuration par défaut rend nos templates EJS extrêmement complexes

## Politique 2 : Ajouter des options/fonctionnalités uniquement lorsqu'elles apportent une valeur ajoutée suffisante dans le code généré

JHipster propose de nombreuses options lors de la génération d'un projet. Nous n'ajoutons ces options que lorsqu'elles sont complexes et impliquent la configuration ou le codage de plusieurs composants.

Ajouter une option uniquement parce qu'elle permet d'économiser quelques lignes de code n'est pas une bonne utilisation de JHipster :

- Il est plus facile de coder ces lignes manuellement que d'apprendre une nouvelle option JHipster
- Cela ne fera qu'alourdir notre générateur sans ajouter de valeur

## Politique 3 : Utiliser des versions strictes pour les bibliothèques tierces côté serveur et côté client

La seule exception concerne les dépendances sur nos bibliothèques où les versions relatives fonctionnent mieux. Nous avons eu de nombreux problèmes avec les versions des bibliothèques entraînant des conflits. Il s'agit principalement d'un problème de JavaScript, donc pour être clair : nous utilisons des versions de bibliothèques fixes dans les fichiers `package.json` générés.

## Politique 4 : Nous fournissons une expérience utilisateur/développeur similaire pour les différentes options fournies pour le même objectif autant que possible

Un aspect important de JHipster est notre expérience utilisateur et développeur et la facilité avec laquelle vous pouvez échanger une technologie contre une autre (par exemple : framework client, authentification, base de données, etc) et donc ce serait plus facile pour les développeurs s'ils sont configurés/codés aussi similaires que possible. Nous pouvons faire des exceptions lorsque cela viole d'autres politiques.

## Politique 5 : L'expérience développeur peut primer sur les politiques 1, 2, 3 & 4.

Cela signifie que nous devons nous assurer que l'expérience développeur n'est pas affectée par ce qui suit autant que possible

- Ajouts de fonctionnalités
- Développement basé sur le buzz
- Confort des contributeurs
- Enthousiasme technologique

L'expérience développeur est subjective, donc ce qui suit peut être un guide approximatif pour la communauté JHipster. Ce sera l'expérience globale de l'utilisation de JHipster en tant que produit et plateforme. Cela inclut

- L'expérience de la CLI JHipster (facilité d'utilisation, intuitivité, rapidité, etc.)
- Code généré (qualité, simplicité, lisibilité, facilité de maintenance, capacité de montée en version, familiarité, etc.)
- UX des outils comme JHipster en ligne, JDL studio
- Docs (site Web et README généré)

En cas de désaccord sur l'application de cette politique, il peut y avoir un débat au cas par cas et un vote sur la [liste de diffusion](https://groups.google.com/forum/?hl=en#!forum/jhipster-dev) pour le résoudre.