---
layout: default
title: Running Protractor e2e tests within IntelliJ IDEA
sitemap:
priority: 0.1
lastmod: 2018-04-14T03:57:00-00:00
---

# Running Protractor e2e tests within IntelliJ IDEA

**Tip submitted by [@SudharakaP](https://github.com/SudharakaP) and [@yelhouti](https://github.com/yelhouti)**

This tip applies for JHipster v6.8.0 or above. By default, a JHipster project will have the following `beforeLanuch` 
function within the Protractor configuration file (`src/test/javascript/protractor.conf.js`). 

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: 'tsconfig.e2e.json'
    });
}
``` 

This will work well if Protractor tests are executed by running `npm run e2e` in the root folder of the project.

However, IntelliJ Ultimate also supports [running Protractor tests within the IDE](https://www.jetbrains.com/help/idea/protractor.html#ws_protractor_running). 
If you want to use this method you will have to alter the `beforeLanuch` function as shown below; 

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: '../../../tsconfig.e2e.json'
    });
}
``` 
so that IntelliJ will know where to find the `tsconfig.e2e.json` file. 

Note that after altering the `protractor.conf.js` file as above, `npm run e2e` will not work anymore so you'll have to 
rollback if you plan on using e2e tests using npm again. 