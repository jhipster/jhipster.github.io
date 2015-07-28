---
layout: default
title: Enable cross origin HTTP requests
sitemap:
priority: 0.5
lastmod: 2015-07-30T18:40:00-00:00
---

# Enable cross origin HTTP requests

__Tip submitted by [@tomcgn](https://github.com/tomcgn)__

You might want to use the nice out-of-the-box API to integrate your application into existing websites.
One approach could be to use [Knockout](https://github.com/knockout/knockout) to bind your entities with ease and render the entity on e.g. your blog, being served from your JHipster application.

Two aspects need to be changed in the standard JHipster code in order to use the API from simple HTML/AJAX clients:

1. Configure the `SecurityConfiguration`
2. Tell the browsers of the users that visit the 3rd party site that uses the API that your app permits the origin of that request.

## Modify the SecurityConfiguration

In method `SecurityConfiguration.configure(HttpSecurity http)` , add new directives as needed in the `.and().authorizeRequests()` part, e.g. :

    .antMatchers("/api/_search/meetings/**").permitAll()
    .antMatchers("/api/_search/meetings").permitAll()`

Of course you can make use of `.hasAuthority()` and `.authenticated()` to make your thinst-client a bit more dynamic.

## Adapt the HTTP response headers

You need to add the following directives to the `CsrfCookieGeneratorFilter` :

In method `doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException`

    response.addHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response.setHeader("Access-Control-Max-Age", "86400"); // 24 Hours
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
