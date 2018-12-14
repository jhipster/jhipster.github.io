---
layout: default
title: Creating a controller
permalink: /creating-a-spring-controller/
sitemap:
    priority: 0.7
    lastmod: 2017-12-28T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> Creating a Spring controller

## Introduction

_Note: this sub-generator is much simpler than the [entity sub-generator]({{ site.url }}/creating-an-entity/) that creates full CRUD entities_

This sub-generator generates a Spring MVC REST Controller. It is also able to create simple REST methods.

In order to generate a "Foo" Spring MVC REST controller, just type:

`jhipster spring-controller Foo`

The sub-generator will ask you which method you want to generate: just answer the method name and the HTTP verb you want to use, and a simple method will be generated.

## Can we document this Spring MVC REST Controller with Swagger?

Yes! In fact it's already done! In `dev` mode, just use the `Administration > API` menu to access Swagger UI and start using the generated controller.

## Can we add security to Spring MVC REST Controllers?

Yes! Just add Spring Security's `@Secured` annotation on your class or on your methods, and use the provided `AuthoritiesConstants` class to restrict access to specific user authorities.

## Can we monitor Spring MVC REST Controllers?

Yes! Just add Metrics' `@Timed` annotations on the methods you want to monitor.

## Can we proxy it from our Microservice Gateway dev server?

Yes! By adding the servicename to the context of the proxy in webpack/webpack.dev.js
```javascript
module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './target/www',
        proxy: [{
            context: [
                '/<servicename>',
                /* jhipster-needle-add-entity-to-webpack - JHipster will add entity api paths here */
                ....
```
