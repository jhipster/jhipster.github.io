---
layout: default
title: Enforce HTTPS
sitemap:
priority: 0.5
lastmod: 2015-07-31T18:40:00-00:00
---

# Enforce HTTPS

__Tip submitted by [@seanoreillyza](https://github.com/seanoreillyza), originally posted on [his blog](http://seanoreillyza.github.io/programming/2015/07/13/enforcing-https-in-jhipster.html)__

## Modify your application properties file

In a JHipster project, this is maintained in a YAML file:
`src/main/resources/config/application-prod.yml`

Modify your server directive with the tomcat parameters as follows:

    server:
        port: 8080
        tomcat:
            remote_ip_header: x-forwarded-for
            protocol_header: x-forwarded-proto

## Modify your SecurityConfiguration class

In your file `src/main/java/com/my/app/config/SecurityConfiguration.java`

In the class

    public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

You should see the member variable:

    @Inject
    private Environment env;

To enforce HTTPS, look for the method

    @Override
    protected void configure(HttpSecurity http) throws Exception {

And add the line:

    // Enforce HTTPS except on dev
    if (env.acceptsProfiles("!dev"))http.requiresChannel().anyRequest().requiresSecure();

Then just package and deploy as normal!
