---
layout: default
title: Artifact Repository Manager
permalink: /arm/
sitemap:
    priority: 0.7
    lastmod: 2016-03-17T00:00:00-00:00
---
# <i class="fa fa-cloud-upload"></i> Deploying your JHipster Applications in a repository Manager (Maven only)

JHipster provides a way to automatically manage release of your project in an artifact repository manager.

## Summary

1. [Maven configuration](#maven-scm-configuration)
2. [Tweaking project information site](#maven-site)
3. [Maven Release](#maven-release)
4. [Deploying with travis](#maven-travis)

## <a name="maven-scm-configuration"></a> Maven configuration

Every JHipster project is composed of four poms:
* The base one (at the root of the project), containing the dependencies, profile and plugin declaration for your project.
* The .mvn/plugins one, containing generic plugins configuration informations
* The .mvn/reporting one, containing reporting informations
* The .mvn/parent one, containing release informations

As you can guess, this page is all about the later.

Within this pom, you may change the scm informations concerning scm access to your project:
* Url: the access url of your project main page
* scm.connection: the read only connection to your repository
* scm.developerConnection: same as connection, but with write access
* site.url: URL where your maven reporting site will be pushed at release
  * By default, site is configured to be deployed on the gh-pages branch of your repo: github will automatically generates a website from here
  * You should also update src/site/site.xml with your site access information if default aren't correct, in order to have site links working correctly
  * If you don't have want a site but want to benefit from continuous release, remove the site information or the release process will fail 

## <a name="maven-site"></a> Maven site

### Metadata

Fill as many metadata as you want in your parent pom: they will be exploited by the site generation and give the maximum amount of information to your end user.
See pom [reference](http://maven.apache.org/ref/3.5.2/maven-model/maven.html) to see the list of property you can fill.

### Markdown

By default, the readme.md at the root of the project will be copied in src/site/markdown folder (so that it will be displayed in Github/Gitlab and the site).
If you want to have a more advanced site documentation, remove the call of the antrun plugin pom copying that readme in the parent pom, and put all your markdown files in src/site/markdown folder.

### Generation

Executes `./mvnw site` in order to have a nice website containing all your documentation, reports, javadoc, source browser, etc on the target/site folder.
 

## <a name="maven-release"></a> Release

### Configuration

Before tackling the Release aspect, please update your parent pom's <distributionManagement> section with your ARM informations.
You should also update the ./mvn/settings.xml file to put your credentials, even if environment variables within the CI environment are preferable (or a dedicated settings.xml).

### Process
 
The recommended release process consists in executing the following commands:
  - `./mvnw -f .mvn/parent/pom.xml --batch-mode release:prepare -P release -DdryRun=true`
  - `./mvnw -f .mvn/parent/pom.xml --batch-mode release:clean -P release`
  - `./mvnw site`
  - `./mvnw -f .mvn/parent/pom.xml --batch-mode release:prepare -P release`
  - `./mvnw -f .mvn/parent/pom.xml --batch-mode release:perform -P release,nexus-pro`
  
By default, the release process, executed using ./mvnw : 
* Build your project
* Generate javadoc for your jars
* Sign your jar with your gpg key
* Generate a site
* Update your project version from <V>-SNAPSHOT to <V>
* Push the code into a tag on your scm
* Push the code into the ARM repository (or in staging if the nexus-pro profile is activated)
* Push the site on location (gh-pages scm by default)
* Update project's version to <V+1>-SNAPSHOT

## <a name="maven-travis"></a> Deploying with Travis

Comments have been generated in the .travis.yml code to give information about how to enable releases within travis.
You can also look at the [Tcharl sample](https://github.com/Tcharl/test-travis-release) project commit history to see the configuration steps needed to achieve this. 

The actions to achieve are:

* Generating a gpg signing subkey (explained in a [blog post from Nathan Fischer](http://www.debonair.io/post/maven-cd/), thanks!)
  * Released artifacts must be signed in order to be considered as secured 
* Generating a ssh key to access to SCM repository (from [another blogger](https://oncletom.io/2016/travis-ssh-deploy/) Thanks too!)
* Zipping them in a tar
* Encrypting the tar with travis
* Encrypting ARM username and password within travis (use Sonatype token instead of your real credentials for better security)
* Configuring how to decrypt all of these and copying them at the right place within the travis pre-deploy process (commented in .travis.yml)
* Configuring deploy goals (commented in .travis.yml)
* Enjoying release on each master merge :-).