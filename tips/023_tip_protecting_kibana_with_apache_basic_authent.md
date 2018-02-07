---
layout: default
title: Protecting Kibana with Apache (Basic Authentication)
sitemap:
priority: 0.5
lastmod: 2018-01-31T14:10:00-00:00
---

# Protecting Kibana with Apache (Basic Authentication)

Tip submitted by [@raiden0610](https://github.com/raiden0610)

## mod_proxy activation

    a2enmod proxy
    a2enmod proxy_http
    a2enmod headers

    service apache2 restart

## Vitualhost configuration
Find where your virtualhost 443 or 80 config is, depending on your distros.

For example in Ubuntu 16.04: the config is on the file **000-default-le-ssl.conf** in **/etc/apache2/sites-availables** directory.

If you don’t want SSL, here is the file **000-default.conf**

Edit the file and in the virtualhost 443 or 80 section paste this :

    # Proxying kibana listenning on the port 5601 
    ProxyPreserveHost On
    ProxyRequests On
    ProxyPass / http://localhost:5601/
    ProxyPassReverse / http://localhost:5601/
    
    # Protecting with basic authentication
    <Location />
            AuthType Basic
            AuthName "Restricted Content"
            AuthUserFile /etc/apache2/.htpasswd
            Require valid-user
       </Location>

Reload apache config :

    service apache2 reload
    
## Generation of username / password

    htpasswd /etc/apache2/.htpasswd your_user
    
## Activating SSL
Follow the tutorial (you can select the ditros) :  [Let's encrypt - Certbot](https://certbot.eff.org/)

Certbot will take care of the SSL configuration in Apache automatically for you 

<div class="alert alert-warning"><i> Warning: </i>
<b>Don't forget to close the port 5601 in your firewall ! </b> because if you don't kibana will still be accessible without basic authentication on the port 5601
</div>

And voila you can now access kibana in a secure way at https://mydomain.com or http://mydomain.com