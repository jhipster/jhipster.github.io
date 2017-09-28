---
layout: default
title: Release 0.9.3
---

JHipster release 0.9.3
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

We corrected two JavaScript libraries issues:

* Angular-Translate 2.0.0, which was released today, was marked compatible by Bower but had an API change, see [#125](https://github.com/jhipster/generator-jhipster/issues/125)
* JQuery 2.1.0 was modified a couple of days ago, and they changed their directories. As this looks quite unstable, we downgraded to JQuery 2.0.3. See [#124](https://github.com/jhipster/generator-jhipster/issues/124)

How to upgrade
------------

Update your version of JHipster with:

```
npm update -g generator-jhipster
```

And then you can update your project when you run again

```
yo jhipster
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
