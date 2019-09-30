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

If you are doing the upgrade more than once you could consider to first upgrade the JHipster tree like this:
	
    git checkout jhipster_upgrade
	git checkout --patch master .yo-rc.json
	git checkout --patch master .jhipster
	git commit -a
	git push --set-upstream origin jhipster_upgrade
	git checkout master

With doing the above you upgrade the jhipster_upgrade tree with your latest changes so JHipster can make use of that during the upgrade. For example when you changed your model.

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

1. A `jhipster_upgrade` branch is created orphan (it has no parent).
2. The whole application is generated (using your current JHipster version).
3. A block-merge commit is made on the `master` branch: no alteration is made on your codebase on the `master` branch; this is just a practical way to record in Git that the HEAD of `master` is up-to-date with the current JHipster version.

### Advice

- Don't commit anything on the `jhipster_upgrade` branch. This branch is dedicated to the JHipster upgrade sub-generator: each time the sub-generator is run, a new commit will be created. This offcourse does not account for the above tip for upgrading more than once.

- If you are updating from a very old version (example from 5.0.0 to latest) we suggest updating gradually between each minor/patch version and performing tests to make sure the application works as expected. 

- There are some helpful approaches from the JHipster community around designing the application in such a way that makes the update process easier, and reduces the amount of merge conflicts. We recommend using [JHipster Side-by-Side approach](https://www.youtube.com/watch?v=Gg5CYoBdpVo).  
