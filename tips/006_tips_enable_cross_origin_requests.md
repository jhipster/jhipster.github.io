---
layout: default
title: Activer les requêtes HTTP cross-origin
sitemap:
priority: 0.5
lastmod: 2015-07-30T18:40:00-00:00
---

# Activer les requêtes HTTP cross-origin

## /!\ Ce conseil est obsolète depuis JHipster v3.0

__Conseil soumis par [@tomcgn](https://github.com/tomcgn)__

Vous pouvez vouloir utiliser l'API prête à l'emploi pour intégrer votre application dans des sites web existants.
Une approche pourrait être d'utiliser [Knockout](https://github.com/knockout/knockout) pour lier vos entités facilement et afficher l'entité sur, par exemple, votre blog, servi depuis votre application JHipster.

Deux aspects doivent être modifiés dans le code standard de JHipster afin d'utiliser l'API depuis des clients HTML/AJAX simples :

1. Configurer la `SecurityConfiguration`
2. Informer les navigateurs des utilisateurs qui visitent le site tiers utilisant l'API que votre application autorise l'origine de cette requête.

## Modifier la SecurityConfiguration

Dans la méthode `SecurityConfiguration.configure(HttpSecurity http)`, ajoutez de nouvelles directives selon les besoins dans la partie `.and().authorizeRequests()`, par exemple :

    .antMatchers("/api/_search/meetings/**").permitAll()
    .antMatchers("/api/_search/meetings").permitAll()`

Bien sûr, vous pouvez utiliser `.hasAuthority()` et `.authenticated()` pour rendre votre client plus dynamique.

## Adapter les en-têtes de réponse HTTP

Vous devez ajouter les directives suivantes au `CsrfCookieGeneratorFilter` :

Dans la méthode `doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException`

    response.addHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response.setHeader("Access-Control-Max-Age", "86400"); // 24 Hours
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
