---
layout: default
title: Speed up the generator-jhipster
sitemap:
priority: 0.5
lastmod: 2016-05-15T22:22:00-00:00
---

# Speed up the generator-jhipster

__Tip submitted by [@pascalgrimaud](https://github.com/pascalgrimaud)__

**Warning!** Those tips don't work for npm 3+ because it uses symlink.

When using the generator-jhipster, the command `npm install` may take several minutes, depending on your connection speed.

This tip can be used in many cases:

- for demo of JHipster, to improve your experience
- for dev team, to regenerate faster a project with `.yo-rc.json`
- for continuous integration

## Create a new project for node_modules

Create a directory which will contain all `node_modules` libraries, and go into it:

```
mkdir jhipster-speedup
cd jhipster-speedup
```

Create the directory `node_modules`:

```
mkdir -p node_modules
```

The project structure is :

    jhipster-speedup
    ├── node_modules


**Warning!** Use this next command only if your are a developer on JHipster. It will link to your fork project of generator-jhipster:

```
npm link generator-jhipster
```

## Generating projects

Create a directory which will contain your new JHipster project, and go into it:

```
mkdir jhipster
cd jhipster
```

Create a link to the directory `node_modules`:

```
ln -s <your path>/jhipster-speedup/node_modules
```

Generate a new project, and answer to all questions:

```
jhipster
```

The first time, it will take several minutes.

The next times, it will use the existing `node_modules` directory, so npm won't download all libraries.

**Warning!** If you use specific libraries and modify your package.json, you should copy the `node_modules`
from jhipster-speedup to your folder project, instead of using a link.
