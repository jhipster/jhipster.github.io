---
layout: default
title: Deploying to Microsoft Azure
permalink: /azure/
sitemap:
    priority: 0.7
    lastmod: 2018-08-24T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Deploying to Microsoft Azure

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-brborges)

Deploying JHipster applications to Microsoft Azure are as easy as deploying Docker containers. Azure supports the deployment of Uber JARs, WAR files, and Docker images, either as standalone or orchestrated on top of Kubernetes. Sub-generators are not needed for the deployment choices documented below.

Developers can obtain an [Azure Trial subscription](http://azure.microsoft.com/free?WT.mc_id=online-jhipster-brborges) and perform all the deployment options below with the free credits provided to the trial account. Some of the services covered below also offer a free quota based on hours of compute and/or number of applications, that will not incur consumption of the granted free credits.

For web applications, the best service to get started with is [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/?WT.mc_id=online-jhipster-brborges), and in general Azure comes with three key ways to deploy applications: (1) using the [Azure Dashboard](https://ms.portal.azure.com/); (2) using the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?WT.mc_id=online-jhipster-brborges) or; (3) using the [Maven Plugin](https://docs.microsoft.com/java/api/overview/azure/maven/azure-webapp-maven-plugin/readme?WT.mc_id=online-jhipster-brborges).

This documentation covers some of these methods, but not all of them and not all possible services either. For more details, check the [Azure Documentation](https://docs.microsoft.com/azure?WT.mc_id=online-jhipster-brborges) website.

Currently, Azure does not provide plugins for Gradle, so therefore some of the instructions below will be specific to Maven projects, while others can be done with the Azure CLI and other command-line tools.

## Supported Databases

JHipster applications configured to the following databases will find services that provide these data storage solutions:

- MySQL / MariaDB
  - You can create a MySQL (MariaDB compliant) instance with [Azure Database for MySQL](https://docs.microsoft.com/azure/mysql/?WT.mc_id=online-jhipster-brborges)
- PostgreSQL
  - You can create a PostgreSQL instance with [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=online-jhipster-brborges)
- MS SQL Server (MSSQL)
  - You can create an instance with [Azure SQL Database](https://docs.microsoft.com/en-us/azure/sql-database/?WT.mc_id=online-jhipster-brborges)
- Apache Cassandra / MongoDB
  - You can set compatible APIs for Cassandra or MongoDB on [Azure CosmosDB](https://docs.microsoft.com/en-us/azure/cosmos-db/?WT.mc_id=online-jhipster-brborges) instances

## Before you start

Install and authenticate with the Azure CLI on your local environment. For more information, visit these links:

- [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?WT.mc_id=online-jhipster-brborges)
- [Authenticate with Azure CLI](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli?WT.mc_id=online-jhipster-brborges)

## Monolithic JHipster Applications

Monolithic applications are the easiest to deploy, as usual. In this section we will explore how to deploy WAR artifacts from JHipster projects using the Apache Maven Plugin for Azure App Service for Web Apps:

### WAR (non-executable)

To deploy your JHipster project as a WAR file, make sure you build it with `spring-boot.repackage.skip` option enabled. This will skip building an executable WAR file and simply package the WAR file normally under `${finalName}.war`. This way you can deploy your application to a web runtime on Azure automatically configured for you.

To proceed with the deployment, follow these steps:

1. Add the following Maven Plugin configuration to your main `<build>` element of your `pom.xml`:
    ```xml
            <plugin>
                <groupId>com.microsoft.azure</groupId>
                <artifactId>azure-webapp-maven-plugin</artifactId>
                <!-- check Maven Central for the latest version -->
                <version>1.3.0</version>
                <configuration>
                    <resourceGroup>your-resource-group</resourceGroup>
                    <appName>your-app-name</appName>
                    <linuxRuntime>tomcat 9.0-jre8</linuxRuntime>-->
                </configuration>
            </plugin>
    ```
1. Build your project with the following command, and adjust your profile accordingly:
    ```sh
        ./mvnw clean package -Pdev -Dspring-boot.repackage.skip=true
    ```
1. Deploy your application:
    ```sh
        ./mvnw azure-webapp:deploy
    ```

For up-to-date information about the Maven Plugin for Azure App Service, check the [documentation](https://docs.microsoft.com/en-us/java/api/overview/azure/maven/azure-webapp-maven-plugin/readme?WT.mc_id=online-jhipster-brborges).

### Docker-based Monolithic Application

To deploy your monolithic application as a Docker container to Azure, the ideal and simplest solution is to run it on [Azure Container Instances (ACI)](https://docs.microsoft.com/en-us/azure/container-instances/?WT.mc_id=online-jhipster-brborges), which provisions Docker containers almost instantaneously. But for this you will first have to [create an Azure Container Registry (ACR)](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli?WT.mc_id=online-jhipster-brborges). You can also push your image to your Docker Hub repository and create a Docker container on ACI by pulling the image from there, but this method is insecure since your Docker image may be public to anyone to download and you risk having credentials (e.g. to databases) in your application.

Once you have an ACR created, you can generate your JHipster Docker image and push to it to later use that image on Azure Container Instances. Let's see how this works:

1. Imagine you have a JHipster application called `myjhipsterapp`.
1. Build a Docker image for your monolithic JHipster project:
    ```sh
        ./mvnw package -Pprod jib:dockerBuild
    ```
1. Tag and push your generated Docker image to your ACR instance. For example:
    ```sh
        docker tag myjhipsterapp:latest <your-acr-server>/myjhipsterapp:latest
    ```
1. Make sure your Docker CLI is authenticated to your ACR
    ```sh
        az acr login --name <acrName>
    ```
1. Push your image to your ACR instance:
    ```sh
        docker push <your-acr-server>/myjhipsterapp:latest
    ```

Now that your image is available on your Azure Container Registry, you can create a Docker container based on it on Azure Container Instances. For a complete step-by-step, please [refer to the documentation](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli?WT.mc_id=online-jhipster-brborges#deploy-image-to-aci). The steps below are for simplicity and should **not** be used in *production*:

1. Enable admin:
    ```sh
        az acr update --name <acrName> --admin-enabled true
    ```
1. Retrieve password to authenticate ACI against ACR:
    ```sh
        az acr credential show --name <acrName> --query "passwords[0].value"
    ```
1. Deploy a container with 1 CPU core and 1 GB of RAM:
    ```sh
        az container create --resource-group myResourceGroup --name myjhipsterapp --image <acrLoginServer>/myjhipsterapp:latest --cpu 1 --memory 1 --registry-username <acrName> --registry-password <acrPassword> --dns-name-label myjhipsterapp --ports 8080
    ```

## Docker containers on Kubernetes

To deploy your JHipster Microservices to Kubernetes on Azure, all you need to do is to create an Azure Kubernetes Service cluster, and configure it to your local `kubectl`. After that, you can follow the generic JHipster on Kubernetes documentation. Follow [these documented steps](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough?WT.mc_id=online-jhipster-brborges) for a complete walk-through.
