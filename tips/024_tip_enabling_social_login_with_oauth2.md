---
layout: default
title: Activation de la connexion sociale avec OAuth2
sitemap:
priority: 0.1
lastmod: 2018-03-18T18:20:00-00:00
---
# Activation de la connexion sociale avec OAuth2

Lorsque vous utilisez le type d'authentification OAuth2, votre application se connecte à un serveur OpenID Connect tel que Okta ou Keycloak. Il est possible d'activer la connexion sociale en ajoutant des fournisseurs d'identité externes dans la console d'administration.

## Ajout d'un fournisseur d'identité avec Okta

Okta prend en charge Facebook, Microsoft, Google, LinkedIn et les fournisseurs SAML personnalisés.

Connectez-vous à la console Okta et naviguez via le menu vers "Utilisateurs" -> "Fournisseurs d'identité sociaux". Choisissez "Ajouter un fournisseur d'identité" et ajoutez le fournisseur de votre choix. Assurez-vous de suivre entièrement la [documentation sur la connexion sociale d'Okta](https://developer.okta.com/authentication-guide/social-login/) qui vous guide pour obtenir l'identifiant client et le secret pour chaque fournisseur.

## Ajout d'un fournisseur d'identité avec Keycloak

Keycloak prend en charge GitHub, Twitter, Facebook, Openshift, Google, Gitlab, LinkedIn, Microsoft, BitBucket, StackOverflow et les fournisseurs SAML personnalisés.

Connectez-vous à la console d'administration Keycloak et choisissez "Fournisseurs d'identité" dans le menu de gauche. Suivez les instructions trouvées dans la [documentation sur la connexion sociale de Keycloak](https://www.keycloak.org/docs/latest/server_admin/index.html#social-identity-providers) pour configurer le fournisseur et obtenir l'identifiant client et le secret.