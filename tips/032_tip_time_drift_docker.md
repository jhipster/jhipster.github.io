---
layout: default
title: Dérive temporelle dans Docker
sitemap:
priority: 0.1
lastmod: 2020-05-02T06:14:00-00:00
---

# Dérive temporelle dans Docker

**Astuce soumise par [@SudharakaP](https://github.com/SudharakaP)**

Une des choses à prendre en compte lors de l'utilisation de Docker sur de longues périodes (avec des cycles de veille entre les deux), est qu'il peut y avoir des instances où une dérive temporelle entre les conteneurs Docker et l'horloge du système d'exploitation peut se produire.

Cela entraîne des bugs difficiles à trouver comme [celui-ci](https://github.com/jhipster/generator-jhipster/issues/11659).

La dérive temporelle de Docker a été signalée à la fois sur [Macs](https://github.com/docker/for-mac/issues/2076) et sur [Windows](https://github.com/docker/for-win/issues/4526), et la solution la plus simple consiste à redémarrer les conteneurs Docker après de longues périodes de cycles de veille.