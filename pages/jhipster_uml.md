---
layout: default
title: JHipster-UML
permalink: /jhipster-uml/
redirect_from:
  - /jhipster_uml.html
sitemap:
    priority: 0.5
    lastmod: 2017-11-27T12:00:00-00:00
---

# <i class="fa fa-magic"></i> JHipster-UML

Veuillez noter que ce projet est obsolète et ne devrait plus être utilisé.

Au lieu de cela, nous vous suggérons d'utiliser la fonction d'exportation JDL de ce projet pour exporter vos fichiers XMI vers un fichier JDL que vous pouvez utiliser et créer des modèles de vos entités avec JDL Studio.

Pour en savoir plus sur le JDL, rendez-vous [ici]({{ site.url }}/jdl/).

***

JHipster-UML est un sous-projet de JHipster qui peut être utilisé en remplacement de l'utilisation du [sous-générateur d'entités]({{ site.url }}/creating-an-entity/). L'idée est qu'il est beaucoup plus facile de [gérer les relations]({{ site.url }}/managing-relationships/) à l'aide d'un outil visuel que avec les questions et réponses classiques de Yeoman.

Le projet JHipster-UML est [disponible sur GitHub](https://github.com/jhipster/jhipster-uml/), c'est un projet Open Source comme JHipster (licence Apache 2.0). Si vous aimez ce projet, n'oubliez pas de nous donner une étoile sur GitHub!

Voici ce qui est couvert sur cette page :

1. [Introduction](#introduction)
2. [Problèmes et bogues](#issues)
3. [Installation](#install)
4. [Comment utiliser JHipster-UML](#howtouse)  
    4.1. [Le fichier UML](#umlfile)  
    4.2. [Utiliser JHipster-UML](#usejuml)  
    4.3. [Ce qui est généré](#whatsgenerated)  
    4.4. [Notes JHipster](#jhipsternotes)  
    4.5. [Mots réservés](#reservedwords)  
5. [Exemples](#examples)  
    5.1. [Modelio](#modelioexample)  
    5.2. [UML Designer](#umldesignerexample)  
    5.3. [GenMyModel](#genmymodelexample)  
    5.4. [Autres éditeurs](#othereditors)  
    5.5. [Énumérations](#enumerationexamples)  
    5.6. [Noms de table](#tablenames)  
    5.7. [Relations requises](#requiredrels)  
6. [Tests](#testing-juml)
7. [Contributions : problèmes et améliorations](#contributing)  
    7.1. [Modifications du parseur](#parsermodifications)
8. [Annexes](#annexes)

***

# Introduction

JHipster-UML est une alternative aux questions-réponses habituelles car elle vous offre la possibilité d'utiliser un éditeur UML pour créer un diagramme qui sera analysé par JHipster-UML.

Voici une liste des éditeurs que nous supportons :

  - [Modelio](https://www.modeliosoft.com/);
  - [UML Designer](http://www.umldesigner.org/);
  - [GenMyModel](https://www.genmymodel.com/) (non gratuit, mais en ligne).

***

<h1 id="issues">Problèmes et bogues</h1>

JHipster-UML est [disponible sur GitHub](https://github.com/jhipster/jhipster-uml), et suit les mêmes [directives de contribution que JHipster](https://github.com/jhipster/generator-jhipster/blob/main/CONTRIBUTING.md).

Veuillez utiliser notre projet pour soumettre des problèmes et des Pull Requests :

- [Suivi des problèmes de JHipster-UML](https://github.com/jhipster/jhipster-uml/issues)
- [Pull Requests de JHipster-UML](https://github.com/jhipster/jhipster-uml/pulls)

Lors de la soumission de quoi que ce soit, vous devez être aussi précis que possible :
  - **Un problème publié ne doit avoir qu'un seul problème** (ou une seule demande/question);
  - Les Pull Requests sont les bienvenues, mais les commits doivent être "atomiques" pour vraiment être compréhensibles.


Veuillez noter que l'utilisation de JHipster-UML (ou JHipster) peut être problématique (il faut installer certains outils pour utiliser correctement l'environnement Node sans problème). Ce [lien](https://gist.github.com/nullivex/7115612) peut vous aider si vous rencontrez un problème sous Windows.

Un autre problème pouvant être rencontré sous Windows est [celui-ci](https://stackoverflow.com/questions/30344858/node-script-executable-not-working-on-mac-env-node-r-no-such-file-or-directo#answer-30349952). Le lien fournit une solution pour résoudre ce problème si cela se produit.

Enfin, un problème a été signalé par un utilisateur Windows utilisant Git Bash. Les questions du générateur JHipster (d'InquirerJS) ne fonctionnaient pas (l'utilisateur était bloqué lors de la réponse aux questions). Vous pourriez utiliser Powershell ou un autre shell lors de l'utilisation de JHipster UML (ou JHipster).

***

<h1 id="install">Installation</h1>
Pour installer JHipster UML, utilisez la commande :

<dev>
   npm install -g jhipster-uml
</dev>

Cependant, si vous ne souhaitez pas installer la dernière version globalement parce qu'elle ne correspond pas à votre version du générateur (voir ci-dessous) ou si vous voulez qu'elle soit contenue localement, utilisez cette commande à la place :

<dev>
    npm install jhipster-uml --save-dev
</dev>

Si vous souhaitez la version 'à la pointe' (presque parfaitement sûre à utiliser), vous pouvez cloner notre dépôt git depuis [notre projet GitHub](https://github.com/jhipster/jhipster-uml) :

`git clone https://github.com/jhipster/jhipster-uml.git` pour HTTPS

`git clone git@github.com:jhipster/jhipster-uml.git` pour SSH

JHipster UML est un outil qui _peut_ être utilisé avec le générateur de JHipster. Si vous utilisez le générateur avant la version v3.0.0, alors vous devez utiliser JHipster UML v1.6.5 (dernière version corrective). Sinon, utiliser v2.0.0+ est le choix pour la version v3.0.0+ du générateur.

***

<h1 id="howtouse">Comment l'utiliser</h1>

Pour utiliser JHipster-UML, vous avez besoin d'un diagramme de classes exporté en XMI et JHipster-UML le parse pour créer vos entités.

<h2 id="umlfile">Le fichier UML</h2>

Le diagramme de classes doit modéliser les entités de votre domaine d'application JHipster, vous avez donc des restrictions à suivre.

### Entités
Chaque entité est représentée par une classe, ses champs sont les attributs de la classe. Un attribut doit avoir un type supporté par JHipster, sinon cela ne fonctionnera pas. Pour avoir des types supportés par JHipster comme “BigDecimal”, “LocalDate”..., vous pouvez créer un _PrimitiveType_ ou un _DataType_ pour cela.
Vous pouvez consulter les tableaux avec tous les types supportés par JHipster et les validations que vous pouvez utiliser pour chacun [ici](#annexes).

![Book Entity]({{ site.url }}/images/jhipsteruml_book_datatype.png)

Voici un exemple de classe correctement créée pour JHipster. Nous avons les attributs _publicationDate_ et price définis avec les types _BigDecimal_ et _LocalDate_ que nous avons créés comme _DataType._

Notez que vous n'avez pas besoin de capitaliser les noms de types (**sauf pour les noms composés comme BigDecimal**, JHipster-UML capitalise les noms).

### Relations
Nous utilisons les exemples de JHipster pour montrer comment le faire avec un éditeur.
Veuillez noter que nous **supportons uniquement** les relations listées sur la page [Gestion des relations]({{ site.url }}/managing-relationships/).

#### Un-à-Un
![Un-à-Un]({{ site.url }}/images/jhipsteruml_bi_oto.png)

Ici, nous avons une relation bidirectionnelle un-à-un entre Driver et Car, avec Driver comme propriétaire de la relation.

Si vous cherchez une relation unidirectionnelle :

![Un-à-Un2]({{ site.url }}/images/jhipsteruml_uni_oto.png)

Remarquez que pour obtenir une relation unidirectionnelle, nous avons supprimé le label `citizen` afin que `Passport` ne l'ait pas.

#### Un-à-Plusieurs
![Un-à-Plusieurs]({{ site.url }}/images/jhipsteruml_bi_otm.png)

Dans cette relation bidirectionnelle, un Owner peut avoir plusieurs cars, et une Car ne peut avoir qu'un seul owner.

Les relations unidirectionnelles pour les relations un-à-plusieurs ne sont pas (encore) supportées par JHipster (voir [cette page]({{ site.url }}/managing-relationships/#3) pour plus d'informations à ce sujet).
Voici un exemple d'une telle association :

![Un-à-Plusieurs2]({{ site.url }}/images/jhipsteruml_uni_otm.png)

#### Plusieurs-à-Un
Comme montré précédemment, l'équivalent d'une relation un-à-plusieurs est une relation plusieurs-à-un :

![Plusieurs-à-Un]({{ site.url }}/images/jhipsteruml_uni_mto.png)

Maintenant, les cars connaissent leur owner, mais pas l'inverse.

#### Plusieurs-à-Plusieurs
![Plusieurs-à-Plusieurs]({{ site.url }}/images/jhipsteruml_bi_mtm.png)

Ici, nous avons une relation plusieurs-à-plusieurs entre Car (le propriétaire) et Driver.

#### Déclarer le champ que vous souhaitez utiliser pour afficher une relation dans Angular
Pour ce faire, vous devez ajouter le nom du champ entre `(``)` après le nom du champ injecté.

Dans une relation un-à-plusieurs, vous pouvez l'ajouter dans le côté 'Plusieurs' de la relation :

- UML

![otherEntityField Un-à-Plusieurs]({{ site.url }}/images/jhipsteruml_otherEntityFieldOM.jpeg)

- JDL

![otherEntityField Un-à-Plusieurs]({{ site.url }}/images/jhipsteruml_otherEntityFieldOM.jpeg)

- JDL

      relationship OneToMany {
        One{many} to Many{one(<otherEntityField>)}
      }

Dans une relation plusieurs-à-plusieurs, vous pouvez l'ajouter dans le côté propriétaire de l'entité :

- UML

![otherEntityField Plusieurs-à-Plusieurs]({{ site.url }}/images/jhipsteruml_otherEntityFieldMM.jpeg)

- JDL

      relationship ManyToMany {
        Owner{notOwner(<otherEntityField>)} to NotOwner{owner}
      }



#### Cas de réflexivité
![Réflexivité]({{ site.url }}/images/jhipsteruml_reflexivity.png)

Comme vous pouvez le voir, il existe 3 types de réflexivité. JHipster-UML ne supporte que les deux premiers (un-à-un et un-à-plusieurs). Le cas plusieurs-à-plusieurs n'est **pas** supporté parce que :

- Cela peut conduire à des modèles trop complexes et erronés;
- JHipster ne le supporte pas (c'est une bonne chose).

### Un exemple complet
Nous utilisons un diagramme de l'exemple HR d'Oracle disponible [ici](https://docs.oracle.com/cd/B28359_01/server.111/b28328/diagrams.htm#G5482).

Voici une capture d'écran d'un tel diagramme (de Modelio) :
![Diagramme UML HR]({{ site.url }}/images/jhipsteruml_overviewdiagram.png)

Comme vous pouvez le voir, nous l'avons modifié pour le rendre un peu plus intéressant.
JHipster peut générer des entités et des associations entre elles (un-à-un, un-à-plusieurs, etc.), et dans cet exemple, nous avons ajouté tous les types d'associations (même la réflexivité et l'héritage). JHipster ne supporte pas encore l'héritage (mais la réflexivité est supportée par JHipster, avec un avertissement), mais nous avons décidé de l'inclure dans l'exemple afin d'avoir une base solide pour travailler.

<h2 id="usejuml">Utiliser JHipster-UML</h2>

Une fois que vous avez configuré votre application JHipster et votre diagramme de classes dans un éditeur UML, suivez ces étapes :

- étape 1 - exportez votre diagramme de classes au format de fichier XMI

- étape 2 - dans le dossier racine de votre application JHipster, exécutez la commande

 `jhipster-uml <your_file.xmi>`

Notez que vous n'avez pas besoin de fournir le type de base de données (sql, mongodb, ou cassandra), car JHipster-UML détecte le type pour vous (à partir du fichier _.yo-rc.json_).

Si, cependant, vous souhaitez exécuter JHipster-UML en dehors d'une application JHipster, vous devez passer un argument supplémentaire : le nom du type de base de données.
Voici la commande à exécuter :

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)]`

Les DTOs JHipster peuvent également être générés, passez l'argument `--dto` pour activer cette fonctionnalité.

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--dto]`

Vous pouvez choisir la pagination pour vos entités en utilisant `--paginate`.

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--paginate]`

Enfin, vous pouvez choisir le service pour vos entités en utilisant `--service`.

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--service]`

**Veuillez noter que l'utilisation de l'option `paginate` et de ne sélectionner aucune entité pour générer la pagination annule votre choix d'utiliser cette option.**

Enfin, si vous avez besoin d'aide, il y a une commande pour cela aussi :

 `jhipster-uml --help`

* étape 3 - c'est tout !

**Remarque : Si vous souhaitez utiliser les classes et méthodes disponibles, le point d'entrée préféré de JHipster-UML est le ParserFactory (de sorte que vous n'ouvrez pas le fichier, ne le lisez pas, ne trouvez pas l'élément racine, etc.).**

<h2 id="jumlfile">Fichier JHipster-UML</h2>

JHipster-UML peut être configuré par la ligne de commande et/ou par un fichier de configuration basé sur JSON, le `jumlfile`.
Les options décrites dans l'aide peuvent être utilisées dans les deux, mais la ligne de commande prend le pas sur le `jumlfile`.




### Un Exemple Concret

Contenu du fichier jumlfile :
```json
{
  "db": "sql",
  "force": "true"
}
```
Appel:
```
jhipster-uml --no-force
```
Vous aurez les options suivantes :
- db : sql
- force : false (sans force)

<h2 id="whatsgenerated">Ce qui est généré</h2>

Après l'exécution de JHipster-UML, le dossier _.jhipster_ sera créé (s'il n'existait pas auparavant) et rempli avec les entités présentes dans le fichier XMI au format JSON.

Veuillez noter qu'au moins une entité peut ne pas être générée : l'entité User. Elle est en fait scaffolée par JHipster lors de la création d'une nouvelle application (et un message d'avertissement est affiché par JHipster-UML).

Ensuite, c'est assez simple : exécutez votre application !

<h2 id="jhipsternotes">Notes sur JHipster</h2>

JHipster est un excellent outil de scaffolding avec de nombreuses conventions, certaines d'entre elles méritent d'être mentionnées lors de la génération d'entités avec JHipster-UML :

  - Vous n'avez pas à utiliser un champ `id` dans vos entités car JHipster en génère un par défaut, et JHipster-UML supprime tout champ s'il est détecté comme un ID ;
  - Vous n'avez pas à utiliser la forme plurielle dans vos relations, JHipster ajoute un `s` lorsque c'est nécessaire. Par exemple, s'il y a une relation many-to-many entre l'entité A et l'entité B, vous n'avez pas à nommer l'extrémité de la relation `as` ou `bs` car JHipster le fera pour vous.

<h2 id="reservedwords">Mots réservés</h2>

JHipster maintient une liste de mots interdits (*dans certaines conditions*).
Par exemple, si vous voulez générer des entités pour votre application, et si cette application utilise Cassandra, vous ne pouvez pas utiliser les mots `BATCH` dans un nom de champ ou de table.

À partir de la version 2.0.0, JHipster UML détecte de tels mots et lance immédiatement une exception s'il rencontre un tel cas. Cependant, JHipster UML ne peut pas garantir avec 100% d'exactitude quand un mot réservé peut ou ne peut pas être utilisé. C'est pourquoi il avertit l'utilisateur avec un message jaune lorsqu'il pourrait y avoir un risque d'utiliser un tel mot-clé.

***

<h1 id="examples">Exemples</h1>

Chaque éditeur sera discuté ici, afin que vous sachiez comment obtenir un bon fichier XMI.

**Note : JHipster-UML peut détecter les fichiers XMI défectueux, il affichera la première erreur qu'il trouve et quittera immédiatement (comportement de type "fail-fast").**

Dans JHipster-UML, chaque éditeur a été testé avec l'exemple Oracle. Si vous souhaitez voir les exemples dans un "projet factice", vous devez télécharger ces fichiers pour chaque éditeur, et tester JHipster et JHipster-UML :
  - Pour Modelio : [modelio.xmi](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/modelio.xmi) ;
  - Pour UML Designer : [umldesigner.uml](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/umldesigner.uml) ;
  - Pour GenMyModel : [genmymodel_evolve.xmi](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/genmymodel_evolve.xmi).

<h2 id="modelioexample">Modelio</h2>

**Remarque pour les utilisateurs Mac : Modelio se comporte étrangement sur Mac (l'interface graphique), cela peut être causé par les graphiques et le gestionnaire de fenêtres sur Mac, car cela n'a pas été diagnostiqué sur Linux Ubuntu. Cela fonctionne, mais l'interaction peut ne pas être agréable.**

**Notes de version importantes :**
  - Modelio v3.3 est testé et fonctionne, cependant, un bogue existe dans v3.4 empêchant l'utilisateur d'exporter le diagramme. Ce bogue est corrigé à partir de v3.4.1.
  - Modelio v3.5.X introduit un bogue lors de la manipulation des relations many-to-many bidirectionnelles (l'erreur lorsque JHipster UML analyse le XMI est `Cannot read property '0' of undefined`). Ce problème semble avoir été résolu dans les versions ultérieures (v3.6.X).



Modelio peut être téléchargé gratuitement [ici](https://www.modelio.org/). Assurez-vous d'avoir Java 8 si vous téléchargez l'une des versions 3.3+ (sinon cela ne fonctionnera pas).

Le fichier exemple est [ici](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/modelio.xmi).

Une fois lancé, créez un projet et vous verrez cette vue :

![Projet Modelio vide]({{ site.url }}/images/jhipsteruml_modelio_1.png)

Remarquez le panneau de gauche intitulé 'Modèle de classe'. Vous n'avez besoin que des objets 'Classe', 'Attributs', 'Agrégation', 'Composition' et 'Type de données'.
Vous pouvez déjà deviner pourquoi vous avez besoin des deux premiers. L'objet 'Agrégation' est utilisé pour définir des agrégations :
B est agrégé à A signifie que A a 0, 1 ou plusieurs (n) instances de B. A ne crée pas (et ne détruit pas) les instances de B.
La composition signifie que si A est composé de B (0, 1, ou n instances), alors il crée, gère et détruit les instances de B.

Vous pouvez utiliser l'un ou l'autre, le parseur verra les deux comme des associations de toute façon.

Dans les deux situations, les cardinalités et les noms d'association sont importants.

Enfin, les objets 'Types de données' vous permettent de créer des types personnalisés (des types qui ne sont pas proposés par Modelio), comme `BigDecimal`, ou `LocalDate`.

Dans cet exemple, nous expliquerons comment connecter deux classes :

![Exemple de composition dans Modelio]({{ site.url }}/images/jhipsteruml_modelio_2.png)

Comme vous pouvez le voir, l'employé a un emploi (mais peut aussi ne pas avoir d'emploi du tout). Le parseur remarquera quelques choses :

  - Deux classes (Employé et Emploi) ;

  - Deux champs (email et titre), leur type, à quelle classe ils appartiennent (chaque classe contient ses champs). Leur visibilité n'est pas prise en compte ;

  - L'association les reliant et la **direction** de l'association (c'est important !) ;

  - Les cardinalités (1 et 0..1) signifient qu'un employé peut avoir un emploi (0 ou 1), et un emploi n'est pas partagé par deux employés (uniquement un, pour l'exemple) ;

  - Il y a un **champ injecté** : emploi, dans employé.

Cette association est appelée une relation un à un. Revenez quelques sections en arrière pour voir les autres types d'associations.

Modelio prend en charge les contraintes. Double-cliquez sur un champ, allez dans l'onglet 'Notes et contraintes', le premier icône devrait alors être 'Ajouter une contrainte', puis sélectionnez 'Contrainte', double-cliquez sur la contrainte, et donnez-lui un nom (ce devrait être l'une des contraintes JHipster). Pour la valeur de la contrainte, entrez-la dans le champ 'Corps'.

Enfin, une fois votre diagramme terminé, vous devez l'exporter.

![Exporter vers XMI dans Modelio]({{ site.url }}/images/jhipsteruml_modelio_3.png)

Vérifiez la perspective Modèle, une fois que vous avez localisé votre projet, descendez d'un niveau et cliquez avec le bouton droit sur le dernier élément (le nom du projet en minuscules), XMI, Exporter XMI. Une fenêtre devrait s'ouvrir, sélectionnez le chemin de sortie, changez la compatibilité en OMG UML2.4.1, laissez l'extension en XMI et vous êtes prêt à partir.


### Commenter

Pour commenter une classe (ou un attribut), double-cliquez sur l'élément, sélectionnez l'onglet `Notes et contraintes`, et ajoutez une `note`.

![Commenter dans Modelio]({{ site.url }}/images/jhipsteruml_modelio_commenting.png)

Veuillez noter qu'il n'est pas possible de commenter les relations avec cet éditeur.


<h2 id="umldesignerexample">UML Designer</h2>

UML Designer peut être téléchargé [ici](http://www.umldesigner.org/).
Il fonctionne de la même manière qu'Eclipse.
Pour créer un projet vide, cliquez sur Fichier -> Nouveau -> Projet de modélisation. Entrez le nom, et validez.
Si aucun fichier.uml n'est créé, cliquez avec le bouton droit sur votre projet, puis Nouveau -> Autre -> UML Designer -> Modèle UML, et entrez le nom que vous voulez.

Le fichier XMI exemple est disponible [ici](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/umldesigner.uml).

Vous serez alors présenté par une vue comme celle-ci :

![Tableau de bord UML Designer]({{ site.url }}/images/jhipsteruml_umldesigner_1.png)

Double-cliquez sur 'Diagramme de classe' sous la catégorie 'Conception'.
Vous pouvez maintenant voir sur la droite la 'Palette'. Vous n'avez besoin que de ces objets : 'Classe', 'Type primitif', 'Type de données' (tous deux sous 'Énumération'), 'Composition' et 'Agrégation' (tous deux sous 'Association').

Avec UML Designer, vous pouvez créer des types personnalisés en utilisant soit un Type de données, soit un Type primitif (le parseur reconnaît les deux).

Voici un exemple utilisant cet éditeur :

![Employé et Emploi avec UML Designer]({{ site.url }}/images/jhipsteruml_umldesigner_2.png)

Pour créer des attributs, double-cliquez sur la classe et ajoutez votre attribut. Vous pouvez importer des types en cliquant avec le bouton droit quelque part sur le diagramme (dans l'espace blanc), puis importer des Types primitifs, puis sélectionnez UML et Java.
Cela vous évitera la _corvée_ de créer des types manuellement (avec des Types de données ou des Types primitifs).

Malheureusement, UML Designer ne prend pas encore en charge les contraintes.


Une des choses agréables que UML Designer offre, c'est que vous n'avez pas besoin d'exporter vers XMI. Allez dans votre espace de travail et vous verrez que le projet enregistré est déjà dans le bon format, donc c'est plutôt cool.

## Relations unidirectionnelles

Cet éditeur prend en charge les relations unidirectionnelles. Pour cela, créez la relation que vous souhaitez entre vos deux classes, double-cliquez sur la relation et ajustez-la.


### Commenter

Il est possible de commenter les classes et les attributs (pas les relations) : cliquez sur un élément, et sélectionnez `comment` pour ajouter le vôtre.

![Uml Designer, commenter]({{ site.url }}/images/jhipsteruml_umldesigner_commenting.png)


<h2 id="genmymodelexample">GenMyModel</h2>

GenMyModel est un éditeur UML en ligne que vous pouvez trouver [ici](https://dashboard.genmymodel.com/). Vous pouvez l'utiliser gratuitement mais avec des restrictions, nous espérons que cet éditeur permettra aux utilisateurs de manipuler JHipster-UML sans contrainte de téléchargement d'une application.

L'exemple de fichier XMI se trouve [ici](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/genmymodel_evolve.xmi).

Après vous être inscrit, allez dans Projets -> Nouveaux projets, donnez lui un nom, choisissez UML comme type de modèle, choisissez Diagramme de classe comme diagramme par défaut, puis cliquez sur Créer projet.
Ensuite, cet écran s'affichera :

![GenMyModel dashbord]({{ site.url }}/images/jhipsteruml_genmymodel_empty_diagram.png)

Sur le panneau à gauche de la grille, se trouvent tous les éléments possibles pour créer un diagramme. Nous aurons seulement besoin des éléments 'Class', 'DataType', 'Attribute', 'Aggregation' et 'Composition'. Vous pouvez utiliser soit 'Aggregation' soit 'Composition', l'analyseur ne verra que l'association entre deux classes et sa cardinalité.

Voici un exemple de création de deux entités avec une relation de un-à-plusieurs entre elles et la déclaration des types JHipster à travers 'DataType':

![GenMyModel diagram]({{ site.url }}/images/jhipsteruml_genmymodel_relation.png)

L'analyseur remarquera quelques choses :

  - Deux classes, 'Author' et 'Book'.

  - Deux DataTypes, 'LocalDate' et 'BigDecimal'.

  - Attributs, vous pouvez définir le type avec les types par défaut, ou avec les DataTypes déclarés.

  - Une agrégation entre 'Author' et 'Book' (la direction compte !).

  - Deux champs injectés 'author' dans Book et 'book' dans Author.

  - Les cardinalités (1 et 0..\*) signifient qu'un Book peut avoir un auteur et qu'un Author peut avoir plusieurs livres, ce qui correspond à une relation de un-à-plusieurs entre Author et Book.

Malheureusement, vous ne pouvez pas créer de contraintes personnalisées pour les attributs pour correspondre aux contraintes JHipster.

Une fois le diagramme terminé, vous pouvez l'exporter vers XMI. Pour cela, cliquez sur Outil -> Exporter comme UML (XMI)


### Relations unidirectionnelles

Dans GenMyModel, créer des relations unidirectionnelles est assez simple : supprimez le nom du champ que vous ne voulez pas et vous êtes prêt à partir.

Par exemple, prenez ce cas :

![GenMyModel, unidirectional]({{ site.url }}/images/jhipsteruml_genmymodel_unidirectional.png)

Ici, `MyClass` aura un attribut `myClass2`, mais `MyClass2` n'aura pas de champ `myClass`.


### Commenter

La possibilité de commenter est disponible pour les classes, les attributs et les champs de relation.

Cliquez sur un élément et écrivez un commentaire dans le champ de description.

![GenMyModel, commenting]({{ site.url }}/images/jhipsteruml_genmymodel_commenting.png)


<h2 id="#othereditors">Autres éditeurs</h2>

### Sparx EA

Le support pour cet éditeur a été ajouté par Guillaume Finance.
Voici le [repo](https://github.com/guillaumefinance/MDG-Sparx-EA-UML-JHipster), et vous pouvez lire la présentation [ici](http://www.umlchannel.com/en/enterprise-architect/item/204-mdg-viseo-ea-uml-to-jhipster-generator-jdl-uml-model-sparx-enterprise-architect).


<h2 id="enumerationexamples">Énumérations</h2>

JHipster et JHipster UML supportent tous deux les énumérations.
Voici comment les définir :
  - Pour Modelio, faites glisser et déposez l'objet `Enumeration` quelque part. Enfin, ajoutez l'objet `Enumeration Literal` à l'énumération pour l'ajouter ;
  - Pour UML Designer, il y a l'objet `Enumeration` qui peut être placé et utilisé. Cependant, le littéral ne s'appelle pas `Enumeration Literal` mais seulement `Literal`;
  - GenMyModel possède les objets nécessaires : `Enum` et `Enum Literal` dans le panneau d'objets principal (sur le côté gauche de l'écran).

<h2 id="tablenames">Noms de tables</h2>

Depuis la version 1.6.2, il est maintenant possible de spécifier des noms de table pour les entités.

Pour cela, il faut spécifier le nom de la table avec le nom de la classe comme ceci :

![tablenameimage](https://i.imgur.com/ECdb1bx.png)

La convention `<NOM_ENTITÉ>\s*(<NOM_TABLE>)` est universelle quel que soit l'éditeur.

Cependant, si vous ne voulez pas choisir un nom de table dédié, vous pouvez écrire le nom de la classe. JHipster UML se chargera de le convertir en un nom de table approprié. Par exemple, si le nom de votre classe est `MyClass`, alors votre nom de table serait `my_class`.

Notez que cette fonctionnalité est disponible pour les éditeurs UML depuis la v1.6.2

<h2 id="requiredrels">Relations requises</h2>

À partir de la version 2.0.0, il est possible de créer des relations requises.
Pour en spécifier une, assurez-vous que la fin de la relation à rendre requise n'est pas "0" ("1" ou "*" feront l'affaire).
Pour voir un exemple, souvenez-vous de l'exemple complet de HR d'Oracle, et remarquez que la classe JobHistory a 3 relations requises.

***

<h1 id="testing-juml">Test de JHipster-UML</h1>

Les tests sont disponibles dans le dossier de test et peuvent être exécutés via `npm test`.
Nous utilisons Mocha pour les tests (ainsi que chai et expect de chai).

Si vous le souhaitez, une commande alternative pour exécuter les tests, ou exécuter uniquement les tests que vous souhaitez, est : `mocha`.
Veuillez noter que vous devez être dans le répertoire racine pour que cette commande fonctionne, et vous devrez peut-être installer globalement mocha avec `npm install -g mocha` (ou utiliser le fichier dans le dossier node_modules, qui est disponible si vous faites `npm install` dans le répertoire de JHipster-UML).
Si, cependant, vous ne voulez pas tout installer globalement, exécutez :

- `npm install` pour installer la dépendance mocha,
- `./node_modules/mocha/bin/mocha` pour exécuter les tests, veuillez noter que vous devrez peut-être utiliser le `\` sur certains systèmes d'exploitation "exotiques".

***

<h1 id="contributing">Contribuer : problèmes et améliorations</h1>

Parce que notre outil n'est pas encore parfait, vous pouvez remarquer quelques irrégularités. GitHub propose un tracker de problèmes assez sympa pour que tout le monde puisse signaler un problème.
Nous suivons les mêmes directives que JHipster, avec quelques ajouts :

  - Les bugs trouvés en interne (par l'équipe JHipster-UML) peuvent être signalés dans le tracker de problèmes, sauf pour les bugs concernant les éditeurs UML pris en charge.

  - Il en va de même pour les améliorations.

<b>Note : Postez des PR et des problèmes sur la page github de JHipster-UML, [ici](https://github.com/jhipster/jhipster-uml). Pas sur la page principale de JHipster.</b>

<h2 id="parsermodifications">Modifications du parseur</h2>

La version 1.0.0 apporte un nouveau système de parseur rendant toute modification (création de parseur, mise à jour, suppression) sans problème, à condition que le XMI puisse être analysé.


### Ajout d'un parseur

#### Implémentation du parseur

Si vous êtes un développeur Java, vous êtes probablement assez familier avec les principes de la POO (nous l'espérons en tout cas). Lors du développement de JHipster-UML, nous avons pensé à son architecture comme nous le ferions normalement en Java.

Vous devez "étendre" notre parseur abstrait ([AbstractParser](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/abstract_parser.js)), ou implémenter notre interface ([Parser](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js)) pour ajouter votre implémentation concrète d'un parseur.

Vous remarquerez que certaines méthodes de l'interface Parser lancent une _UnimplementedOperationException_. Cette idée est reprise de Java, et vous pouvez implémenter ces méthodes dans votre parseur concret.

Certaines méthodes ne lancent aucune exception, mais appellent seulement d'autres méthodes. Si vous êtes familier avec Java 8, nous avons copié ses superbes méthodes par défaut, et fait de même (pour que vous ne les implémentiez pas manuellement).

Comme en Java, vous pouvez substituer n'importe quelle méthode que vous voulez, et créer les vôtres. Vous n'êtes pas limité (sauf si vous voulez surcharger).

La classe AbstractParser fournit certains champs, un constructeur par défaut et quelques méthodes pour que vous n'ayez pas à les créer ou à les implémenter plus tard.

Vous devriez implémenter chacune de ces méthodes (ou substituer les méthodes [#parse](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js#L13) ou [#findElements](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js#L25)).

Les getters ne sont pas obligatoires, mais servent à obtenir certains champs importants et fournissent un moyen de les modifier avant de les envoyer.


#### Détection de l'éditeur

Lorsque vous avez terminé de créer votre nouveau parseur brillant, vous devez l'ajouter à la "liste" des éditeurs disponibles :

- Requiert d'abord comme [ici](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L3);

- Rendez-le disponible comme [ici](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L9);

- Ajoutez-le à la liste comme [ici](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L16).

Cependant, quelques directives doivent être respectées :

- Le nom de votre parseur doit être \<éditeur_parser\>;

- Le fichier JS de l'éditeur ne doit pas être en majuscules, et ne doit pas contenir d'espaces blancs, (Modelio -> `modelio_parser.js`, UML Designer -> `umldesigner_parser.js`);

- Le nom de classe de l'éditeur doit être en majuscule (Modelio -> `ModelioParser`, UML Designer -> `UMLDesignerParser`).
En ce qui concerne le détecteur d'éditeur, il peut détecter l'éditeur qui a créé votre fichier XMI. Pour que cela se produise, vous devez d'abord localiser où l'éditeur est mentionné dans le fichier XMI, puis ajouter le code qui retourne votre éditeur comme [ici](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L23). Si votre éditeur ne peut pas être détecté, ajoutez-le [ici](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L23), et indiquez son nom comme cela a été fait pour UML Designer [ici](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L56).


#### Test

Enfin, la prochaine chose que vous devrez faire avant de commettre votre super parseur est de le tester.
Parce que nous croyons au test, mais nous aimons vraiment les bons tests (avec BDD), nos tests sont réalisés avec Mocha et chai. Si vous ne savez pas de quoi il s'agit, nous vous recommandons de visiter la page [ChaiJS](http://chaijs.com/) et de voir [l'un](https://github.com/jhipster/jhipster-uml/blob/master/test/editors/modelio_parser_test.js) de nos fichiers de test pour vous familiariser avec cela.

Vous vous demandez probablement quelle forme de test vous devriez utiliser. La réponse est : c'est à vous de choisir ! Que ce soit [should](http://chaijs.com/guide/styles/#should) ou [expect](http://chaijs.com/guide/styles/#expect) (à la RSpec), nous n'imposons aucune règle ici. Nous recommandons cependant d'utiliser Expect parce que nous le faisons, et cela devrait rendre les tests plus faciles à comprendre.

Nous voulons simplement que vous testiez tout ce qui est "digne de test" :

  - Les méthodes de l'interface (les méthodes _public_ pas une classe d'interface !);

  - Vous n'êtes pas obligé de tester les autres méthodes (_privées_), car elles sont censées être sûres et changer à court/long terme, mais comme la visibilité n'est pas implémentée en JS (à notre connaissance), vous pouvez vouloir les tester (c'est à vous de voir).

Les directives générales pour les noms et les fichiers :

  - Le nom de votre fichier de test doit respecter les mêmes règles que celles précédemment mentionnées. Par exemple, si le nom de votre parseur est "Modelio", alors votre fichier de test doit être `modelio_parser_test.js`.

  - Il en va de même pour les fichiers XMI utilisés pour les tests. Si le nom de votre parseur est UMLDesigner, alors l'un de vos fichiers XMI de test peut s'appeler `umldesigner_parser_problem_test.[...]` (l'extension de fichier n'est pas statique).


### Modification d'un parseur

Modifier un parseur (et ensuite commettre le changement) est assez simple : faites le changement et testez-le (créez des tests si nécessaire).

Vous pouvez créer un fichier XMI si vous avez besoin qu'un test réussisse (lancer une exception ou non, etc.).

N'oubliez pas de modifier le [détecteur d'éditeur](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js) si vous changez un nom.


### Suppression d'un parseur

Tout d'abord, supprimez-le des éditeurs (`editors/editors.js`) puis supprimez-le du détecteur d'éditeur (`editors/editor_detector.js`). Enfin, supprimez le fichier du parseur et le test créé pour celui-ci.

N'oubliez pas de modifier le [détecteur d'éditeur](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L38) si vous supprimez un parseur.

***

<h1 id="annexes">Annexes</h1>

Voici les types pris en charge par ce projet :

<table class="table table-striped table-responsive">
  <tr>
    <th>SQL</th>
    <th>MongoDB</th>
    <th>Cassandra</th>
    <th>Validations</th>
  </tr>
  <tr>
    <td>String</td>
    <td>String</td>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td>Integer</td>
    <td>Integer</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td>Long</td>
    <td>Long</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td>Float</td>
    <td>Float</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td>Double</td>
    <td>Double</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td>Enum</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>required</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td>LocalDate</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Date</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td>ZonedDateTime</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>UUID</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td>Blob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td>AnyBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td>ImageBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td>TextBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
</table>
