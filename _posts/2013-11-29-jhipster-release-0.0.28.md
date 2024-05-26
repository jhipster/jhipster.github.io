---
layout: default
title: Version 0.0.28 publiée
---

Sortie de JHipster version 0.0.28
==================


Les profils Maven nommés "development" et "production" ont été renommés "dev" et "prod" pour qu'ils soient plus rapides à taper.

En mode "dev", il ne devrait y avoir rien de nouveau.

En mode "prod", il y a beaucoup de nouveautés :

- Un "grunt build" complet est automatiquement déclenché lors de l'emballage de l'application
- Cela mettra une version minifiée et optimisée des ressources statiques dans "src/main/webapp/dist"
- 2 nouveaux filtres Servlet sont activés : l'un est simplement utilisé pour servir le contenu statique du répertoire "/dist", et l'autre ajoute des en-têtes HTTP afin que ce contenu soit mis en cache
