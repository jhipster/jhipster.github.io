---
layout: default
title: Updating an application
permalink: /upgrading-an-application/
sitemap:
    priority: 0.7
    lastmod: 2014-06-02T00:00:00-00:00
gitgraph: http://jsfiddle.net/lordlothar99/tqp9gyu3
---

# <i class="fa fa-refresh"></i> Upgrading an application

When a new version of JHipster is released, the JHipster upgrade sub-generator helps upgrading an existing application to this new version, without erasing your changes.

This is helpful to:

- Have the latest JHipster features in an existing application
- Get the changes when there is an important bug fix or security update
- Retain your changes in your codebase, and easily merge them with newly generated code

In order to use the sub-generator, go into the application's root directory:

`cd myapplication/`

To upgrade your application, type:

`yo jhipster:upgrade`

If you want to run the upgrade sub-generator even if no new JHipster version is available, type:

`yo jhipster:upgrade --force`

## Requirements

For this sub-generator to work you need to have `git` installed from [http://git-scm.com](http://git-scm.com/).

## Step-by-step explanation

Below are the steps processed by the JHipster upgrade sub-generator:

1. Check if there is a new version of JHipster available (not applicable if you are using `--force`).
2. Check if the application is already initialized as a `git` repository, or else JHipster will initialize one for you and commit the current codebase to the master branch.
3. Check to ensure that there are no un-committed local changes in the repository. The process will exit if there are un-committed changes found.
4. Check if `jhipster_upgrade` branch exists ; if not, branch is created. Some details about this step is provided in "First upgrade" section.
5. Checkout `jhipster_upgrade` branch.
6. Upgrade JHipster to the latest available version globally.
7. Clean the current project directory.
8. Re-generate the application using the `yo jhipster --force --with-entities` command.
9. Commit the generated code to the `jhipster_upgrade` branch.
10. Merge the `jhipster_upgrade` branch back to the original branch from where the `yo jhipster:upgrade` command was launched.
11. Now you just need to proceed with resolving merge conflicts if there are any.

Congratulations, your application is now upgraded with the latest version of JHipster!

## Advice

Please don't ever commit anything on `jhipster_upgrade` branch. This branch is dedicated to Jhipster upgrade sub-generator : each time sub-generator is run, a new commit is created.

## First upgrade

On first execution of Jhipster upgrade sub-generator, in order to avoid erasing all your changes, few steps are run :
1. `jhipster_upgrade` branch is created orphan (it has no parent)
2. The whole application is generated (using your current Jhipster version).
3. A block-merge commit is made on `master` branch : no alteration is made on your codebase on `master` branch ; this is just a practical way to record in Git that the HEAD of `master` is up-to-date with current Jhipster version.

## Git graph

Please note that `jhipster_upgrade` branch will be created orphan on your project, althought it doesn't display as is on following graph.

![GitGraph]({{ site.url }}/images/upgrade_gitgraph.png)