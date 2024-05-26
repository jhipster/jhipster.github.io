---
layout: default
title: Kubernetes et Google Cloud SQL
sitemap:
priority: 0.5
lastmod: 2016-11-13T19:00:00-00:00
---

# Kubernetes et Google Cloud SQL

__Conseil soumis par [@bourdux](https://github.com/bourdux)__

Alors qu'il est déjà facile de déployer une application JHipster sur [Google Container Engine](https://cloud.google.com/container-engine/) en utilisant le [sous-générateur Kubernetes]({{ site.url }}/kubernetes), le comportement par défaut est de créer une VM Google Compute Engine pour la base de données.

Si vous souhaitez aller plus loin et utiliser une instance MySQL entièrement gérée, vous pouvez utiliser [Google Cloud SQL](https://cloud.google.com/sql/). Il permet des sauvegardes automatisées, la maintenance, la réplication pour une haute disponibilité et de belles fonctionnalités de scalabilité.

Dans ce conseil/tutoriel, je vais vous montrer comment déployer une application JHipster sur Google Cloud qui utilisera une base de données Google Cloud SQL en tant que backend MySQL. Afin de simplifier le processus, nous utiliserons une application monolithique. Nous utiliserons également une construction Maven puisque c'est ma préférée :p

## Prérequis

Pour ce tutoriel, vous aurez besoin de :

* Un compte Google Cloud Platform. Vous pouvez utiliser un [essai gratuit de 60 jours](https://cloud.google.com/free-trial/) avec 300 $ de crédit gratuit
* [Google Cloud SDK](https://cloud.google.com/sdk/) car nous effectuerons la plupart des opérations depuis un terminal. J'ai trouvé l'[installateur interactif](https://cloud.google.com/sdk/downloads#interactive) assez pratique
* [Docker](https://www.docker.com/products/overview)
* Une application JHipster utilisant MySQL comme base de données de production

## Initialiser gcloud et kubectl

Tout d'abord, si vous n'avez jamais utilisé `gcloud`, vous devez l'initialiser avec la commande suivante :

    gcloud init

`gcloud` vous permet d'effectuer la plupart des opérations que vous pourriez faire depuis la console Web de Google Cloud depuis le confort de votre terminal. Tout d'abord, installons `kubectl`

    gcloud components install kubectl

`kubectl` est une interface de ligne de commande pour exécuter des commandes contre des clusters Kubernetes. Vous pouvez également l'installer directement depuis le [site Web de Kubernetes](http://kubernetes.io/docs/user-guide/prereqs/) mais dans l'ensemble, j'ai trouvé l'installation avec gcloud plus pratique.

Maintenant, vous devez créer un projet Google Cloud. Pour cela, vous devrez passer par la console Web, car gcloud ne vous permet pas de créer des projets depuis l'interface CLI (pas encore car c'est une fonctionnalité alpha). Vous pouvez également utiliser l'[API du gestionnaire de ressources](https://cloud.google.com/resource-manager/docs/creating-project).

* Allez sur [Google Cloud Platform Console](https://console.cloud.google.com)
* Cliquez sur **Créer un projet**
* Choisissez un nom de projet, cliquez sur **Créer** et notez l'ID du projet, et/ou personnalisez comme vous le souhaitez.

Pour ce tutoriel, j'ai choisi le nom `jhipster-kubernetes-cloud-sql`.

Ensuite, vous devez :

* Activer [la facturation](https://console.cloud.google.com/billing) sur le projet
* Activer [l'API Engine de conteneurs](https://console.cloud.google.com/projectselector/kubernetes/list) sur le projet
* Activer [API Manager](https://console.cloud.google.com/apis/dashboard) pour Compute Engine, Cloud SQL et Container Engine
* Activer [Google Cloud SQL API](https://console.developers.google.com/apis/api/sqladmin/overview)

Enfin, vous devez indiquer à `gcloud` sur quel projet vous travaillez actuellement :

    gcloud config set project jhipster-kubernetes-cloud-sql

Vous pouvez également lui indiquer où vous voulez que vos instances soient créées par défaut. J'ai choisi `europe-west1-b` car je suis un Européen économe :)

    gcloud config set compute/zone europe-west1-b

## Créer une instance Cloud SQL

Ensuite, vous devez créer une instance Google Cloud SQL. Vous pouvez le faire via la console Web, ce qui est pratique pour comprendre les options disponibles, ou encore une fois vous pouvez utiliser `gcloud`.

    gcloud beta sql instances create jhipster-sqlcloud-db --region=europe-west1 --tier=db-f1-micro\
     --authorized-networks=`curl -s ifconfig.co` --backup-start-time=01:00 --enable-bin-log \
     --activation-policy=ALWAYS --storage-type=HDD --storage-size=10GB

Avec cette commande, nous créons une instance SQL Cloud appelée `jhipster-sql-cloud-db` dans la région `europe-west1`. Nous choisissons le plus petit type de machine disponible. Pour voir la liste complète des niveaux disponibles, vous pouvez utiliser `gcloud sql tiers list`. Ensuite, nous autorisons notre propre IP pour l'accès avec `mysql` CLI, configurons une fenêtre de sauvegarde à partir de 1 heure UTC, activons la journalisation binaire afin de pouvoir revenir en arrière si quelque chose ne va pas avec l'application. Enfin, nous configurons la machine pour être toujours activée (nécessaire car les machines de deuxième génération sont facturées à l'utilisation), configurons un stockage HDD (SSD est plus performant mais plus cher) et configurons la taille de stockage à la taille minimale. Remarque : nous devons utiliser le client gcloud bêta pour créer des instances SQL de deuxième génération.

---
layout: default
title: Kubernetes and Google Cloud SQL
sitemap:
priority: 0.5
lastmod: 2016-11-13T19:00:00-00:00
---

Vous pouvez vérifier que votre instance a démarré avec la commande suivante

    gcloud sql instances list
    NAME                   REGION        TIER         ADDRESS         STATUS
    jhipster-sqlcloud-db  europe-west1  db-f1-micro  146.148.21.155  RUNNABLE

Comme nous avons autorisé notre adresse IP, nous devrions pouvoir accéder à l'instance de la base de données avec `mysql`

    mysql --host=146.148.21.155 --user=root --password
    ...
    mysql>

Maintenant que nous sommes connectés à la base de données, créons la base de données de l'application et l'utilisateur. Puisque nous utiliserons le 
[proxy Cloud SQL ](https://cloud.google.com/sql/docs/sql-proxy) pour connecter l'instance SQL depuis notre conteneur d'application, le nom d'hôte de l'utilisateur peut être défini sur  `cloudsqlproxy~%` si vous voulez autoriser uniquement les connexions via le proxy. Le nom de l'application pour ce tutoriel est `jhipsterGoogleCloudSql` donc le nom de la base de données doit avoir le même nom si nous voulons utiliser la configuration générée par JHipster.

    mysql> CREATE DATABASE jhipstergooglecloudsql;
    Query OK, 1 row affected (0,03 sec)

    mysql> CREATE USER 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> GRANT ALL PRIVILEGES ON jhipstergooglecloudsql.* TO 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> FLUSH PRIVILEGES;
    Query OK, 0 rows affected (0,02 sec)

N'oubliez pas de changer l'utilisateur de la base de données en jhipster dans `application-prod.yml`

## Créer un cluster de conteneurs

Créons ensuite un cluster de conteneurs en utilisant [GKE](https://cloud.google.com/container-engine/docs/)

    gcloud container clusters create jhipster-sqlcloud-cluster --zone=europe-west1-b --machine-type=g1-small --num-nodes=1

Pour ce tutoriel, nous n'utiliserons qu'un seul petit nœud. En production, vous voudrez au moins 3 nœuds :)

Obtenons ensuite les bonnes informations pour kubectl pour ce cluster

    gcloud container clusters get-credentials jhipster-sqlcloud-cluster

    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for jhipster-sqlcloud-cluster.

## Construction et envoi de l'image Docker

Tout d'abord, exécutez le [sous-générateur Kubernetes]({{ site.url }}/kubernetes). Répondez aux questions comme d'habitude, mais utilisons
Container Engine en poussant notre image Docker sur Google Cloud. À la question "Que devons-nous utiliser pour le nom de référentiel Docker de base ?", répondez par`gcr.io/jhipster-kubernetes-cloud-sql`. Remplacez par l'ID de votre projet. Pour la commande de poussée d'image Docker, utilisons `gcloud docker -- push` afin de pousser vers le référentiel de conteneurs du projet.

Construisez votre image

    mvn package -Pprod jibDockerBuild

Taguez l'image (remplacez par le nom de votre application jhipster). Nous utilisons v1 comme balise pour pouvoir déployer facilement de nouvelles versions
de l'application ou revenir en arrière si quelque chose se passe horriblement mal.

    docker image tag jhipstergooglecloudsql gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

Vous pouvez ensuite pousser l'image vers Google Container Engine comme suit:

    gcloud docker -- push gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

## Obtenez les informations d'identification et enregistrez-les avec Kubernetes

Afin d'utiliser le proxy Cloud SQL, nous devrons créer des informations d'identification pour notre application et les enregistrer dans Kubernetes. Le processus complet est disponible dans la  [documentation sur la connexion du moteur de conteneur Cloud SQL ](https://cloud.google.com/sql/docs/container-engine-connect)
mais permettez-moi de résumer les commandes ici.

Créez un compte de service pour votre application JHipster

    gcloud iam service-accounts create jhipster-application --display-name="JHipster application"

Obtenez le nom complet du compte iam (adresse e-mail utilisée pour générer la clé)

    gcloud iam service-accounts list
    NAME                                    EMAIL
    JHipster application                    jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com

Donnez un accès d'éditeur au projet au compte de service

    gcloud projects add-iam-policy-binding jhipster-kubernetes-cloud-sql \
     --member serviceAccount:jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com \
     --role roles/editor

Créez la clé et enregistrez-la dans `jhipster-credentials.json`

    gcloud iam service-accounts keys create \
    --iam-account jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com jhipster-credentials.json

Nous utiliserons cette clé plus tard lorsque

Enregistrez la clé avec `kubectl`

    kubectl create secret generic cloudsql-oauth-credentials --from-file=credentials.json=jhipster-credentials.json

## Modifier la configuration de déploiement Kubernetes

Tout d'abord, vous pouvez supprimer le fichier de déploiement mysql généré car nous allons utiliser une instance Cloud SQL.

Ensuite, nous devons modifier quelques éléments dans  `jhipstergooglecloudsql-deployment.yml`. Tout d'abord, l'URL de la source de données Spring doit être modifiée en localhost car nous utiliserons un proxy Cloud SQL:

    jdbc:mysql://localhost:3306/jhipstergooglecloudsql?useUnicode=true&characterEncoding=utf8&useSSL=false

Ensuite, vous pouvez ajouter le numéro de version à l'image du conteneur:

    image: gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

Ensuite, nous devons ajouter une entrée pour déployer le proxy cloud sql avec le modèle de sidecar:

    - image: b.gcr.io/cloudsql-docker/gce-proxy:1.05
      name: cloudsql-proxy
      command: ["/cloud_sql_proxy", "--dir=/cloudsql",
                "-instances=jhipster-kubernetes-cloud-sql:europe-west1:jhipster-sqlcloud-db=tcp:3306",
                "-credential_file=/secrets/cloudsql/credentials.json"]
      volumeMounts:
        - name: cloudsql-oauth-credentials
          mountPath: /secrets/cloudsql
          readOnly: true
        - name: ssl-certs
          mountPath: /etc/ssl/certs

Comme nous l'avons peut-être remarqué, nous devons également fournir des certificats SSL pour communiquer avec l'API Google afin de pouvoir nous connecter à notre instance Cloud SQL.

Et enfin, ajoutez les volumes appropriés:

    volumes:
      - name: cloudsql-oauth-credentials
        secret:
          secretName: cloudsql-oauth-credentials
      - name: ssl-certs
        hostPath:
          path: /etc/ssl/certs

Le fichier de déploiement complet devrait maintenant ressembler à ceci:

    apiVersion: extensions/v1beta1
    kind: Deployment
    metadata:
      name: jhipstergooglecloudsql
    spec:
      replicas: 1
      template:
        metadata:
          labels:
            app: jhipstergooglecloudsql
        spec:
          containers:
          - name: jhipstergooglecloudsql
            image: gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1
            env:
            - name: SPRING_PROFILES_ACTIVE
              value: prod
            - name: SPRING_DATASOURCE_URL
              value: jdbc:mysql://localhost:3306/jhipstergooglecloudsql?useUnicode=true&characterEncoding=utf8&useSSL=false
            ports:
            - containerPort: 8080
          - image: b.gcr.io/cloudsql-docker/gce-proxy:1.05
            name: cloudsql-proxy
            command: ["/cloud_sql_proxy", "--dir=/cloudsql",
                      "-instances=jhipster-kubernetes-cloud-sql:europe-west1:jhipster-sqlcloud-db=tcp:3306",
                      "-credential_file=/secrets/cloudsql/credentials.json"]
            volumeMounts:
              - name: cloudsql-oauth-credentials
                mountPath: /secrets/cloudsql
                readOnly: true
              - name: ssl-certs
                mountPath: /etc/ssl/certs
          volumes:
            - name: cloudsql-oauth-credentials
              secret:
                secretName: cloudsql-oauth-credentials
            - name: ssl-certs
              hostPath:
                path: /etc/ssl/certs


Ensuite, vous pouvez déployer le cluster avec `kubectl apply`

    kubectl apply -f jhipstergooglecloudsql

    deployment "jhipstergooglecloudsql" created
    service "jhipstergooglecloudsql" created


Ensuite, vous pouvez obtenir l'adresse IP externe via `kubectl get services` et tester votre application

    kubectl get services jhipstergooglecloudsql
    NAME                     CLUSTER-IP     EXTERNAL-IP     PORT(S)    AGE
    jhipstergooglecloudsql   10.95.251.18   104.199.51.11   8080/TCP   1m
