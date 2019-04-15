---
layout: default
title: Issue of @OneToOne with @MapsId and how to avoid it
sitemap:
priority: 0.1
lastmod: 2019-03-05T18:20:00-00:00
---

# Issue of @OneToOne with @MapsId and how to avoid it

__Tip submitted by [@pmverma](https://github.com/pmverma)__

Following is a known issue regarding using `@OneToOne` with `@MapsId` and some tips to avoid it.
### The issue
Let's say you have a `Preference` class which you have associated to `User` with `@OneToOne @MapsId`.
```
class Preference {
        @OneToOne
        @MapsId
        private User user;
}
```
Normally with JHipster, 
1. When you add a `preference`  for a user, you will fill the data and select a user `user01` login from dropdown and save.
2. If you want to edit the same `preference`, you will still have the option to select user and if you select `user02` this time then backend side will have the `user02` in `preference` object for the whole request lifetime.
3.  Again if you reload the same `preference` then you will see that `user01` is there, not `user02`.

The incorrect part here is:
 **`user02` in `preference` object in no.2 step.** The user object in `preference` should always refer to `user01`.
 
 For more information, take a look at [https://github.com/jhipster/generator-jhipster/issues/9100](https://github.com/jhipster/generator-jhipster/issues/9100)
 
 ### Tips to avoid it
 
 * Hide the dropdown and set the current user in `preference` **at client side** programmatically. (Again this kind of solution is only valid for entities such as Preference, Settings, User Profile and so on, where having a dropdown to choose user does not makes sense. )
 * Hide the dropdown and set the current user in `preference` **at server side** programmatically. (Again this kind of solution is only valid for entities such as Preference, Settings, User Profile and so on, where having a dropdown to choose user does not makes sense. JHipster have already provided a method to get current user.)
 * Validate and load the correct association value before doing any business logic on that user. (Again this is needed only if your logic depends on `preference.gerUser()`
 * If you are using Hibernate 5.4.2 and later then you will get correct association value but only after entity merge operation has finished. So if your business logic is excuted before entity merge operation, you have to take care of it otherwise you might get incorrect results.
