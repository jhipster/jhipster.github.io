---
layout: default
title: Dependency Vulnerabilities Check
permalink: /dependency-vulnerabities-check/
sitemap:
    priority: 0.7
    lastmod: 2018-09-15T19:00:00-00:00
---

# <i class="fa fa-lock"></i> Dependency Check

## Why should I check my project dependencies?

**TL;DR**: Because you can handle all the dependency chain. Did you ever check JHipster or one of its dependency wasn't sending sensitive data to your competitor?

According to [OWASP Top 10 Most Critical Web Application Security Risks](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project), using Components (ie. dependencies) with known vulnerabilities is ranked 9th. We all read, share and laugh (because it always happen to others, right) at articles presenting security breachs provided by (malicious or not) third-party dependency :
* https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5
* https://github.com/ChALkeR/notes/blob/master/Gathering-weak-npm-credentials.md
* https://www.f5.com/labs/articles/threat-intelligence/new-campaign-targeting-apache-struts-2--weblogic-deploys-malware

## Why the dependency check is not provided by default by JHipster

Proposing a dependency check by default in JHipster build has been discussed couple of times ([#6329](https://github.com/jhipster/generator-jhipster/issues/6329), [#8191](https://github.com/jhipster/generator-jhipster/issues/8191)). To make the long story short, its tricky to have a realistic report (removing false-positive) and context dependant (Security is always a trade off between the actual risk/criticity and the effort to prevent it).

## What to do do if I detect a vulnerability in a JHipster project's dependencies

If you found a vulnerability in one of JHipster, you should check if there is not an existing  [issue](https://github.com/jhipster/generator-jhipster/issues)/[pull request](https://github.com/jhipster/generator-jhipster/pulls) talking about the vulnerability.

If nothing is mentionned, create a classic [issue](https://github.com/jhipster/generator-jhipster/issues) and provide the proof of what your saying (steps to reproduce the exploit, security report, blog post, etc.).

Be sure, that the JHipster team is comitted to provide a high-quality, enterpise-ready and secure development stack but keep in mind we do it for free on our personal time

# How to check my JHipster project's dependencies

## Server side

You check if one of your Java dependency has a known Common Vulnerabilities and Exposures (aka. CVE) you can use the  [NIST National Vulnerability Database](https://nvd.nist.gov/) which maintained up to date list.

The OWASP project provide Maven/Gradle plugins to check your whole dependency chain automatically, generate a report and even block your build (not recommended, it can be very agressive for your CI).

Check the official documentation to know [how to read the dependency check report](https://jeremylong.github.io/DependencyCheck/general/thereport.html).

### Maven
[OWASP Maven Dependency Check plugin documentation](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/index.html)
Simply add the owasp dependency-check plugin
```
<build>
...
  <plugins>
  ...
  <plugin>
      <groupId>org.owasp</groupId>
      <artifactId>dependency-check-maven</artifactId>
      <version>3.3.1</version>
      <executions>
        <execution>
          <goals>
            <goal>check</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  ..
  </plugins>
  ...
</build>
```
You can now run `./mvnw verify` to generate a dependency check report under `target`.

### Gradle
[OWASP Gradle Dependency Check plugin documentation](https://jeremylong.github.io/DependencyCheck/dependency-check-gradle/index.html)

Update your `build.gradle` to apply the [OWASP dependency-check-gradle plugin](https://plugins.gradle.org/plugin/org.owasp.dependencycheck)
```
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'org.owasp:dependency-check-gradle:3.3.1'
    }
}

apply plugin: 'org.owasp.dependencycheck'

if(project.hasProperty('strict-security')) {
  check.dependsOn dependencyCheckAnalyze
}
```

Now you can run `./gradlew dependencyCheckAnalyze` to generate a dependency check report under `build/report`.

You can easily update your CI builds with a depedendency check by running `./gradlew check -Pstrict-security`
```

## Client side

** Work In Progress**
Regarding frontend dependencies, we didnt't find a reliable, mature enough and free tool to cover all the technologies JHipster provides (AngularJS, Angular, React and soon Vue.js).

[Do no hesitate to contibute to this page](https://github.com/jhipster/jhipster.github.io) by providing your feedback and lesson learned on methods/tools to spot vulnerabilities for frontend dependencies.
