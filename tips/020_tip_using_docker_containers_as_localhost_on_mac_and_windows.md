---
layout: default
title: Utiliser des conteneurs Docker comme localhost sur Mac/Windows
sitemap:
priority: 0.5
lastmod: 2016-11-15T16:00:00-00:00
---

# Utiliser des conteneurs Docker comme localhost sur Mac/Windows

__Conseil soumis par [@Akuka](https://github.com/Akuka)__

## Différence entre Docker sur Linux et Docker sur Mac/Windows

Selon votre système d'exploitation, votre <code>DOCKER_HOST</code> est différent.
Sur Linux, ce sera simplement votre localhost.
Pour Mac/Windows, vous devriez obtenir l'IP appropriée en utilisant la commande suivante :

```
docker-machine ip default
```

## Motivation

Lorsque vous générez une nouvelle application JHipster, l'adresse hôte de toutes les configurations de connexion (par exemple : chaîne de connexion de la base de données) est localhost par défaut.
Cela signifie que si vous utilisez Docker pour exécuter des services (comme une base de données / Elasticsearch / serveur SMTP / etc...), vous devrez modifier le fichier de configuration de votre application et remplacer l'adresse IP de la base de données par votre <code>DOCKER_HOST</code>.

## Redirection de port

Une machine Docker est une machine virtuelle fonctionnant sous VirtualBox sur votre machine hôte.
Nous pouvons utiliser la fonctionnalité de redirection de port de VirtualBox afin d'accéder à la machine Docker en tant que localhost.

Pour cela, suivez les étapes suivantes :

Tout d'abord, assurez-vous que votre machine Docker est arrêtée en exécutant la commande suivante :

```
docker-machine stop default    # Le nom de votre machine Docker peut ne pas être default, dans ce cas, changez le nom en conséquence
```

Ensuite:

* Ouvrez VirtualBox Manager
* Sélectionnez l'image VirtualBox de votre machine Docker (par exemple : default)
* Ouvrez Paramètres -> Réseau -> Avancé -> Redirection de port
* Ajoutez le nom de votre application, le port hôte désiré et le port invité

Voici une capture d'écran avec un exemple de redirection de port MySQL :

![Exemple de redirection de port MySQL](../images/020_tip_using_docker_containers_as_localhost_on_mac_and_windows_01.png)

Maintenant, vous êtes prêt à démarrer votre machine Docker en exécutant la commande suivante :

```
docker-machine start default
eval $(docker-machine env default)
```

Ensuite, lancez simplement votre conteneur Docker et vous pourrez y accéder via localhost.

