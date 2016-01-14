---
layout: default
title: Policies
sitemap:
priority: 0.7
lastmod: 2015-07-31T18:40:00-00:00
---

# <i class="fa fa-gavel"></i> Policies

The JHipster development team follows some coding policies. You can see them as "best practices" or "guidelines". They are enforced on the project itself, not on the generated code: if you just use JHipster to generate your project, you absolutely do not have to follow them!

Those policies are followed by the [development team](/pages/team.html), and you should follow them if you submit a Pull Request.

## Policy 0: Policies are voted by the development team

Each policy can be discussed or modified by the development team on the [mailing list](https://groups.google.com/forum/?hl=en#!forum/jhipster-dev). Any significant change must be voted (+1 if you agree, -1 if you disagree).

## Policy 1: technologies used by JHipster have their default configuration used as much as possible

For example, we use JPA, Spring or AngularJS the "usual way", without some heavy configuration options and with their usual naming and coding conventions. We do this as:

- Each technology usually has a very good reason to have those defaults
- It's much easier to understand how JHipster works if we don't re-configure everything

We might only change a default configuration if it produces some issue with the other technologies used by JHipster. For example, to have Spring Security and AngularJS working together, we had to change Spring Security's default configuration.

## Policy 2: only add options when there is sufficient added-value in the generated code

JHipster has many options when generating a project. We only add those options when they are complex and imply configuring or coding several components.

Adding an option only because it saves a couple of lines to code isn't a good usage of JHipster:

- It's easier to code those lines manually than to learn a new JHipster option
- It will only make our generator more complex without adding any value

## Policy 3: For the Java code, follow the default Intellij IDEA formatting and coding guidelines

There are many ways to format your code. We follow the default rules provided by Intellij IDEA:

- They are well-made and close to Sun old's coding conventions
- They are easy to follow with Intellij IDEA (obvisouly)
- Members of the team have a free Intellij IDEA license

## Policy 4: use strict versions for third-party libraries

We've had many issues with library versions making conflicts. This is mostly a JavaScript issue, so to be clear: use fixed libraries versions in your `bower.json` and `package.json` files.
