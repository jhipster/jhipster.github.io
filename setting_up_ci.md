---
layout: default
title: Setting up Continuous Integration
sitemap:
priority: 0.7
lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-check-square-o"></i> Setting up Continuous Integration

Setting up your own continuous integration server using Jenkins for a JHipster application is harder than for a classic Spring MVC application because of all the tools required to build and test the client code.

It's harder because you have to manage 3 software stacks in your build process:

- Java/Maven for the server code and the build orchestration
- Javascript/NodeJS/Grunt/Bower for client code
- Ruby/Compass to pre-process CSS style sheets

Each stack comes with its own dependency management (artifacts, npm, gem) with potential conflicts to solve.

Some of the instructions below may help you also to setup your development environment.

- [Linux server](/setting_up_ci_linux.html)
- [Windows server](/setting_up_ci_windows.html)

## Configuring Javascript tests

In order to be able to inspect our JavaScript test reports via Jenkins, the easiest way is to configure Karma to use JUnit reporting format and to generate reports in Maven's surefire output directory.

Gruntfile.js

~~~ javascript
karma: {
  unit: {
    configFile: 'src/test/javascript/karma.conf.js',
    singleRun: true,
    reporters : ['dots', 'junit'],
    junitReporter : {
      outputFile: '../target/surefire-reports/TEST-javascript-results.xml'
    }
  }
},
~~~

karma.conf.js

~~~ javascript
singleRun: true,
~~~

package.json

~~~ javascript
"karma-junit-reporter": "~0.2",
~~~
