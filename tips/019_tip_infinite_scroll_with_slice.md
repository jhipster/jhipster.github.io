---
layout: default
title: Améliorer les performances de la pagination avec le défilement infini en utilisant Slice
sitemap:
priority: 0.5
lastmod: 2016-11-12T22:22:00-00:00
---

# Améliorer les performances de la pagination avec le défilement infini en utilisant Slice

__Conseil soumis par [@nkolosnjaji](https://github.com/nkolosnjaji)__

La pagination avec défilement infini utilise Spring Data Page pour récupérer des entités depuis votre base de données.
Cela déclenchera deux requêtes, une pour récupérer les entités et une deuxième pour `compter tout` afin de déterminer le nombre total d'éléments pour la pagination. Le défilement infini n'a pas besoin d'informations sur la taille totale mais seulement s'il existe une page suivante à charger. Pour éviter la requête `compter tout`, qui peut être une opération coûteuse lorsqu'on travaille avec de grands ensembles de données, utilisez [Slice](http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Slice.html) au lieu de Page, ce qui améliorera les performances du défilement infini.

Nous utiliserons un en-tête HTTP personnalisé `X-Has-Next-Page` pour envoyer des informations au plugin de défilement infini côté front-end.

  * Définissez une nouvelle méthode dans votre référentiel d'entité:

```
Slice<YourEntity> findSliceBy(Pageable pageable);
```

  * Définissez une nouvelle méthode statique dans `PaginationUtil.java`  située dans le package `web/rest/util`

```
public static HttpHeaders generateSliceHttpHeaders(Slice<?> slice) {
  HttpHeaders headers = new HttpHeaders();
  headers.add("X-Has-Next-Page", "" + slice.hasNext());
  return headers;
}
```

  *Modifiez le contrôleur REST pour appeler Slice au lieu de Page et générer de nouveaux en-têtes HTTP.

```
@GetMapping("/<YourEntities>")
@Timed
public ResponseEntity<List<Repo>> getAllRepos(Pageable pageable)
    throws URISyntaxException {
    Slice<YourEntity> slice = repoRepository.findSliceBy(pageable);
    HttpHeaders headers = PaginationUtil.generateSliceHttpHeaders(slice);
    return new ResponseEntity<>(slice.getContent(), headers, HttpStatus.OK);
}
```

  * Définissez un nouveau modèle de vue dans   `entity.controller.js`

```
vm.hasNextPage = false;
```

  * Extrait la valeur de l'en-tête HTTP de la réponse et l'assigne au modèle de vue dans :

```
function onSuccess(data, headers) {
    vm.hasNextPage = headers('X-Has-Next-Page') === "true";
    ...
}
```

  * Utilisez le modèle de vue avec le plugin de défilement infini dans `<your-entities>.html`

```
<tbody infinite-scroll="vm.loadPage(vm.page + 1)" infinite-scroll-disabled="!vm.hasNextPage">
```
