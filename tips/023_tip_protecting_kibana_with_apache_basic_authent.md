---
layout: default
title: Protéger Kibana avec Apache (Authentification de base)
sitemap:
priority: 0.5
lastmod: 2018-01-31T14:10:00-00:00
---

# Protéger Kibana avec Apache (Authentification de base)

Conseil soumis par [@raiden0610](https://github.com/raiden0610)

## Activation de mod_proxy

```bash
a2enmod proxy
a2enmod proxy_http
a2enmod headers

service apache2 restart

## Configuration du VirtualHost
Trouvez où se trouve votre configuration de virtualhost 443 ou 80, selon votre distribution.

Par exemple, sur Ubuntu 16.04 : la configuration se trouve dans le fichier  **000-default-le-ssl.conf** in **/etc/apache2/sites-availables** dans le répertoire.

Si vous ne souhaitez pas utiliser SSL, voici le fichier **000-default.conf**

Modifiez le fichier et dans la section virtualhost 443 ou 80, collez ceci :

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

Rechargez la configuration d'Apache :

    service apache2 reload
    
## Génération de nom d'utilisateur / mot de passe

    htpasswd /etc/apache2/.htpasswd your_user
    
## Activation de SSL
Suivez le tutoriel (vous pouvez sélectionner votre distribution) :  [Let's encrypt - Certbot](https://certbot.eff.org/)

Certbot se chargera automatiquement de la configuration SSL dans Apache pour vous.

<div class="alert alert-warning"><i> Attention: </i>
<b>N'oubliez pas de fermer le port 5601 dans votre pare-feu ! </b> Car sinon, Kibana sera toujours accessible sans authentification de base sur le port 5601.
</div>

Et voilà, vous pouvez maintenant accéder à Kibana de manière sécurisée à l'adresse  https://mydomain.com ou http://mydomain.com