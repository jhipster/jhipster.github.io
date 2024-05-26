---
layout: default
title: Version 8.4.0
---

# Sortie de JHipster v8.4.0

Ceci est une version mineure de JHipster v8.

Elle inclut [224 problèmes résolus et pull requests fermées sur la branche principale](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.4.0) depuis la version 8.3.0.

## Quoi de neuf ?

- Mise à jour vers Spring Boot 3.2.5 ([#25902](https://github.com/jhipster/generator-jhipster/pull/25902))
- Mise à jour du Codec pour Redis pour corriger `LazyInitializationException` ([#25988](https://github.com/jhipster/generator-jhipster/pull/25988))
- Utilisation d'un gestionnaire CSRF personnalisé pour fournir une protection BREACH ([#25907](https://github.com/jhipster/generator-jhipster/pull/25907))
- Correction des profils Spring Boot pour hériter du parent Spring Boot ([#25980](https://github.com/jhipster/generator-jhipster/pull/25980))
- Ajout du support des personnalisations de la page d'accueil dans les blueprints ([#25943](https://github.com/jhipster/generator-jhipster/pull/25943))

### :computer: Frontend

- [Angular] Suppression de `LocaleConfiguration` qui n'est plus nécessaire ([#23818](https://github.com/jhipster/generator-jhipster/pull/23818))
- [Node] Mise à jour vers Node 20.12.2 ([#25801](https://github.com/jhipster/generator-jhipster/pull/25801))

### :scroll: Autres

- Plusieurs améliorations, mises à jour de bibliothèques et corrections de bugs

## Tickets fermés et pull requests fusionnées

Comme toujours, **[vous pouvez consulter tous les tickets fermés et les pull requests fusionnées ici](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.4.0)**.

## Comment installer

Pour installer JHipster v8.4.0 :

    npm install -g generator-jhipster

Il est également disponible en utilisant l'image Docker de JHipster, car elle est automatiquement construite à partir de notre code source.

- [JHipster Online](https://start.jhipster.tech)
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

## Comment mettre à niveau

**Mise à niveau automatique**

Pour une mise à niveau automatique, utilisez le [sous-générateur de mise à niveau de JHipster]({{ site.url }}/upgrading-an-application/) sur une application existante :

Mettez à jour votre version de JHipster :

```
npm update -g generator-jhipster
```


Et exécutez ensuite le sous-générateur de mise à niveau :


```
jhipster upgrade
```

Vous pouvez également utiliser le [blueprint de migration](https://github.com/jhipster/generator-jhipster-migrate) pour des fonctionnalités de mise à niveau plus avancées.

```
npm i -g generator-jhipster-migrate
jhipster-migrate
```

**Mises à niveau manuelles**

Pour une mise à niveau manuelle, mettez d'abord à jour votre version de JHipster avec :

```
npm update -g generator-jhipster
```

Si vous avez un projet existant, il utilisera toujours la version de JHipster avec laquelle il a été généré.
Pour mettre à niveau votre projet, vous devez d'abord supprimer son dossier `node_modules` puis exécuter :

```
jhipster
```

Depuis JHipster 8.0, cette commande mettra à jour votre projet et toutes ses entités.

Vous pouvez également mettre à jour vos entités une par une en exécutant à nouveau le sous-générateur d'entités, par exemple si votre entité s'appelle _Foo_, utilisez :

```
jhipster entity Foo
```

## Aide et bugs

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
- Créer une nouvelle discussion sur [GitHub](https://github.com/jhipster/generator-jhipster/discussions)

Si le problème que vous avez est un bug urgent ou un problème de sécurité, veuillez :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter