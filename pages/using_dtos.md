---
layout: default
title: Utilisation des DTOs
permalink: /using-dtos/
redirect_from:
  - /using_dtos.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-28T23:41:00-00:00
---

# <i class="fa fa-briefcase"></i> Utilisation des DTOs

## Introduction

Par défaut, JHipster utilise ses objets de domaine (typiquement les entités JPA) directement dans ses points de terminaison REST.
Cela présente de nombreux avantages, le principal étant que le code est plus facile à comprendre car il contient moins de couches.

Cependant, pour des cas d'utilisation complexes, vous voudrez peut-être utiliser des objets de transfert de données (ou DTO) qui seront exposés par les points de terminaison REST. Ces objets ajoutent une couche supplémentaire au-dessus des objets de domaine et sont spécifiquement adaptés à la couche REST : leur principal avantage est qu'ils peuvent agréger plusieurs objets de domaine.

## Fonctionnement des DTOs dans JHipster

Lors de la génération d'une entité JHipster, vous avez la possibilité d'ajouter une couche de service : l'option DTO ne sera disponible que si vous choisissez d'avoir une couche de service, car elle nécessite cette couche pour gérer la correspondance (si vous utilisez JPA, cela est dû au fait que la couche de service est transactionnelle, donc le chargement paresseux fonctionnera).

Une fois que vous avez sélectionné d'avoir une couche de service, vous aurez la possibilité de générer un DTO pour l'entité. Si vous sélectionnez cette option :

- Un DTO sera généré et il sera mappé sur l'entité sous-jacente.
- Il agrégera les relations many-to-one, utilisant uniquement l'ID et le champ utilisé pour l'afficher dans votre framework côté client (Angular, par exemple). Ainsi, une relation many-to-one avec l'entité `User` ajoutera un champ `userId` et un champ `userLogin` au DTO.
- Il ignorera les relations one-to-many et many-to-many du côté non propriétaire : cela correspond à la façon dont fonctionnent les entités (elles ont une annotation `@JsonIgnore` sur ces champs).
- Pour une relation many-to-many du côté propriétaire : il utilisera des DTO de l'autre entité et les utilisera dans un `Set`. Ainsi, cela ne peut fonctionner que si l'autre entité utilise également des DTOs.

## Utilisation de MapStruct pour mapper les DTOs et les entités

Comme les DTOs ressemblent beaucoup aux entités, il est fréquent d'avoir une solution pour les mapper automatiquement entre elles.

La solution sélectionnée dans JHipster est d'utiliser [MapStruct](http://mapstruct.org/). Il s'agit d'un processeur d'annotations, branché sur le compilateur Java, qui générera automatiquement la correspondance requise.

Nous l'avons trouvé très propre et efficace, et nous avons aimé qu'il n'utilise pas la réflexion (ce qui est mauvais pour les performances lorsqu'il est utilisé aussi intensément que dans un mapper).

## Configuration de votre IDE pour MapStruct

MapStruct est un processeur d'annotations et, en tant que tel, il doit également être configuré pour être exécuté automatiquement lorsque votre IDE compile le projet.

Si vous utilisez Maven, vous devez activer le profil maven `IDE` dans votre IDE. Les utilisateurs de Gradle n'ont pas besoin d'appliquer quoi que ce soit de spécifique à l'IDE.

Les instructions pour activer le profil sont incluses dans [Configuring your IDE]({{ site.url }}/configuring-ide/).

## Utilisation avancée de MapStruct

Les mappers MapStruct sont configurés en tant que Beans Spring et prennent en charge l'injection de dépendances. Un bon conseil est que vous pouvez injecter un `Repository` dans un mapper, afin que vous puissiez récupérer une entité JPA gérée à partir du mapper, en utilisant son ID.

Voici un exemple de code, récupérant une entité `User` :

    @Mapper
    public abstract class CarMapper {

        @Inject
        private UserRepository userRepository;

        @Mapping(source = "user.id", target = "userId")
        @Mapping(source = "user.login", target = "userLogin")
        public abstract CarDTO carToCarDTO(Car car);

        @Mapping(source = "userId", target = "user")
        public abstract Car carDTOToCar(CarDTO carDTO);

        public User userFromId(Long id) {
            if (id == null) {
                return null;
            }
            return userRepository.findOne(id);
        }
    }