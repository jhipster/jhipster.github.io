---
layout: default
title: Enabling Social Login with OAuth2
sitemap:
priority: 0.1
lastmod: 2018-03-18T18:20:00-00:00
---
# Enabling Social Login with OAuth2

When using the OAuth2 authentication type, your app connects to an OpenID Connect server such as Okta or Keycloak.  It's possible to enable social login by adding external identity providers within the admininistration console.

## Adding an Identity Provider with Okta

Okta supports Facebook, Microsoft, Google, LinkedIn, and Custom SAML providers.

Log into the Okta console and navigate via the menu to "Users" -> "Social & Identity Providers".  Choose "Add Identity Provider" and add the provider of your choice.  Make sure to completely follow the [Okta Social Login documentation](https://developer.okta.com/authentication-guide/social-login/) which guides you in obtaining the client ID and secret for each provider.

## Adding an Identity Provider with Keycloak

Keycloak supports GitHub, Twitter, Facebook, Openshift, Google, Gitlab, LinkedIn, Microsoft, BitBucket, StackOverflow, and Custom SAML providers.

Log into the Keycloak administration console and choose "Identity Providers" from the left menu.  Follow the instructions found in the [Keycloak Social Login documenation](https://www.keycloak.org/docs/latest/server_admin/index.html#social-identity-providers) to configure the provider and obtain the client ID and secret.