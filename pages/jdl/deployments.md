---
layout: default
title: Langage de Domaine JHipster - Déploiements
permalink: /jdl/deployments
sitemap:
    priority: 0.5
    lastmod: 2021-07-08T12:00:00-00:00
---

# <i class="fa fa-star"></i> Langage de Domaine JHipster (JDL) - Déploiements

## Sommaire

1. [Syntaxe](#syntaxe)
1. [Exemples](#exemples)
1. [Options de déploiement disponibles](#options-de-deploiement-disponibles)

---

### Syntaxe

La déclaration de déploiement se fait comme suit :

```
deployment {
  <nom de l'option de déploiement> <valeur de l'option de déploiement>
}
```

  - Similaire aux applications, la déclaration de déploiement fonctionne en spécifiant des clés et des valeurs d'options

---

### Exemples

#### Exemple de base

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "votreNomDeConnexionDocker"
}
```

---

#### Plus d'un déploiement

Si vous souhaitez plus d'un déploiement, voici comment faire :

```
// sera créé dans le dossier 'docker-compose'
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "votreNomDeConnexionDocker"
}

// sera créé dans le dossier 'kubernetes'
deployment {
  deploymentType kubernetes
  appsFolders [foo, bar]
  dockerRepositoryName "votreNomDeConnexionDocker"
}

```
Vous pouvez avoir un déploiement par `deploymentType`. Les applications définies dans `appsFolders` doivent se trouver dans le même dossier où vous créez les déploiements ou dans le dossier défini dans `directoryPath`.

Par exemple, ci-dessus, vous devez avoir une structure de dossiers comme ceci :

```
.
├── votreFichierJdl.jdl
├── foo
├── bar
├── kubernetes // sera créé par le JDL
└── docker-compose // sera créé par le JDL

```

---

### Options de déploiement disponibles

Voici les options de déploiement prises en charge dans le JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>Nom de l'option JDL</th>
    <th>Valeur par défaut</th>
    <th>Valeurs possibles</th>
    <th>Commentaire</th>
  </tr>
  <tr>
    <td>deploymentType</td>
    <td>docker-compose</td>
    <td>docker-compose, kubernetes, openshift</td>
    <td></td>
  </tr>
  <tr>
    <td>directoryPath</td>
    <td>"../"</td>
    <td></td>
    <td>Chemin relatif. Doit être entre guillemets doubles</td>
  </tr>
  <tr>
    <td>appsFolders</td>
    <td>[]</td>
    <td></td>
    <td>Noms des répertoires des applications séparés par des virgules. Doit être une liste, exemple [foo, bar]</td>
  </tr>
  <tr>
    <td>clusteredDbApps</td>
    <td>[]</td>
    <td></td>
    <td>Noms des répertoires des applications avec DB en cluster, séparés par des virgules. Doit être une liste, exemple [foo, bar]</td>
  </tr>
  <tr>
    <td>gatewayType</td>
    <td>SpringCloudGateway</td>
    <td>La valeur est ignorée lorsque serviceDiscoveryType est `no`</td>
  </tr>
  <tr>
    <td>monitoring</td>
    <td>no</td>
    <td>no, prometheus</td>
    <td></td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>consul</td>
    <td>consul, eureka, no</td>
    <td></td>
  </tr>
  <tr>
    <td>dockerRepositoryName</td>
    <td></td>
    <td></td>
    <td>Le nom ou l'URL du dépôt Docker. Doit être entre guillemets doubles</td>
  </tr>
  <tr>
    <td>dockerPushCommand</td>
    <td>"docker push"</td>
    <td></td>
    <td>La commande de push Docker à utiliser. Doit être entre guillemets doubles</td>
  </tr>
  <tr>
    <td>kubernetesNamespace</td>
    <td>default</td>
    <td></td>
    <td>Applicable uniquement lorsque deploymentType est kubernetes</td>
  </tr>
  <tr>
    <td>kubernetesUseDynamicStorage</td>
    <td>false</td>
    <td>true, false</td>
    <td>Applicable uniquement lorsque deploymentType est kubernetes, active l'option kubernetesStorageClassName</td>
  </tr>
  <tr>
    <td>kubernetesStorageClassName</td>
    <td>""</td>
    <td></td>
    <td>Applicable uniquement lorsque deploymentType est kubernetes, peut être vide (deux guillemets doubles)</td>
  </tr>
  <tr>
    <td>kubernetesServiceType</td>
    <td>LoadBalancer</td>
    <td>LoadBalancer, NodePort, Ingress</td>
    <td>Applicable uniquement lorsque deploymentType est kubernetes</td>
  </tr>
  <tr>
    <td>ingressDomain</td>
    <td></td>
    <td></td>
    <td>Le domaine pour Ingress lorsque kubernetesServiceType est `Ingress`. Doit être entre guillemets doubles. Applicable uniquement lorsque deploymentType est kubernetes</td>
  </tr>
  <tr>
    <td>ingressType</td>
    <td>nginx</td>
    <td>nginx, gke</td>
    <td>Le type d'ingress Kubernetes, uniquement défini lorsque `kubernetesServiceType` est réglé sur Ingress</td>
  </tr>
  <tr>
    <td>istio</td>
    <td>false</td>
    <td>true, false</td>
    <td>Applicable uniquement lorsque deploymentType est kubernetes</td>
  </tr>
  <tr>
    <td>openshiftNamespace</td>
    <td>default</td>
    <td></td>
    <td>Applicable uniquement lorsque deploymentType est openshift</td>
  </tr>
  <tr>
    <td>storageType</td>
    <td>ephemeral</td>
    <td>ephemeral, persistent</td>
    <td>Applicable uniquement lorsque deploymentType est openshift</td>
  </tr>
  <tr>
    <td>registryReplicas</td>
    <td>2</td>
    <td></td>
    <td>Le nombre de réplicas, lors de l'utilisation du type de déploiement openshift</td>
  </tr>
</table>
