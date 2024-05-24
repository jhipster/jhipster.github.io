---
layout: default
title: Déploiement sur Microsoft Azure
permalink: /azure/
sitemap:
    priority: 0.7
    lastmod: 2023-12-19T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Déploiement sur Microsoft Azure

[Microsoft Azure](https://azure.microsoft.com/overview/?WT.mc_id=java-0000-judubois) est une excellente solution pour exécuter des applications JHipster dans le cloud.

- La manière la plus simple est d'utiliser [JHipster Azure Spring Apps](https://github.com/Azure/generator-jhipster-azure-spring-apps) pour créer et déployer votre projet de bout en bout. JHipster Azure Spring Apps est conçu pour rationaliser le développement d'applications Spring full-stack, en exploitant l'infrastructure robuste d'Azure Spring Apps pour donner vie à vos projets avec une facilité et une efficacité sans précédent.
- Si vous utilisez des microservices Spring Boot, [Azure Spring Apps](https://azure.microsoft.com/services/spring-apps/?WT.mc_id=online-jhipster-judubois) prend en charge pleinement les applications JHipster. Vous pouvez en savoir plus sur [Quickstart](https://learn.microsoft.com/azure/spring-apps/quickstart-deploy-microservice-apps).
- Vous pouvez également essayer [Azure App Service](https://azure.microsoft.com/services/app-service/?WT.mc_id=online-jhipster-judubois) pour déployer vos monolithes.
- Comme avec n'importe quel fournisseur de cloud Docker et Kubernetes, vous pouvez utiliser le support Docker et Kubernetes de JHipster pour déployer vos images Docker sur Microsoft Azure. Suivez notre [documentation Docker Compose]({{ site.url }}/docker-compose/) et notre [documentation Kubernetes]({{ site.url }}/kubernetes/) pour plus d'informations sur ces options.

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=java-0000-judubois)

## Déploiement avec NubesGen

[NubesGen](https://www.nubesgen.com) est une plateforme de déploiement qui prend en charge pleinement les applications JHipster et est la meilleure solution pour déployer vos applications sur Azure.

Pour déployer votre application JHipster avec NubesGen, sélectionnez dans le menu déroulant :

- "Spring Boot (Java) avec Maven" pour exécuter votre application JHipster avec Maven.
- "Spring Boot (Java) avec Gradle" pour exécuter votre application JHipster avec Gradle.
- "Docker avec Spring Boot" pour empaqueter votre application JHipster avec Docker et l'exécuter avec Docker. Les performances pourraient être meilleures qu'avec Maven ou Gradle, mais vous aurez moins d'options de surveillance et aucun support Java de la part de Microsoft.

Consultez [le site Web de NubesGen](https://www.nubesgen.com) pour une documentation complète.

## Déploiement avec azd généré sur start.jhipster.tech

Vous pouvez également créer une nouvelle application JHipster avec un déploiement azd intégré vers Azure Spring Apps via [start.jhipster.tech/generate-azure-application](https://start.jhipster.tech/generate-azure-application). Cela utilisera le [Azure Development CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/?WT.mc_id=java-0000-sakriema), une trousse à outils open source qui bénéficie de modèles de déploiement et vous permet de déployer avec une simple commande : 'azd up'.

<div class="thumbnail no-margin-bottom">
    <div class="video-container">
        <iframe width="420" height="315" src="https://www.youtube.com/embed/AmxPv_5Bs_k?si=HeDmf113Uld0bCbS&amp;start=33" title="Lecteur vidéo YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div class="caption">
        <h3 id="thumbnail-label">Démo JHipster sur Azure Spring Apps<a class="anchorjs-link" href="#thumbnail-label"><span class="anchorjs-icon"></span></a></h3>
        <p>Ce tutoriel de 4 minutes vous montre comment générer une application JHipster avec un déploiement azd intégré vers Azure Spring Apps via [start.jhipster.tech/generate-azure-application](https://start.jhipster.tech/generate-azure-application).</p>
        <p>Présenté par Sandra Ahlgrimm (<a href="https://twitter.com/skriemhild">@skriemhild</a>)</p>
        <p>Publié le 26 sept. 2023</p>
    </div>
</div>