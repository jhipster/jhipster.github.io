---
layout: default
title: Faire du développement API-First
permalink: /doing-api-first-development/
redirect_from:
  - /doing-api-first-development.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-11T00:00:00-00:00
---

# <i class="fa fa-search"></i> Faire du développement API-First

Lors de la génération d'une application JHipster, vous pouvez choisir l'option `API first development using OpenAPI-generator` lorsqu'il vous est demandé de sélectionner des technologies supplémentaires.
Cette option configurera votre outil de build pour utiliser [OpenAPI-generator](https://github.com/OpenAPITools/openapi-generator) afin de générer du code API à partir d'un fichier de définition OpenAPI (Swagger).
Les formats Swagger v2 et OpenAPI v3 sont tous deux supportés.

### Raisons de l'approche API-First

Dans le développement API-First, au lieu de générer la documentation à partir du code, vous devez écrire la spécification en premier puis générer le code à partir de celle-ci.
Cela présente les avantages suivants :

- Vous pouvez concevoir votre API pour les consommateurs et non comme une conséquence de votre implémentation.
- Vous pouvez utiliser le fichier de spécification pour simuler vos nouveaux points de terminaison serveur avant leur sortie, ce qui permet de découpler davantage le développement frontend et backend.
- Vous n'avez pas besoin d'un serveur en direct pour utiliser votre documentation OpenAPI.

### Utilisation des plugins OpenAPI-generator

Le fichier de spécification OpenAPI se trouvera dans `src/main/resources/swagger/api.yml` et sera utilisé pour générer des interfaces de point de terminaison que vous pourrez implémenter.
Ces interfaces ont des méthodes par défaut qui répondent avec un statut HTTP `501 Not implemented` et un corps vide.
Écrivez votre spécification en utilisant un outil tel que [swagger-editor](http://editor.swagger.io), placez-la dans `src/main/resources/swagger/api.yml`, puis exécutez :
<pre>bash
    ./mvnw generate-sources
</pre>
Ou pour gradle :
<pre>bash
    ./gradlew openApiGenerate
</pre>
Ensuite, implémentez les interfaces "Delegate" générées dans `${buildDirectory}/generated-sources/openapi/src/main/java/${package}/web/api/` avec des classes `@Service`.

Exemple de code à écrire vous-même pour le célèbre [petstore](http://petstore.swagger.io) :



    @Service
    public class PetApiDelegateImpl implements PetApiDelegate {

        @Override
        public ResponseEntity<List<Pet>> findPetsByStatus(List<String> status) {
            return ResponseEntity.ok(
                status.stream()
                    .distinct()
                    .map(Pet.StatusEnum::fromValue)
                    .map(statusEnum -> new Pet().id(RandomUtils.nextLong()).status(statusEnum))
                    .collect(Collectors.toList())
            );
        }
    }



Si vous fournissez le bean `NativeWebRequest` à l'interface déléguée, alors des exemples de corps de réponse de base seront retournés pour les méthodes qui n'ont pas été remplacées (toujours avec un code HTTP 501).
Cela est utile pour simuler vos points de terminaison avant de fournir l'implémentation réelle.


    @Service
    public class PetApiDelegateImpl implements PetApiDelegate {

        private final NativeWebRequest request;

        public PetApiDelegateImpl(NativeWebRequest request) {
            this.request = request;
        }

        @Override
        public Optional<NativeWebRequest> getRequest() {
            return Optional.ofNullable(request);
        }

Vous pouvez alors obtenir les exemples
<pre>sh
    $ curl -X GET --header 'Accept: application/json' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
    {  "photoUrls" : [ "photoUrls", "photoUrls" ],  "name" : "doggie",  "id" : 0,  "category" : {    "name" : "name",    "id" : 6  },  "tags" : [ {    "name" : "name",    "id" : 1  }, {    "name" : "name",    "id" : 1  } ],  "status" : "available"}%
    $ curl -X GET --header 'Accept: application/xml' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
    <Pet>  <id>123456789</id>  <name>doggie</name>  <photoUrls>    <photoUrls>aeiou</photoUrls>  </photoUrls>  <tags>  </tags>  <status>aeiou</status></Pet>%
</pre>

Il est probable que votre IDE exclue, des sources, le dossier de sortie. Assurez-vous de recharger la configuration pour détecter les classes générées.
Cela peut être fait via l'interface utilisateur de votre IDE ou via une commande.

Lorsque vous utilisez Eclipse ou VSCode

* Avec maven
<pre> bash
    ./mvnw eclipse:clean eclipse:eclipse
</pre>
Lorsque vous utilisez IntelliJ
* Avec maven
<pre> bash
    ./mvnw idea:idea
</pre>

### Utilisation du sous-générateur `openapi-client`

JHipster prend également en charge la génération de code client en utilisant [Spring Cloud OpenFeign](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/) ou Spring Webclient pour les applications réactives en utilisant une spécification OpenAPI/Swagger.
Le client généré peut être utilisé dans les applications monolithiques et microservices et prend en charge les définitions Swagger v2 et OpenAPI v3. Pour invoquer ce sous-générateur, exécutez `jhipster openapi-client`.



