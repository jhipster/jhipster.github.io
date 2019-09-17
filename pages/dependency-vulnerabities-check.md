---
layout: default
title: Dependency Vulnerabilities Check
permalink: /dependency-vulnerabities-check/
sitemap:
    priority: 0.7
    lastmod: 2018-09-15T19:00:00-00:00
---

# <i class="fa fa-check-circle-o"></i> Dependency Vulnerabilities Check

## Why project dependencies should be checked

JHipster uses many technologies, and the project is very careful at selecting them. But maybe the project missed one vulnerability in those many dependencies, or maybe you added or updated one dependency that triggered a new vulnerability.

According to [OWASP Top 10 Most Critical Web Application Security Risks](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project), using Components (ie. dependencies) with known vulnerabilities is ranked 9th, and there are many known stories of security breaches provided by (malicious or not) third-party dependencies.

## Why the dependency check is not provided by default by JHipster

Proposing a dependency check by default in JHipster build has been discussed a couple of times ([#6329](https://github.com/jhipster/generator-jhipster/issues/6329), [#8191](https://github.com/jhipster/generator-jhipster/issues/8191)). To summarise, it is complicated to have a realistic report (removing false-positive) and context dependant (security is always a trade off between the actual risk/criticity and the effort to prevent it).

However we highly recommend using a dependency analysis tool such as [Dependabot](https://dependabot.com/) or [Snyk](https://snyk.io/) if you are using JHipster in production.  

## What to do do if you detect a vulnerability in one of JHipster's dependencies

If you found a vulnerability in one of JHipster's dependencies, please check if there is not an existing  [issue](https://github.com/jhipster/generator-jhipster/issues) already opened on that vulnerability.

If nothing is mentioned, please send us a security vulnerability report privately. Please read our [security policy](https://github.com/jhipster/generator-jhipster/security/policy) on how to send one. Include steps to reproduce the exploit, security report, blog post, etc.

Be sure that the JHipster team is committed to provide a high-quality, enterprise-ready and secure development stack and that this issue will be a top priority for us.

# How to check a JHipster project's dependencies

## Checking on the Server side

To check if a Java dependency has a known Common Vulnerabilities and Exposures (aka. CVE), visit the [NIST National Vulnerability Database](https://nvd.nist.gov/) which maintains an up-to-date list.

The OWASP project provides Maven and Gradle plugins to check the whole dependency chain automatically, generate a report and even block a build (not recommended, it can be very aggressive when doing continuous integration).

[Here is the documentation explaining how to read the dependency check report](https://jeremylong.github.io/DependencyCheck/general/thereport.html).

### Using Maven

See the [OWASP Maven Dependency Check plugin documentation](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/index.html)

Add the owasp dependency-check plugin:
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
Running `./mvnw verify` will generate a dependency check report under the `target` directory.

### Using Gradle
See the [OWASP Gradle Dependency Check plugin documentation](https://jeremylong.github.io/DependencyCheck/dependency-check-gradle/index.html)

Update the `build.gradle` file to apply the [OWASP dependency-check-gradle plugin](https://plugins.gradle.org/plugin/org.owasp.dependencycheck).

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

Running `./gradlew dependencyCheckAnalyze` generates a dependency check report inside the `build/report` directory.

Updating continuous integration builds with a dependency check is done by running `./gradlew check -Pstrict-security`

## Checking on the client side

Since version 6, NPM includes a security audit by default for each dependency installation. Check the [About security audits
](https://docs.npmjs.com/getting-started/running-a-security-audit) page for more information.
