---
layout: default
title: LDAP Authentication
sitemap:
priority: 0.5
lastmod: 2016-05-26T22:22:00-00:00
---

# LDAP Authentication

__Tip submitted by [@mleneveut](https://github.com/mleneveut)__

To add an LDAP authentification to your JHipster application, follow these steps :

  * Add the dependency to spring-security-ldap. Example for gradle in build.gradle :

```
    compile group: 'org.springframework.security', name: 'spring-security-ldap', version: spring_security_version
```
  * Modify the SecurityConfiguration.java, method configureGlobal(AuthenticationManagerBuilder auth)

```
    @Inject
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        LdapContextSource contextSource = new LdapContextSource();
        contextSource.setUrl("ldap://[IP goes here]:[port goes here]");
        contextSource.setBase("dc=mycompany,dc=com");
        contextSource.setUserDn("cn=aUserUid,dc=mycompany,dc=com");
        contextSource.setPassword("hisPassword");
        contextSource.afterPropertiesSet(); //needed otherwise you will have a NullPointerException in spring

        auth.ldapAuthentication()
        	.userSearchBase("o=myO,ou=myOu") //don't add the base
        	.userSearchFilter("(uid={0})")
        	.groupSearchBase("ou=Groups") //don't add the base
        	.groupSearchFilter("member={0}")
        	.contextSource(contextSource);
    }
```
  * Modify the SecurityUtils.java, method getCurrentUserLogin()

```
    } else if (authentication.getPrincipal() instanceof LdapUserDetails) {
    	LdapUserDetails ldapUser = (LdapUserDetails) authentication.getPrincipal();
    	return ldapUser.getUsername();
    }
```
