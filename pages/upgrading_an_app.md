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

## Summary

1. [Option 1 - automatic upgrade](#automatic_upgrade)
2. [Option 2 - manual upgrade](#manual_upgrade)

## <a name="automatic_upgrade"></a> Option 1 - automatic upgrade

When a new version of JHipster is released, the JHipster upgrade sub-generator helps upgrading an existing application to this new version, without erasing your changes.

This is helpful to:

- Have the latest JHipster features in an existing application
- Get the changes when there is an important bug fix or security update
- Retain your changes in your codebase, and merge them with newly generated code

_Please read this page carefully before doing an upgrade, to understand how the upgrade process works_

### Requirements

For this sub-generator to work you need to have `git` installed from [http://git-scm.com](http://git-scm.com/).

### Running the upgrade sub-generator

Go into the application's root directory:

`cd myapplication/`

To upgrade your application, type:

`jhipster upgrade`

Here are the options you can pass:

* `--verbose` - Log each step of the upgrade process in detail
* `--target-version 6.6.0` - Upgrade to the target version of JHipster instead of the latest release, useful if a project is several versions behind
* `--target-blueprint-versions kotlin@1.4.0,vuejs@1.3.0` - Upgrade to the target blueprints version instead of the latest release of each blueprint. The target version of a blueprint should however be compatible with the target JHipster version. 
* `--force` - Run the upgrade sub-generator even if no new JHipster version is available
* `--skip-checks` - Disable checks during project regeneration
* `--skip-install` - Skips installing dependencies during the upgrade process
* `--silent` - Hides output of the generation process

If you are doing the upgrade more than once you could consider to first upgrade the JHipster tree like this:
	
    git checkout jhipster_upgrade
	git checkout --patch master .yo-rc.json
	git checkout --patch master .jhipster
	git commit -a
	git push --set-upstream origin jhipster_upgrade
	git checkout master

With doing the above you upgrade the jhipster_upgrade tree with your latest changes so JHipster can make use of that during the upgrade. For example when you changed your model.

### Graphical view of the upgrade process

Here is how the upgrade process works graphically (read the sections below to have a textual explanation):

![GitGraph]({{ site.url }}/images/upgrade_gitgraph.png)

(this image comes from [JSFiddle](http://jsfiddle.net/lordlothar99/tqp9gyu3/) )

Please note that the `jhipster_upgrade` branch will be created orphan on your project, although it doesn't display correctly on the above graph.

### Step-by-step explanation of the upgrade process

Below are the steps processed by the JHipster upgrade sub-generator:

1. Check if there is a new version of JHipster available (not applicable if you are using `--force`).
2. Check if the application is already initialized as a `git` repository, or else JHipster will initialize one for you and commit the current codebase to the master branch.
3. Check to ensure that there are no un-committed local changes in the repository. The process will exit if there are un-committed changes found.
4. Check if a `jhipster_upgrade` branch exists. If not, a branch is created: details about this step is provided in the "Specific steps on first upgrade" section.
5. Checkout the `jhipster_upgrade` branch.
6. Upgrade JHipster to the latest available version globally.
7. Clean the current project directory.
8. Re-generate the application using the `jhipster --force --with-entities` command.
9. Commit the generated code to the `jhipster_upgrade` branch.
10. Merge the `jhipster_upgrade` branch back to the original branch from where the `jhipster upgrade` command was launched.
11. Now you need to proceed with resolving merge conflicts if there are any.

Congratulations, your application is now upgraded with the latest version of JHipster!

### Specific steps on first upgrade

On the first run of the JHipster upgrade sub-generator, in order to avoid erasing all your changes, some additional steps are run:

1. A `jhipster_upgrade` branch is created orphan (it has no parent).
2. The whole application is generated (using your current JHipster version).
3. A block-merge commit is made on the `master` branch: no alteration is made on your codebase on the `master` branch; this is a practical way to record in Git that the HEAD of `master` is up-to-date with the current JHipster version.

#### Advice

- Don't commit anything on the `jhipster_upgrade` branch. This branch is dedicated to the JHipster upgrade sub-generator: each time the sub-generator is run, a new commit will be created.

- If you are updating from a very old version (example from 5.0.0 to latest) we suggest updating gradually between each minor/patch version and performing tests to make sure the application works as expected. 

- There are some helpful approaches from the JHipster community around designing the application in such a way that makes the update process easier, and reduces the amount of merge conflicts. We recommend using [JHipster Side-by-Side approach](https://www.youtube.com/watch?v=Gg5CYoBdpVo).  

## <a name="manual_upgrade"></a> Option 2 - manual upgrade

For a manual upgrade, first upgrade your version of JHipster with:

```
npm install -g generator-jhipster
```

Delete your project `node_modules` folder and then run:

```
jhipster
```

You can also update your project and all its entities by running

```
jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
jhipster entity Foo
```

### See your own changes

If you would like to see changes you have done after generating project you can follow the steps described below.

Clone your project into the new folder with `git clone`.

Delete all files and folders from cloned project except `.git`, `.jhipster` and `.yo-rc.json`.

Find out what JHipster version you used last time to generate your project: look at the `.yo-rc.json` in the project root folder, find out the value of the `jhipsterVersion`.

Install JHipster version you used last time you generated your project:

```
npm install -g generator-jhipster@jhipsterVersionYouUsedLastTime
```

Regenerate your project:

```
jhipster --force --with-entities --skip-install
```

With `git diff` you can now see all your changes as reverted. If you would like to see all your changes as added then you can commit all to Git and then revert the last commit.

### See JHipster changes

If you would like to see changes done by JHipster you can follow the steps described below.

Generate project with JHipster version you used last time to generate your project:
* create a new folder
* copy your project `.yo-rc.json` file and `.jhipster` folder into this new folder
* find out what JHipster version you used last time to generate your project: look at the `.yo-rc.json`, find out the value of the `jhipsterVersion`
* install JHipster version you used last time to generate your project: `npm install -g generator-jhipster@jhipsterVersionYouUsedLastTime`
* in the created folder run: `jhipster --with-entities --skip-install`

Generate project with the latest JHipster:
* create a new folder
* copy your project `.yo-rc.json` file and `.jhipster` folder into this new folder
* install the latest JHipster version: `npm install -g generator-jhipster`
* in the created folder run: `jhipster --with-entities --skip-install`

Compare those 2 folders with your favorite file and folder compare tool to see changes done by JHipster.
