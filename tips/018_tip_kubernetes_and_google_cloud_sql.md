---
layout: default
title: Kubernetes and Google Cloud SQL
sitemap:
priority: 0.5
lastmod: 2016-11-13T19:00:00-00:00
---

# Kubernetes and Google Cloud SQL

__Tip submitted by [@bourdux](https://github.com/bourdux)__

While it is already easy to deploy a JHipster application to [Google Container Engine](https://cloud.google.com/container-engine/)
using the [Kubernetes sub-generator]({{ site.url }}/kubernetes), the default behaviour is to create a Google Compute
Engine VM for the database.

If you want to take it one step further and use a fully-managed MySQL instance, you can use [Google Cloud SQL](https://cloud.google.com/sql/).
It allows automated backups, maintenance, replication for high availability and nice scalability features.

In this tip/tutorial, I will show you how you can deploy a JHipster application on Google Cloud that will use a Google
Cloud SQL database as a MySQL backend. In order to simplify the process, we will use a monolithic application. We will
also use a Maven build since it is my favourite one :p

## Prerequisites

For this tutorial, you will need:

* A Google Cloud Platform account. You can use a [60 day free trial](https://cloud.google.com/free-trial/) with $300 worth of free credit
* [Google Cloud SDK](https://cloud.google.com/sdk/) since we will perform most of the operations from a terminal. I found the [interactive installer](https://cloud.google.com/sdk/downloads#interactive) quite convenient
* [Docker](https://www.docker.com/products/overview)
* A JHipster application using MySQL as production database

## Initialize gcloud and kubectl

First of all, if you never used `gcloud`, you need to initialize it with the following command:

    gcloud init

`gcloud` allows you to perform most the operations you could do from the Google Cloud Web console from the comfort of
your terminal. First of all, let's install `kubectl`

    gcloud components install kubectl

`kubectl` is a command line interface for running commands against Kubernetes clusters. You can also install it directly
from the [Kubernetes website](http://kubernetes.io/docs/user-guide/prereqs/) but overall I found the gcloud installation
more convenient.

Now you need to create a google cloud project. For this purpose you will need to go through the web console, as gcloud
does not allow you to create projects from CLI (not yet as it is an alpha feature). Alternatively you can use the [Resource
Manager API](https://cloud.google.com/resource-manager/docs/creating-project).

* Go to [Google Cloud Platform Console](https://console.cloud.google.com)
* Click **Create Project**
* Pick a project name, click **Create** and note the project ID, and/or customize as you feel.

For this tutorial, purpose I picked the name `jhipster-kubernetes-cloud-sql`.

Then you need to:

* Enable [billing](https://console.cloud.google.com/billing) on the project
* Enable [Container Engine API](https://console.cloud.google.com/projectselector/kubernetes/list) on the project
* Enable [API Manager](https://console.cloud.google.com/apis/dashboard) for Compute Engine, Cloud SQL and Container Engine
* Enable [Google Cloud SQL API](https://console.developers.google.com/apis/api/sqladmin/overview)

Finally you need to tell `gcloud` on which project you are currently working:

    gcloud config set project jhipster-kubernetes-cloud-sql

You can also tell it where you want your instances to be created by default. I chose `europe-west1-b` since I am a cheap
European :)

    gcloud config set compute/zone europe-west1-b

## Create a Cloud SQL instance

Then you need to create a Google Cloud SQL instance. You can do this via the web console, which is nice to get a good
understanding on the available options or once again you can use `gcloud`.

    gcloud beta sql instances create jhipster-sqlcloud-db --region=europe-west1 --tier=db-f1-micro\
     --authorized-networks=`curl -s ifconfig.co` --backup-start-time=01:00 --enable-bin-log \
     --activation-policy=ALWAYS --storage-type=HDD --storage-size=10GB


With this command we create a SQL Cloud instance called `jhipster-sql-cloud-db` in the `europe-west1` region. We choose
the smallest machine type available. To see the full list of available tiers you can use `gcloud sql tiers list`. Then we
whitelist our own ip for access with `mysql` CLI, setup a backup time window starting from 1AM UTC, enable binary logging
so we can go back in time if something goes wrong with the application. Finally we set the machine to be always activated
(necessary as second generation machines are billed per use), set up a HDD storage (SSD is more performant but more
expensive) and set the storage size to the minimum size. Note: we need to use the beta gcloud client to create second
generation SQL instances.

You can check that your instance started with the following command

    gcloud sql instances list
    NAME                   REGION        TIER         ADDRESS         STATUS
    jhipster-sqlcloud-db  europe-west1  db-f1-micro  146.148.21.155  RUNNABLE

Since we whitelisted our IP address, we should be able to access to the DB instance with `mysql`

    mysql --host=146.148.21.155 --user=root --password
    ...
    mysql>

Since we're connected to the database let us create the application database and user. Since we will be using the
[Cloud SQL proxy](https://cloud.google.com/sql/docs/sql-proxy) to connect the SQL instance from our application container,
the user hostname can be set to `cloudsqlproxy~%` if you want to only allow connections through the proxy. The application
name for this tutorial is `jhipsterGoogleCloudSql` so the database name should have the same name if we want to use the
configuration generated by JHipster.

    mysql> CREATE DATABASE jhipstergooglecloudsql;
    Query OK, 1 row affected (0,03 sec)

    mysql> CREATE USER 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> GRANT ALL PRIVILEGES ON jhipstergooglecloudsql.* TO 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> FLUSH PRIVILEGES;
    Query OK, 0 rows affected (0,02 sec)

Do not forget to change the database user to jhipster in `application-prod.yml`

## Create a container cluster

Let us create a container cluster using [GKE](https://cloud.google.com/container-engine/docs/)

    gcloud container clusters create jhipster-sqlcloud-cluster --zone=europe-west1-b --machine-type=g1-small --num-nodes=1

For this tutorial, we will use only 1 small node. In production, you will want at least 3 nodes :)

Let us then get kubectl get proper credentials for this cluster

    gcloud container clusters get-credentials jhipster-sqlcloud-cluster

    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for jhipster-sqlcloud-cluster.

## Building and pushing the docker image

First of all run the [Kubernetes sub-generator]({{ site.url }}/kubernetes). Reply to the questions as usual but let us
use Container engine by pushing our docker image on Google Cloud. To the question "What should we use for the base Docker
repository name?", reply by `gcr.io/jhipster-kubernetes-cloud-sql`. Replace with your project ID. For the docker image push
command let us use `gcloud docker -- push` in order to push to the project container repository.

Build your image

    mvn package -Pprod jibDockerBuild

Tag the image (replace with your jhipster application name). We use v1 as a tag to be able to easily deploy new versions
of the application or rollback if something goes horribly wrong.

    docker image tag jhipstergooglecloudsql gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

You can then push the image to Google Container engine as follows:

    gcloud docker -- push gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

## Get the credentials and register them with Kubernetes

In order to use the Cloud SQL proxy, we will have to create credentials for our application and to register them to
Kubernetes. The full process is available in the [Cloud SQL container engine connection documentation](https://cloud.google.com/sql/docs/container-engine-connect)
but let me summarize the commands here.

Create a service account for your JHipster application

    gcloud iam service-accounts create jhipster-application --display-name="JHipster application"

Get the full iam account name (email used to generate key)

    gcloud iam service-accounts list
    NAME                                    EMAIL
    JHipster application                    jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com

Give editor access to the project to the service account

    gcloud projects add-iam-policy-binding jhipster-kubernetes-cloud-sql \
     --member serviceAccount:jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com \
     --role roles/editor

Create the key and store it in `jhipster-credentials.json`

    gcloud iam service-accounts keys create \
    --iam-account jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com jhipster-credentials.json

We will use this key later when

Register the key with `kubectl`

    kubectl create secret generic cloudsql-oauth-credentials --from-file=credentials.json=jhipster-credentials.json

## Modify the Kubernetes deployment config

First of all you can delete the generated mysql deployment file since we are going with a Cloud SQL instance.

Then we need to change a few things in `jhipstergooglecloudsql-deployment.yml`. First of all the Spring data source URL
should be changed to localhost since we will be using a Cloud SQL proxy:

    jdbc:mysql://localhost:3306/jhipstergooglecloudsql?useUnicode=true&characterEncoding=utf8&useSSL=false

Then you can add the version number to the container image:

    image: gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

Then we need to add an entry to deploy the cloud sql proxy with the sidecar pattern:

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

As we may have noted, we also need to provide SSL certificates to communicate with Google API so we can connect to our
Cloud SQL instance.

And finally add the appropriate volumes:

    volumes:
      - name: cloudsql-oauth-credentials
        secret:
          secretName: cloudsql-oauth-credentials
      - name: ssl-certs
        hostPath:
          path: /etc/ssl/certs

The full deployment file should now look like this:

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


You can then deploy the cluster with `kubectl apply`

    kubectl apply -f jhipstergooglecloudsql

    deployment "jhipstergooglecloudsql" created
    service "jhipstergooglecloudsql" created


Then you can get the external IP through `kubectl get services` and test your application

    kubectl get services jhipstergooglecloudsql
    NAME                     CLUSTER-IP     EXTERNAL-IP     PORT(S)    AGE
    jhipstergooglecloudsql   10.95.251.18   104.199.51.11   8080/TCP   1m
