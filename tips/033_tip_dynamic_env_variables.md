---
layout: default
title: Dynamic environment variables in the front end
sitemap:
priority: 0.1
lastmod: 2020-07-01T10:50:00-00:00
---
# Dynamic environment variables in the front end

__Tip submitted by [@yelhouti](https://github.com/yelhouti)__

Let's say you need to update the value of a variable in the front end after your code have been compiled. (ex: your IdP Url, the email to use for contacts...)

One way is to have it as part of your application.yml and have the backend return it to the front using a new custom endpoint, the same way we do in: `AuthInfoResource.java` when using OAuth2.

Another way that removes the need for this endpoint and offers better flexibility and less code is to have a new file called `env.js` that looks like this:

```javascript
window.__env = window.__env || {};
window.__env.myDynamicVariable = 'http://127.0.0.1:8090';
```

The code below creates a global `__env` variable if not already declared.

it can be accessed in your angular files but we recommend exposing it through constants.ts like this:
```typescipt
@ts-ignore
export const MY_DYNAMIC_VARIABLE = window.__env.myDynamicVariable;
```
When using kubernetes, a file with this format can be mounted as a configMap, this is why we keep such a simple key value syntax.

Now we need to make sure that `index.html` loads it by adding the script tag in the `<head>` like this:
```html
    ...
    <!-- jhipster-needle-add-resources-to-root - JHipster will add new resources here -->
    <script src="env.js"></script>
```
and we tell webpack to copy it, as is, with the packaged code:
```javascipt
// jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
{ from: './<%= MAIN_SRC_DIR %>env.js', to: 'env.js' },
```

We recommend adding the file to the `.eslintignore.ejs` for the clean syntax:
```
src/main/webapp/env.js
```

Next step is to work on a blueprint that does all of this.
