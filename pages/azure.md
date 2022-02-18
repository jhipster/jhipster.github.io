---
layout: default
title: Deploying to Microsoft Azure
permalink: /azure/
sitemap:
    priority: 0.7
    lastmod: 2018-08-24T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Deploying to Microsoft Azure

[Microsoft Azure](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-judubois) is a great solution to run JHipster applications in the cloud.

- The easiest way is to use [Azure App Service](https://azure.microsoft.com/services/app-service/?WT.mc_id=online-jhipster-judubois) to deploy your monoliths.
- If you are using Spring Boot microservices, 
 [Azure Spring Cloud](https://azure.microsoft.com/services/spring-cloud/?WT.mc_id=online-jhipster-judubois) fully supports JHipster applications.
- As with any Docker and Kubernetes cloud provider, you can use the JHipster Docker and Kubernetes support to deploy your Docker images to Microsoft Azure. Follow our [Docker Compose documentation]({{ site.url }}/docker-compose/) and our [Kubernetes documentation]({{ site.url }}/kubernetes/) for more information on these options.

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-judubois)

<h2>Deploying using NubesGen</h2>

[NubesGen](https://www.nubesgen.com) is a deployment platform that fully supports JHipster applications, and is the best solution to deploy your applications to Azure.

To deploy your JHipster application with NubesGen, select in the dropdown menu:

- "Spring Boot (Java) with Maven" to run your JHipster application with Maven.
- "Spring Boot (Java) with Gradle" to run your JHipster application with Gradle.
- "Docker with Spring Boot" to package your JHipster application with Docker and run it with Docker. Performance might be better than with Maven or Gradle, but you will have less monitoring options and no Java support from Microsoft.

Go to [the NubesGen website](https://www.nubesgen.com) for full documentation.

<h2>[Deprecated] Deploying using the "azure" sub-generator</h2>

JHipster still has an "azure" sub-generator, which is documented in our previous versions, but it is deprecated.
