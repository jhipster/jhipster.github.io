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

_Please read this page carefully before doing an upgrade, to understand how the upgrade process works_

## Requirements

For this sub-generator to work you need to have `git` installed from [http://git-scm.com](http://git-scm.com/).

## Running the upgrade sub-generator

Go into the application's root directory:

`cd myapplication/`

To upgrade your application, type:

`jhipster upgrade`

Here are the options you can pass:

* `--verbose` - Log each step of the upgrade process in detail
* `--target-version=4.2.0` - Upgrade to the target version instead of the latest release, useful if a project is several versions behind
* `--force` - Run the upgrade sub-generator even if no new JHipster version is available

## Graphical view of the upgrade process

Here is how the upgrade process works graphically (read the sections below to have a textual explanation):

![GitGraph]({{ site.url }}/images/upgrade_gitgraph.png)

(this image comes from [JSFiddle](http://jsfiddle.net/lordlothar99/tqp9gyu3/) )

Please note that the `jhipster_upgrade` branch will be created orphan on your project, although it doesn't display correctly on the above graph.

## Step-by-step explanation of the upgrade process

Below are the steps processed by the JHipster upgrade sub-generator:

1. Check if there is a new version of JHipster available (not applicable if you are using `--force`).
2. Check if the application is already initialized as a `git` repository, or else JHipster will initialize one for you and commit the current codebase to the master branch.
3. Check to ensure that there are no un-committed local changes in the repository. The process will exit if there are un-committed changes found.
4. Check if a `jhipster_upgrade` branch exists. If not, a branch is created: details about this step is provided in the "Specific steps executed on first upgrade" section.
5. Checkout the `jhipster_upgrade` branch.
6. Upgrade JHipster to the latest available version globally.
7. Clean the current project directory.
8. Re-generate the application using the `jhipster --force --with-entities` command.
9. Commit the generated code to the `jhipster_upgrade` branch.
10. Merge the `jhipster_upgrade` branch back to the original branch from where the `jhipster upgrade` command was launched.
11. Now you just need to proceed with resolving merge conflicts if there are any.

Congratulations, your application is now upgraded with the latest version of JHipster!

## Specific steps executed on first upgrade

On the first execution of the JHipster upgrade sub-generator, in order to avoid erasing all your changes, some additional steps are run:

1. A `jhipster_upgrade` branch is created orphan (it has no parent)
2. The whole application is generated (using your current JHipster version).
3. A block-merge commit is made on the `master` branch: no alteration is made on your codebase on the `master` branch; this is just a practical way to record in Git that the HEAD of `master` is up-to-date with the current JHipster version.

### Advice

Don't commit anything on the `jhipster_upgrade` branch. This branch is dedicated to the JHipster upgrade sub-generator: each time the sub-generator is run, a new commit will be created.
