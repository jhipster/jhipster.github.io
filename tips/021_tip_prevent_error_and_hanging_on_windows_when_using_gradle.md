---
layout: default
title: Prevent error/hanging on Windows when using Gradle
sitemap:
priority: 0.5
lastmod: 2017-01-03T22:30:00-00:00
---

# Prevent error/hanging on Windows when using Gradle

## /!\ This tip is deprecated since JHipster v4.1.1 as we upgraded to Gradle 3.4

__Tip submitted by [@kaidohallik](https://github.com/kaidohallik)__

## Problem description

If using cmd.exe on Windows for executing Gradle tasks then error or hanging may occur:

1. sometimes process just hangs
2. sometimes error occurs

```
FAILURE: Build failed with an exception.

* What went wrong:
Unable to process incoming event 'ProgressComplete ' (ProgressCompleteEvent)
```

## When problem occurs

Problem occurs after some command has outputed some critical symbols and/or amount of symbols to this cmd.exe window.
The emergence of the problem depends on the Screen Buffer Size Height. The higher it is the greater is the chance that no error/hanging occurs.
But the problem is reproduced also with the maximum Screen Buffer Size Height (9999).

## Workarounds

The problem never occurs when using Gradle with the following switches:

* `gradlew --info`
* `gradlew --debug`
* `gradlew --console plain`

The problem can sometimes be prevented with the following actions:

* increase the cmd.exe window Screen Buffer Size Height, for example to the maximum possible value 9999
* open new cmd.exe window and use this for executing Gradle tasks

In the JHipster applications this problem has reproduced with the following Gradle tasks:

* gulpConstantDev
* gulpBuildWithOpts
* npmInstall
* yarn_install
* webpack

Exists hack which prevents this error/hanging in the JHipster applications. Just put the following code to your `build.gradle`:

```
tasks.withType(NodeTask) {
    doLast {
        println()
    }
}
tasks.withType(com.moowork.gradle.node.npm.NpmTask) {
    doLast {
        println()
    }
}
tasks.withType(com.moowork.gradle.node.yarn.YarnTask) {
    doLast {
        println()
    }
}
```

## Additional information

Currently there is open [Gradle issue](https://github.com/gradle/gradle/issues/882) about the described error/hanging problem.
It's possible that in the future versions of Gradle the described error/hanging problem doesn't exist any more.
