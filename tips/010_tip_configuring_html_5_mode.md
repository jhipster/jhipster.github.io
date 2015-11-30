---
layout: default
title: Configuring HTML 5 mode
sitemap:
priority: 0.5
lastmod: 2015-11-04T23:23:00-00:00
---

# Configuring HTML 5 mode

__Tip submitted by [@brevleq](https://github.com/brevleq)__

As you may noticed, AngularJS uses a "#" in it's urls. HTML5Mode of AngularJS removes these "#" from URL.

## Activate HTML 5 Mode

Open the `app.js` file and add this line in `config` method:

    $locationProvider.html5Mode({ enabled: true, requireBase: true });

Then open `index.html` and add this line in `head` tag:

    <base href="/">
    
## Redirection filter     
    
Now, to have relative paths links working correctly (ex. activation link sent to user e-mail) we will create a controller to forward the URI to index.html:
    
    @Controller
    public class AngularJSForwardController {

        private final Logger log = LoggerFactory.getLogger(AngularJSForwardController.class);

        @RequestMapping(value = {"/login**","/activate*","/password*","/register*","/reset/finish*",
                                 "/reset/request*","/sessions*","/settings*","/social-register/*",
                                 "/audits*","/configuration*","/docs*","/health*","/logs*","/metrics*",
                                 "/user-management*","/user-management/*","/error*","/accessdenied*"},
                                  method = RequestMethod.GET)
        public void pageForward(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }           

        private void forward(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            RequestDispatcher dispatcher = httpRequest.getRequestDispatcher("/index.html");
            try {
                dispatcher.forward(httpRequest, httpResponse);
            } catch (Exception e) {
                log.error("Error forwarding request", e);
            }
        }
    }