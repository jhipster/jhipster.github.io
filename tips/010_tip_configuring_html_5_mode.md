---
layout: default
title: Configuring HTML 5 mode
sitemap:
priority: 0.5
lastmod: 2016-03-07T23:23:00-00:00
---

# Configuring HTML 5 mode

__Tip submitted by [@brevleq](https://github.com/brevleq) and updated by [@wmarques](https://github.com/wmarques)__

As you may noticed, AngularJS uses a "#" in it's urls. HTML5Mode of AngularJS removes these "#" from URL.

## Activate HTML 5 Mode

Create `html5.mode.config.js` file in `webapp/app/blocks/config/` directory:

    (function() {
      'use strict';

      angular
        .module('<YourAppName>')
        .config(html5ModeConfig);

      html5ModeConfig.$inject = ['$locationProvider'];

      function html5ModeConfig($locationProvider) {
        $locationProvider.html5Mode({ enabled: true, requireBase: true });
      }
    })();

Then open `index.html` and add this line in `head` tag:

    <base href="/">

## Redirection filter     

Now, to have relative paths links working correctly (ex. activation link sent to user e-mail) we will create a controller to forward the URI to index.html:

    @Controller
    public class AngularJsForwardController {
        @RequestMapping(value = "/**/{[path:[^\\.]*}")
        public String redirect() {
            return "forward:/";
        }
    }

Please note that this can cause conflicts with [Spring actuators URLs](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html).

That's why you have to edit urls of the `metric.js` and `health.js`. First, open `webapp\app\admin\health\health.js` and change:

    url: '/health' -> url: '/apphealth'

Then do the same with `webapp\app\admin\metrics\metrics.js`:

    url: '/metrics' -> url: '/appmetrics'

Then if you use gulp , you must to edit the file `gulp\serve.js` and replace `proxyRoutes` variable by:

    var proxyRoutes = [
        '/'
    ];

Finally, to make the home link in the navigation bar work, open `webapp\app\layouts\navbar\navbar.html` and change:

    <a class="navbar-brand" href="#/"> -> <a class="navbar-brand" href="/">
