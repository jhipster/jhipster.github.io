---
layout: default
title: Boost infinite scroll performance with Slice
sitemap:
priority: 0.5
lastmod: 2016-11-12T22:22:00-00:00
---

# Boost performance of pagination with infinite scrolling using Slice

__Tip submitted by [@nkolosnjaji](https://github.com/nkolosnjaji)__

Pagination with infinite scrolling is using Spring Data Page to retrieve entities from your database.
This will trigger two queries, one to fetch entities and second for `count all` to determine the total items for paging. Infinite scrolling doesn't need information about the total size but only if there is a next page to load. To avoid `count all` query which can be an expensive operation when working with large datasets, use [Slice](http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Slice.html) instead of Page which will boost performance of infinite scrolling.

We will use a custom HTTP header `X-Has-Next-Page` to send information to front-end infinite-scroll plugin.

  * Define new method in your Entity repository:

```
Slice<YourEntity> findSliceBy(Pageable pageable);
```

  * Define new static method in `PaginationUtil.java` located in `web/rest/util` package

```
public static HttpHeaders generateSliceHttpHeaders(Slice<?> slice) {
  HttpHeaders headers = new HttpHeaders();
  headers.add("X-Has-Next-Page", "" + slice.hasNext());
  return headers;
}
```

  * Modify REST controller to call Slice instead of Page and generate new HTTP headers.

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

  * Define new view model in `entity.controller.js`

```
vm.hasNextPage = false;
```

  * Extract HTTP header value from response and assign it to view model in

```
function onSuccess(data, headers) {
    vm.hasNextPage = headers('X-Has-Next-Page') === "true";
    ...
}
```

  * Use view model with infinite-scroll plugin in `<your-entities>.html`

```
<tbody infinite-scroll="vm.loadPage(vm.page + 1)" infinite-scroll-disabled="!vm.hasNextPage">
```
