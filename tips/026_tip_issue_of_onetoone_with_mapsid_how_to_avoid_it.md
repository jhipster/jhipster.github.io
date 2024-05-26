---
layout: default
title: Problème de @OneToOne avec @MapsId et comment l'éviter
sitemap:
priority: 0.1
lastmod: 2019-03-05T18:20:00-00:00
---

# Problème de @OneToOne avec @MapsId et comment l'éviter

__Conseil soumis par [@pmverma](https://github.com/pmverma)__

Voici un problème connu concernant l'utilisation de `@OneToOne` avec `@MapsId` et quelques conseils pour l'éviter.
### Le problème
Supposons que vous ayez une classe `Preference` que vous avez associée à `User` avec `@OneToOne @MapsId`.

```
class Preference {
        @OneToOne
        @MapsId
        private User user;
}
```
Normalement avec JHipster :
1. Lorsque vous ajoutez une `préférence` pour un utilisateur, vous remplissez les données et sélectionnez un utilisateur `user01` dans la liste déroulante, puis enregistrez.
2. Si vous souhaitez modifier la même `préférence`, vous avez toujours la possibilité de sélectionner un utilisateur, et si vous sélectionnez `user02` cette fois, alors côté backend, l'objet `préférence` aura `user02` pour toute la durée de la requête.
3. Si vous rechargez à nouveau la même `préférence`, vous verrez que `user01` est toujours là, pas `user02`.

La partie incorrecte ici est :
 **`user02` dans l'objet `préférence` à l'étape no.2.** L'objet utilisateur dans la `préférence` devrait toujours se référer à `user01`.
 
 Pour plus d'informations, consultez [https://github.com/jhipster/generator-jhipster/issues/9100](https://github.com/jhipster/generator-jhipster/issues/9100)
 
 ### Conseils pour l'éviter
 
 * Masquez la liste déroulante et définissez l'utilisateur actuel dans la `préférence` **côté client** de manière programmative. (Encore une fois, ce type de solution n'est valable que pour les entités telles que Preference, Settings, User Profile, etc., où il n'a pas de sens d'avoir une liste déroulante pour choisir l'utilisateur.)
 * Masquez la liste déroulante et définissez l'utilisateur actuel dans la `préférence` **côté serveur** de manière programmative. (Encore une fois, ce type de solution n'est valable que pour les entités telles que Preference, Settings, User Profile, etc., où il n'a pas de sens d'avoir une liste déroulante pour choisir l'utilisateur. JHipster a déjà fourni une méthode pour obtenir l'utilisateur actuel.)
 * Validez et chargez la valeur d'association correcte avant de faire toute logique métier sur cet utilisateur. (Encore une fois, ceci est nécessaire uniquement si votre logique dépend de `preference.getUser()`)
 * Si vous utilisez Hibernate 5.4.2 et ultérieur, vous obtiendrez la valeur d'association correcte mais seulement après la fin de l'opération de fusion d'entité. Donc, si votre logique métier est exécutée avant l'opération de fusion d'entité, vous devez en prendre soin sinon vous pourriez obtenir des résultats incorrects.