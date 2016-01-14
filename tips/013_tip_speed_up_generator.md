---
layout: default
title: Speed up the generator-jhipster
sitemap:
priority: 0.5
lastmod: 2015-12-29T22:22:00-00:00
---

# Speed up the generator-jhipster

__Tip submitted by [@pascalgrimaud](https://github.com/pascalgrimaud)__

When using the generator-jhipster, the command `npm install` may take several minutes, depending on your connection speed.

This tip can be used in many cases:

- for demo of JHipster, to improve your experience
- for dev team, to regenerate faster a project with `.yo-rc.json`
- for continuous integration

## Create a new project for node_modules

There are 2 types of `node_modules` directory. You can't use the same for both types of project.

- grunt
- gulp

Create a directory which will contain all `node_modules` libraries, and go into it:

```
mkdir jhipster-speedup
cd jhipster-speedup
```

Create the directory `node_modules` for grunt:

```
mkdir -p grunt/node_modules
```

Create the directory `node_modules` for gulp:

```
mkdir -p gulp/node_modules
```

The project structure is :

    jhipster-speedup
    ├── grunt
    │   ├── node_modules
    ├── gulp
    │   ├── node_modules


**Warning!** Use these 2 next commands only if your are a developer on JHipster. It will link to your fork project of generator-jhipster:

- grunt:

```
cd grunt/node_modules && npm link generator-jhipster
```

- gulp:

```
cd gulp/node_modules && npm link generator-jhipster
```

## Generating projects

Create a directory which will contain your new JHipster project, and go into it:

```
mkdir jhipster
cd jhipster
```

Depending of your choice, grunt or gulp, create a link to the directory `node_modules`:

- grunt:

```
ln -s <your path>/jhipster-speedup/grunt/node_modules
```

- gulp:

```
ln -s <your path>/jhipster-speedup/gulp/node_modules
```

Generate a new project, and answer to all questions:

```
yo jhipster
```

The first time, it will take several minutes.

The next times, it will use the existing `node_modules` directory, so npm won't download all libraries.

**Warning!** If you use specific libraries and modify your package.json, you should copy the `node_modules`
from jhipster-speedup to your folder project, instead of using a link.
