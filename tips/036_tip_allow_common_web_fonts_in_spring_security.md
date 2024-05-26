---
layout: default
title: # Autoriser les polices web courantes dans la configuration de sécurité
sitemap:
priority: 0.1
lastmod: 2023-08-17T00:00:00-00:00
---
# Autoriser les polices web courantes dans la configuration de sécurité

__Astuce soumise par [@dinu0000](https://github.com/dinu0000)__

Lors du développement d'une application web JHipster, vous pouvez rencontrer des problèmes avec le chargement incorrect des polices web en raison des configurations de sécurité. Pour permettre le chargement sans heurts des polices web courantes, suivez ces étapes :

Dans votre fichier `SecurityConfiguration.java`, mettez à jour la méthode `filterChain` pour autoriser les requêtes de polices web :

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // ...
    http
        // other configurations
        .authorizeHttpRequests(authz ->
            authz
                .requestMatchers("/", "/index.html", "/*.js", "/*.map", "/*.css").permitAll()
                .requestMatchers("/*.ico", "/*.png", "/*.svg", "/*.webapp").permitAll()
                .requestMatchers("/*.ico", "/*.png", "/*.svg", "/*.webapp", "/*.woff", "/*.woff2", "/*.ttf", "/*.otf").permitAll() // add common web font extensions here 
                .requestMatchers("/app/**").permitAll()
                // ... other configurations
}
```

Avec ces ajustements, la configuration de sécurité de votre application JHipster autorisera le chargement des polices web courantes sans rencontrer de restrictions de sécurité.