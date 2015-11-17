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

        @RequestMapping(value = "/login**", method = RequestMethod.GET)
        public void loginRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/activate*", method = RequestMethod.GET)
        public void activateRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/password*", method = RequestMethod.GET)
        public void passwordRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/register*", method = RequestMethod.GET)
        public void registerRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/reset/finish*", method = RequestMethod.GET)
        public void resetFinishRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/reset/request*", method = RequestMethod.GET)
        public void resetRequestRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/sessions*", method = RequestMethod.GET)
        public void sessionsRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/settings*", method = RequestMethod.GET)
        public void settingsRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/social-register/*", method = RequestMethod.GET)
        public void socialRegisterRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/audits*", method = RequestMethod.GET)
        public void auditsRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/configuration*", method = RequestMethod.GET)
        public void configurationRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/docs*", method = RequestMethod.GET)
        public void docsRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/health*", method = RequestMethod.GET)
        public void healthRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/logs*", method = RequestMethod.GET)
        public void logsRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/metrics*", method = RequestMethod.GET)
        public void metricsRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/user-management*", method = RequestMethod.GET)
        public void userManagementRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/user-management/*", method = RequestMethod.GET)
        public void userManagementExtraRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/error*", method = RequestMethod.GET)
        public void errorRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        @RequestMapping(value = "/accessdenied*", method = RequestMethod.GET)
        public void accessdeniedRedirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            redirect(httpRequest, httpResponse);
        }

        private void redirect(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
            RequestDispatcher dispatcher = httpRequest.getRequestDispatcher("index.html");
            try {
                dispatcher.forward(httpRequest, httpResponse);
            } catch (Exception e) {
                log.error("Error forwarding request", e);
            }
        }
    }