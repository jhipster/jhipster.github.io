---
layout: default
title: Deploying to Microsoft Azure
permalink: /azure/
sitemap:
    priority: 0.7
    lastmod: 2018-08-24T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Deploying to Microsoft Azure

[Microsoft Azure](https://azure.microsoft.com/overview/?WT.mc_id=java-0000-judubois) is a great solution to run JHipster applications in the cloud.

- The easiest way is to use [JHipster Azure Spring Apps](https://github.com/Azure/generator-jhipster-azure-spring-apps) to create and deploy your project from end to end. JHipster Azure Spring Apps is designed to streamline your full-stack Spring application development, leveraging the robust infrastructure of Azure Spring Apps to bring your projects to life with unprecedented ease and efficiency.
- If you are using Spring Boot microservices, [Azure Spring Apps](https://azure.microsoft.com/services/spring-apps/?WT.mc_id=online-jhipster-judubois) fully supports JHipster applications. You can read more on the [Quickstart](https://learn.microsoft.com/azure/spring-apps/quickstart-deploy-microservice-apps).
- You can also try [Azure App Service](https://azure.microsoft.com/services/app-service/?WT.mc_id=online-jhipster-judubois) to deploy your monoliths.
- As with any Docker and Kubernetes cloud provider, you can use the JHipster Docker and Kubernetes support to deploy your Docker images to Microsoft Azure. Follow our [Docker Compose documentation]({{ site.url }}/docker-compose/) and our [Kubernetes documentation]({{ site.url }}/kubernetes/) for more information on these options.

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=java-0000-judubois)

## Deploying using NubesGen

[NubesGen](https://www.nubesgen.com) is a deployment platform that fully supports JHipster applications and is the best solution to deploy your applications to Azure.

To deploy your JHipster application with NubesGen, select in the dropdown menu:

- "Spring Boot (Java) with Maven" to run your JHipster application with Maven.
- "Spring Boot (Java) with Gradle" to run your JHipster application with Gradle.
- "Docker with Spring Boot" to package your JHipster application with Docker and run it with Docker. Performance might be better than with Maven or Gradle, but you will have fewer monitoring options and no Java support from Microsoft.

Go to [the NubesGen website](https://www.nubesgen.com) for full documentation.

## Deploying using azd generated at start.jhipster.tech

You can also create a new JHipster application with built-in azd deployment to Azure Spring Apps via [start.jhipster.tech/generate-azure-application](https://start.jhipster.tech/generate-azure-application). This will leverage the [Azure Development CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/?WT.mc_id=java-0000-sakriema), an open-source toolkit that benefits from deployment templates and lets you deploy with one simple command: 'azd up'.

<div class="thumbnail no-margin-bottom">
    <div class="video-container">
        <iframe width="420" height="315" src="https://www.youtube.com/embed/AmxPv_5Bs_k?si=HeDmf113Uld0bCbS&amp;start=33" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div class="caption">
        <h3 id="thumbnail-label">JHipster On Azure Spring Apps Demo<a class="anchorjs-link" href="#thumbnail-label"><span class="anchorjs-icon"></span></a></h3>
        <p>This 4-minute tutorial shows you how to generate a JHipster Application with built-in azd deployment to Azure Spring Apps via [start.jhipster.tech/generate-azure-application](https://start.jhipster.tech/generate-azure-application).</p>
        <p>Presented by Sandra Ahlgrimm (<a href="https://twitter.com/skriemhild">@skriemhild</a>)</p>
        <p>Published on 26 Sep 2023</p>
    </div>
</div>

## [Deprecated] Deploying using the "azure" sub-generator

JHipster still has an "azure" sub-generator, which is documented in our previous versions, but it is deprecated.
