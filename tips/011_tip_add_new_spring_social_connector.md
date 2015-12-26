---
layout: default
title: Add new Spring social connector
sitemap:
priority: 0.5
lastmod: 2015-12-26T19:23:00-00:00
---

# Add new Spring social connector

Has you can see Spring social add many connector available (List below). This tip will show you how to add new social connector to your JHipster application. More information here: http://projects.spring.io/spring-social/. 

* Facebook
* Twitter
* Linkedin
* Github
* Tripit
* 500px
* Alfresco
* App.net
* BitBucket
* Daum
* Digg
* Dropbox
* Ecobee
* Evernote
* Flattr
* Flickr
* Foursquare
* Geeklist
* Google
* Instagram
* Intuit (QuickBooks Online)
* Khan Academy
* Last.fm
* Live (Windows Live)
* Miso
* Mixcloud
* Nk
* Salesforce
* Slideshare
* SoundCloud
* Strava
* Tumblr
* Viadeo
* Vkontakte
* Weibo
* Wunderlist
* Xing
* Yammer

## Requirement

- JHipster: 2.23.0 or older.
- JHipster application build with `HTTP Session Authentication with social login enabled (Google, Facebook, Twitter). Warning, this doesn't work with Cassandra!` option.

## Server side

### pom.xml

Add your dependency in the `pom.xml` file. Add the version of the dependency in `<properties></properties>` section.

```xml
<!-- Add in <properties></properties> section -->
<spring-social-something.version>1.1.2.RELEASE</spring-social-something.version>

<!-- Add in <dependecies></dependecies> section -->
<dependency>
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-something</artifactId>
    <version>${spring-social-something.version}</version>
</dependency>
```

### application.yml

Add in the `application.yml` under the `social` section the preference.

```yml
# In social section
something:
    clientId: xxx
    clientSecret: xxx
```

### SocialConfiguration.java

Add in the `SocialConfiguration.java` the connector configuration.

```java
// Something configuration
String somethingClientId = environment.getProperty("spring.social.something.clientId");
String somethingClientSecret = environment.getProperty("spring.social.something.clientSecret");
if (somethingClientId != null && somethingClientSecret != null) {
    log.debug("Configuring SomethingConnectionFactory");
    connectionSomethingConfigurer.addConnectionFactory(
        new SomethingConnectionFactory(
            somethingClientId,
            somethingClientSecret
        )
    );
} else {
    log.error("Cannot configure SomethingConnectionFactory id or secret null");
}
```

## Client side

### social.service.js

Add your new provider in the service.

```javascript
socialService.getProviderSetting = function (provider) {
    switch(provider) {
        case 'google': return 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
        case 'facebook': return 'public_profile,email';
        case 'twitter': return '';
        case 'something': return ''; // Add parameter if need it
        default: return 'Provider setting not defined';
    }
};
```

### login.html & register.html

Add your button in the files `login.html` & `register.html`.

```html
<div class="col-md-4">
    <br/>
    <jh-social ng-provider="google"></jh-social>
    <jh-social ng-provider="facebook"></jh-social>
    <jh-social ng-provider="twitter"></jh-social>
    <jh-social ng-provider="something"></jh-social><!-- add your button -->
</div>
```

### main.css

Add the style of your social sign in button.

```css
.jh-btn-something {
    background-color: #3b5998;
    border-color: rgba(0, 0, 0, 0.2);
    color: #fff;
}

.jh-btn-something:hover, .jh-btn-something:focus, .jh-btn-something:active, .jh-btn-something.active, .open > .dropdown-toggle.jh-btn-something {
    background-color: #2d4373;
    border-color: rgba(0, 0, 0, 0.2);
    color: #fff;
}
```
