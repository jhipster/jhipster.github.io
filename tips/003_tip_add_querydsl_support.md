---
layout: default
title: Ajouter le support de Querydsl
sitemap:
priority: 0.5
lastmod: 2017-04-27T08:40:00-00:00
---

# Ajouter le support de Querydsl

__Conseil soumis par [@omrzljak](https://github.com/omrzljak), mis à jour par [@arnaud-deprez](https://github.com/arnaud-deprez)__

Dans certains cas, les [possibilités de requête](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries) de Spring Data ne sont pas suffisantes pour effectuer vos requêtes. Vous pouvez utiliser l'annotation `@Query` et [écrire les vôtres](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries.json-based). Certains d'entre nous aiment écrire des requêtes type safe comme le propose [Querydsl](http://www.querydsl.com/).

## Classes Predicate générées

Une partie importante de Querydsl sont les classes de domaine générées pour les requêtes, appelées Predicate. Dans le cas de spring-data-mongodb, elles sont générées par l'outil de post-traitement d'annotations Java.

## Plugin Gradle

Il existe également un plugin Gradle pour Querydsl qui prend en charge la configuration pour spring-data-mongodb.

## Plugin Maven

Il existe également un plugin pour Maven. La configuration de Maven est entièrement décrite dans le chapitre [Intégration Maven](http://www.querydsl.com/static/querydsl/latest/reference/html/ch02.html#d0e132) de la documentation. Vous devez également effectuer les étapes ci-dessous.

**Note**: N'incluez pas la dépendance `org.slf4j` car elle est incluse dans Spring Boot.

## Modifications

### build.gradle

Dans `build.gradle`, ajoutez la dépendance au `plugin Querydsl`

```gradle
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath "gradle.plugin.com.ewerk.gradle.plugins:querydsl-plugin:1.0.9"
    }
}

apply from: 'gradle/querydsl.gradle'
```
Définissez la  `version de Querydsl` à utiliser dans votre `gradle.properties`

```properties
querydsl_version=4.1.4
```

Ensuite, créez le fichier  `gradle/querydsl.gradle` avec

```groovy
apply plugin: "com.ewerk.gradle.plugins.querydsl"

sourceSets {
    main {
        java {
            srcDir "$buildDir/generated/source/apt/main"
        }
    }
}

querydsl {
    // we use mongodb
    springDataMongo = true
    querydslSourcesDir = "$buildDir/generated/source/apt/main"
}

dependencies {
    compile "com.querydsl:querydsl-mongodb:${querydsl_version}"
    compileOnly "com.querydsl:querydsl-apt:${querydsl_version}"
}
```

__Note__ nous utilisons MongoDB mais le plugin Querydsl prend également en charge [plus d'options](https://github.com/ewerk/gradle-plugins/tree/master/Querydsl-plugin).

Si vous exécutez`gradle build`,  vous verrez une sortie comme celle-ci :
`Note: Generating net.jogat.names.domain.QName for [net.jogat.names.domain.Name]`

Pour chaque classe de domaine annotée avec @Document, le plugin Querydsl générera une classe Predicate.

## Modifier les classes Repository

Si vous avez une classe de domaine par exemple `Name`,  alors vous avez aussi une classe `NameRepository` .Vous devez modifier chaque classe Repository pour qu'elle étende `QueryDslPredicateExecutor`.

    public interface NameRepository extends MongoRepository<Name, String>, QueryDslPredicateExecutor<Name> {}

Cela ajoutera des méthodes supplémentaires à votre classe de repository pour prendre en charge Querydsl  ([voir](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries.type-safe) )

## Support Web

Pour étendre le contrôleur REST afin de prendre en charge les requêtes paramétrées, vous devez ajouter  `com.mysema.query.types.Predicate` annoté avec  `org.springframework.data.querydsl.binding.QuerydslPredicate` aux paramètres de méthode :

    @RestController
    @RequestMapping("/api")
    class NameResource {

        private final NameRepository nameRepository;
        
        public NameResource(NameRepository nameRepository) {
            this.nameRepository = nameRepository;
        }

        @RequestMapping(value = "/names",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
        @Timed
        public ResponseEntity<List<Name>> getAllNames(@QuerydslPredicate(root = Name.class) Predicate predicate,
                                                        Pageable pageable) {
            log.debug("REST request to get a page of Name");
            Page<Name> page = nameRepository.findAll(predicate, pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/names");
            return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        }
        ...
    }

Également dans  `NameResourceIntTest`, vous devez prendre en charge  `QuerydslPredicateArgumentResolver`:

    public class NameResourceIntTest {
        ...
        @Autowired
        private NameRepository nameRepository;
        @Autowired
        private QuerydslPredicateArgumentResolver querydslPredicateArgumentResolver;

        @PostConstruct
        public void setup() {
            MockitoAnnotations.initMocks(this);
            NameResource nameResource = new nameResource(nameRepository);
            this.restNameMockMvc = MockMvcBuilders.standaloneSetup(nameResource)
                .setCustomArgumentResolvers(pageableArgumentResolver, querydslPredicateArgumentResolver)
                .setMessageConverters(jacksonMessageConverter).build();
        }
        ...
    }

Plus de détails peuvent être trouvés dans [la documentation](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#core.web.type-safe).

## Écrire des requêtes type safe

Les plugins Gradle ou Maven ont généré la classe QName qui peut être utilisée pour écrire des requêtes pour Name.class. Voici un exemple en Java :

```java
QName name = QName.name;

// compter tous les noms dont la liste "categories" contient la chaîne "TOP_EVER"
nameRepository.count(name.categories.contains("TOP_EVER"));
```
