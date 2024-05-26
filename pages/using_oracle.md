---
layout: default
title:  Utilisation d'Oracle
permalink: /using-oracle/
redirect_from:
  - /using_oracle.html
sitemap:
    priority: 0.7
    lastmod: 2021-01-08T09:40:00-00:00
---

# <i class="fa fa-database"></i> Utilisation d'Oracle

Lorsque vous utilisez JPA, vous avez la possibilité d'utiliser la base de données Oracle.

_Cette option est uniquement prise en charge avec Oracle 12cR1 et ultérieur (par exemple, 19c, 18c et 12cR2)._

Lorsque vous utilisez Oracle avec JHipster, les limitations suivantes s'appliqueront en fonction de la version de la base de données Oracle.

Pour les versions 19c, 18c et 12cR2 :
- Les noms d'entité ne peuvent pas dépasser 124 caractères, cela est dû à la limitation de 128 caractères d'Oracle pour les noms d'objet, et nous réservons 4 caractères pour générer la séquence de clé primaire pour les tables générées.
- Les noms de champ d'entité ne peuvent pas dépasser 128 caractères.
- Lorsque vous créez des relations, les noms de clé étrangère ne peuvent pas dépasser 128 caractères, ils seront donc tronqués s'ils sont trop longs.
- Lorsque vous créez des relations many-to-many, le nom de la table de jointure suivra la spécification JPA (sous la forme "premièreTable_deuxièmeTable") : s'il dépasse 128 caractères, il sera tronqué.

Pour la version 12cR1 :
- Les noms d'entité ne peuvent pas dépasser 26 caractères, cela est dû à la limitation de 30 caractères d'Oracle pour les noms d'objet, et nous réservons 4 caractères pour générer la séquence de clé primaire pour les tables générées.
- Les noms de champ d'entité ne peuvent pas dépasser 30 caractères.
- Lorsque vous créez des relations, les noms de clé étrangère ne peuvent pas dépasser 30 caractères, ils seront donc tronqués s'ils sont trop longs.
- Lorsque vous créez des relations many-to-many, le nom de la table de jointure suivra la spécification JPA (sous la forme "premièreTable_deuxièmeTable") : s'il dépasse 30 caractères, il sera tronqué.

- Les mots clés réservés d'Oracle ne peuvent pas être utilisés comme noms d'entité ou noms de champ.

- Les images Docker de la base de données Oracle 19c (EE, SE2, instance unique et RAC) peuvent être trouvées ici : https://container-registry.oracle.com
- Les fichiers de construction Docker de la base de données Oracle 19c peuvent être trouvés ici : https://github.com/oracle/docker-images/tree/master/OracleDatabase

Notez que la version 19c est fortement recommandée car elle bénéficie d'une assistance à long terme (jusqu'en 2027).

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>