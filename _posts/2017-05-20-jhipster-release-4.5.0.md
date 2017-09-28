---
layout: default
title: Release 4.5.0
---

JHipster release 4.5.0
==================

Introducing the JHipster CLI
----------

This new release has a very important update, that will affect everyone: the JHipster CLI!

This means that instead of typing `yo jhipster`, you will just type `jhipster` on the command line.

- Everybody will gain 3 keystrokes, an important productivity enhancement :-)
- Most importantly, this allows us to provide autocompletion (only on Mac and Linux), which means you can use the tab key after entering `jhipster`. As this is the first release, we only provide basic autocompletion for the moment, but you can expect more in the future.

OpenShift support by Red Hat
----------

Please note that this is an **official contribution from Red Hat** to the project!

Thanks to the incredible work of [Srinivasa Vasu](https://twitter.com/srinivasavasu), we now have support for deploying JHipster applications to OpenShift. Find more information on [our OpenShift documentation page]({{ site.url }}/openshift/).

Bug fixes and improvements
----------

This release contains 63 closed tickets and Pull Requests:

- Several annoying bugs have been fixed, like [#5786](https://github.com/jhipster/generator-jhipster/issues/5786), which makes this a recommended update
- Lots of unit tests and polishing, giving us an incredible score of 96.2% code coverage on our sample project! Many thanks to [Christophe Bornet](https://twitter.com/cbornet_) on this part.
- Many library upgrades, as usual

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

Please note that with our new JHipster CLI release, the new command will be:

```
jhipster upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
yarn global upgrade generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
