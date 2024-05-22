---
layout: default
title: JHipster Domain Language - Troubleshooting
permalink: /jdl/troubleshooting
sitemap:
    priority: 0.5
    lastmod: 2023-07-09T23:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Dépannage

Nous avons essayé de rendre la syntaxe aussi conviviale que possible pour les développeurs.
Vous pouvez faire ces choses avec :
  - Déclarer des applications avec leurs options et entités,
  - Déclarer des entités avec leurs attributs,
  - Déclarer les relations entre elles,
  - Et déclarer certaines options spécifiques à JHipster.

Si vous souhaitez consulter la grammaire du JDL, un fichier HTML est disponible
[ici](https://github.com/jhipster/generator-jhipster/blob/master/jdl/parsing/generated/grammar.html).

---

### L'importation du JDL ne trouve qu'une seule entité lors de la correspondance du baseName MS

Il s'agit d'un problème connu concernant le système de parsing et sa résolution est délicate.
Une solution de contournement consiste à utiliser des noms différents pour le microservice et les entités à l'intérieur.

Voir [JHipster Core issue #308](https://github.com/jhipster/jhipster-core/issues/308) pour plus d'informations.

---

<h2 id="issues">Problèmes et bugs</h2>

Le JDL est [disponible sur GitHub](https://github.com/jhipster/generator-jhipster/tree/main/jdl), et suit les mêmes
[directives de contribution que JHipster](https://github.com/jhipster/generator-jhipster/blob/main/CONTRIBUTING.md).

Veuillez utiliser l'étiquette ["JDL"](https://github.com/jhipster/generator-jhipster/labels/theme%3A%20JDL) pour soumettre 
des problèmes et des Pull Requests concernant la bibliothèque elle-même.

- [Tracker de problèmes JDL](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aopen+is%3Aissue+label%3A%22theme%3A+JDL%22)
- [Pull Requests JDL](https://github.com/jhipster/generator-jhipster/pulls?q=is%3Aopen+is%3Apr+label%3A%22theme%3A+JDL%22)

Lorsque vous soumettez quelque chose, vous devez être aussi précis que possible :  
  - **Un problème posté ne doit avoir qu'un seul problème** (ou une seule demande/question);  
  - Les Pull Requests sont les bienvenues, mais les commits doivent être 'atomiques' pour être vraiment compréhensibles.  
