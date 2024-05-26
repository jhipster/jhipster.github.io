---
layout: default
title: Déploiement sur Kubernetes
permalink: /kubernetes/
redirect_from:
  - /kubernetes.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-10T00:00:00-00:00
---

# Déploiement sur Kubernetes

Les applications JHipster et les services associés peuvent être déployés de différentes manières.

- Sous-générateur standard kubectl/kustomize/skaffold `jhipster kubernetes|k8s`
- Sous-générateur Helm `jhipster kubernetes-helm|helm-k8s`
- Sous-générateur Knative `jhipster kubernetes-knative|knative`

# `jhipster kubernetes | k8s`

Ce sous-générateur génère des manifestes qui sont déployés sur [Kubernetes](http://kubernetes.io/) via `kubectl/kustomize/skaffold cli`.

[![]({{ site.url }}/images/logo/logo-kubernetes.png)](http://kubernetes.io/)

## Limitations

- Cassandra n'est pas encore pris en charge
- Kubernetes v1.9+ est requis

## Prérequis

Vous devez installer :

- [Docker](https://docs.docker.com/installation/#installation)
- [kubectl](http://kubernetes.io/docs/user-guide/prereqs/)

Vous devez disposer d'un registre Docker. Si vous n'en avez pas, vous pouvez utiliser le registre officiel [Docker Hub](https://hub.docker.com/).

## Minikube

[Minikube](https://github.com/kubernetes/minikube) est un outil qui permet de faire tourner Kubernetes localement. Minikube exécute un cluster Kubernetes à un seul nœud à l'intérieur d'une machine virtuelle sur votre ordinateur portable, ce qui permet aux utilisateurs de tester Kubernetes ou de développer avec lui au quotidien.

Vous pouvez l'utiliser pour tester votre application avant de la pousser sur [Kubernetes](http://kubernetes.io/).

## Exécution du sous-générateur

Pour générer les fichiers de configuration pour Kubernetes, exécutez cette commande dans un nouveau dossier :

`jhipster kubernetes | k8s`

Puis répondez à toutes les questions pour déployer votre application.

### Quel *type* d'application souhaitez-vous déployer ?

Le type d'application dépend de votre souhait de déployer une architecture de microservices ou des applications classiques.

### Entrez le répertoire racine où se trouvent vos applications

Entrez le chemin.

### Quelles applications voulez-vous inclure dans votre configuration Kubernetes ?

Sélectionnez vos applications.

### Voulez-vous configurer la surveillance de vos applications ?

Sélectionnez l'option.

### Entrez le mot de passe administrateur utilisé pour sécuriser l'administration du Registre JHipster

Cette question n'est affichée que si vous choisissez une architecture de microservices avec le Registre JHipster.

### Que devrions-nous utiliser pour l'espace de noms Kubernetes ?

Consultez la documentation sur l'espace de noms [ici](http://kubernetes.io/docs/user-guide/namespaces/)

### Que devrions-nous utiliser pour le nom de base du référentiel Docker ?

Si vous choisissez [Docker Hub](https://hub.docker.com/) comme registre principal, ce sera votre identifiant Docker Hub.

Si vous choisissez [Google Container Registry](https://cloud.google.com/container-registry/), alors ce sera `gcr.io/[ID DU PROJET]`, ou un registre régional, tel que `eu.gcr.io/[ID DU PROJET]`, `us.gcr.io/[ID DU PROJET]` ou `asia.gcr.io/[ID DU PROJET]`. Consultez [Pushing and Pulling Images](https://cloud.google.com/container-registry/docs/pushing-and-pulling) pour plus de détails.

Si vous choisissez d'autres registres comme [Harbor](https://goharbor.io/), [Quay](https://www.openshift.com/products/quay) ou quelque chose de similaire, alors l'identifiant sera comme `<serveur_du_registre>/<dépôt>/[ID DU PROJET]`

### Quelle commande devrions-nous utiliser pour pousser l'image Docker vers le référentiel ?

La commande par défaut pour pousser vers Docker Hub est `docker image push`

Si vous utilisez Google Container Registry pour publier vos images Docker, ce sera : `gcloud docker push`

### Choisissez le type de service Kubernetes pour vos services edge ?

Sélectionnez le type de routage K8s approprié.

Ce sont les invites standard. En outre, d'autres invites seront affichées en fonction des options choisies comme Istio, Ingress, etc.

## Mise à jour de votre application déployée

### Préparation d'un nouveau déploiement

Lorsque votre application est déjà déployée, vous pouvez la redéployer en construisant une nouvelle image Docker :

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

Ou en utilisant Gradle :

`./gradlew -Pprod bootJar jibDockerBuild -x test`

### Poussez vers Docker Hub

Étiquetez localement votre image :

`docker image tag application username/application`

Poussez votre image vers Docker Hub :

`docker image push username/application`

## Déploiement d'une application monolithique/microservices

Vous pouvez déployer toutes vos applications en exécutant la commande suivante :

<pre>
./kubectl-apply.sh -f (option par défaut)  [or] ./kubectl-apply.sh -k (option kustomize) [or] ./kubectl-apply.sh -s (option skaffold)
</pre>

Vous pouvez déployer des applications en utilisant kustomize :

<pre>
kubectl apply -k ./
</pre>

Vous pouvez déployer des applications en utilisant skaffold :

<pre>
skaffold run [or] skaffold deploy
</pre>

Cela déploiera vos applications et les services dépendants associés (base de données, Elasticsearch, etc.).

### Espaces de noms personnalisés

Il est possible de spécifier un espace de noms personnalisé pour le déploiement entier. Pour exécuter des commandes personnalisées, vous devez spécifier l'espace de noms cible, comme dans cet exemple :

`kubectl get pods -n <espace_de_noms_personnalisé>`

### Mise à l'échelle de vos déploiements

Vous pouvez mettre à l'échelle vos applications en utilisant

`kubectl scale deployment <nom_de_l'application> --replicas <nombre_de_répliques> `


### Déploiements sans temps d'arrêt

La méthode par défaut pour mettre à jour une application en cours d'exécution dans Kubernetes est de déployer une nouvelle balise d'image dans votre registre Docker, puis de la déployer à l'aide de :

`kubectl set image deployment/<nom-de-l'application>-app <nom-de-l'application>=<nouvelle-image>`

L'utilisation de livenessProbes et de readinessProbe vous permet d'informer Kubernetes de l'état de vos applications, afin de garantir la disponibilité de vos services. Vous aurez besoin d'au moins 2 répliques pour chaque application si vous voulez effectuer un déploiement sans interruption. Cela est dû au fait que la stratégie de mise à niveau progressive arrête d'abord une réplique en cours d'exécution afin d'en placer une nouvelle. Le fait de n'avoir qu'une seule réplique entraînera une courte interruption pendant les mises à niveau.

### Déploiement d'un registre de services dans Kubernetes

Bien que Kubernetes propose sa propre découverte de services interne avec **Kube-DNS**, JHipster s'appuie sur Spring Cloud pour la découverte de services, ce qui dépend donc d'un registre de services tiers comme Eureka ou Consul. Cela présente l'avantage d'être indépendant de la plateforme et de fonctionner de manière similaire en production et sur une machine de développement locale.

En conséquence, pour les applications de microservices, le sous-générateur Kubernetes de JHipster générera des fichiers de manifeste Kubernetes pour déployer des registres de services comme le **JHipster-Registry** (basé sur Eureka) ou **Consul**. De plus, les manifestes Kubernetes des microservices et de la passerelle générés contiendront la configuration appropriée pour s'enregistrer dans leur registre central.

### Gestion du registre JHipster ou de Consul dans Kubernetes

Pour le registre JHipster et Consul, des configurations [StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) sont fournies. Ce sont un certain type de ressources Kubernetes qui peuvent gérer des applications persistantes et vous permettront de mettre à l'échelle vos registres de services pour une haute disponibilité. Pour plus d'informations sur la haute disponibilité pour Eureka et Consul, consultez leur documentation respective.

### Configuration centralisée dans Kubernetes

La configuration centralisée est également configurée à l'aide soit du **Spring Cloud Config Server** (lors de l'utilisation du registre JHipster) soit du **Consul Key/Value store** (lors de l'utilisation de Consul). Par défaut, les deux serveurs de configuration chargent leur configuration à partir d'un [ConfigMap](http://kubernetes.io/docs/user-guide/configmap/) Kubernetes qui contient des fichiers de propriétés dans ce format :

<pre>
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-config
  namespace: default
data:
  application.yml: |- # propriétés globales partagées par toutes les applications
    jhipster:
      security:
        authentication:
          jwt:
            secret: secret
  gateway-prod.yml: |- # propriétés de l'application de la passerelle pour le profil "prod"
    foo:
      bar: foobar
</pre>

Par défaut, les serveurs de configuration fonctionnent en mode développement, ce qui signifie que les fichiers de propriétés YAML sont lus directement à partir du système de fichiers et rechargés à chaud en cas de modifications. Pour la production, il est recommandé de configurer la configuration à partir d'un dépôt Git, comme expliqué dans la documentation des microservices pour le [serveur de configuration JHipster-Registry]({{ site.url }}/jhipster-registry) et [Consul]({{ site.url }}/consul).

### Exposition des services sans tête

Le registre est déployé en utilisant un service sans tête dans Kubernetes, ce qui signifie que le service principal n'a pas d'adresse IP et ne peut pas obtenir de port de noeud. Vous pouvez créer un service secondaire pour n'importe quel type, en utilisant :

`kubectl expose service jhipster-registry --type=NodePort --name=exposed-registry `

et explorer les détails en utilisant

`kubectl get svc exposed-registry `

Pour mettre à l'échelle le registre JHipster, utilisez

`kubectl scale statefulset jhipster-registry --replicas 3 `

## Outils de surveillance

Le sous-générateur fournit des outils de surveillance et une configuration pour une utilisation avec vos applications.

### Métriques de Prometheus

Si ce n'est pas déjà fait, installez le [Prometheus operator par CoreOS](https://github.com/coreos/prometheus-operator). Vous pouvez rapidement déployer l'opérateur en utilisant

`kubectl create -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/bundle.yaml`

**indice** : Pour plus d'informations sur l'activation et la protection des métriques de prometheus dans votre application, consultez notre [documentation de surveillance]({{ site.url }}/monitoring/#configuring-metrics-forwarding).

Vous pouvez explorer l'instance Prometheus de vos applications en utilisant

`kubectl get svc prometheus-appname `

## Profiter de Kubernetes

Kubernetes offre un certain nombre d'installations prêtes à l'emploi pour aider aux déploiements de microservices, telles que :
* Registre de services - Le `Service` Kubernetes est un citoyen de première classe qui fournit un registre de services et une recherche via le nom DNS.
* Équilibrage de charge - Le Service Kubernetes agit comme un équilibrage de charge de niveau L4.
* Vérification de l'état - Les sondes de liveness et de readiness aident à déterminer l'état du service.
* Configuration - Le `ConfigMap` Kubernetes peut être utilisé pour stocker et appliquer une configuration en dehors de l'application.

Il y a plusieurs avantages à utiliser les installations Kubernetes :
* Déploiement simplifié
* Pas besoin de déploiement supplémentaire d'Eureka/Consul
* Pas besoin de Spring Cloud Gateway pour proxy/routage des requêtes
* Pas besoin de Spring Cloud Load Balancer

En même temps, il y a quelques inconvénients :
* Aucune gestion d'application via le Registre JHipster - Cette fonctionnalité repose sur le `DiscoveryClient` de Spring Cloud. Cela peut être mis à jour à l'avenir pour ajouter `spring-cloud-kubernetes`
* Aucune prise en charge locale de Docker Compose - Vous devez utiliser `minikube` pour le développement local, et utiliser Ingress pour router le trafic
* Aucun équilibrage de charge au niveau des requêtes - Le service Kubernetes est un équilibrage de charge de niveau L4 qui équilibre la charge par connexion. Utilisez Istio pour l'équilibrage de charge au niveau des requêtes (voir ci-dessous).

### Utilisation de Kubernetes comme registre de services

Pour éviter de dépendre d'Eureka ou de Consul, vous devrez désactiver complètement la découverte de services
* Lorsqu'on vous demande `Quel serveur de découverte de services voulez-vous utiliser ?`, choisissez `Aucune découverte de services`

Une passerelle JHipster gère généralement les appels API et achemine ces appels en utilisant Spring Cloud Gateway. Sans registre de services, le routage via Spring Cloud Gateway ne fonctionnera pas. Vous devrez utiliser Kubernetes Ingress pour router le trafic vers les microservices.
* Lorsqu'on vous demande `Choisissez le type de service Kubernetes pour vos services de bord`, choisissez `Ingress`.

## Istio

Vous pouvez déployer des microservices dans un cluster Kubernetes activé par [Istio](https://istio.io). Alors que Kubernetes gère le déploiement et la configuration des microservices, Istio peut gérer la communication de service à service, telle que l'équilibrage de charge au niveau des requêtes, les réessais, les disjoncteurs de circuit, le routage/division du trafic, et plus encore.

Pour activer la prise en charge d'Istio :
* Lorsqu'on vous demande `Voulez-vous configurer Istio ?`, choisissez l'une des options Istio
* Lorsqu'on vous demande `Voulez-vous générer des fichiers de route Istio ?`, choisissez `Oui` pour générer une configuration par défaut pour le disjoncteur de circuit, etc.

## Dépannage

> Mes applications ne sont pas récupérées, en raison de 'imagePullBackoff'

Vérifiez le registre auquel votre cluster Kubernetes accède. Si vous utilisez un registre privé, vous devriez l'ajouter à votre espace de noms avec `kubectl create secret docker-registry` (consultez la [documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) pour plus d'informations).

> Mes applications s'arrêtent avant de pouvoir démarrer

Cela peut se produire si votre cluster a des ressources limitées (par exemple Minikube). Augmentez la valeur `initialDelySeconds` de livenessProbe de vos déploiements.

> Mes applications démarrent très lentement, malgré un cluster avec de nombreuses ressources

Le réglage par défaut est optimisé pour les clusters de taille moyenne. Vous pouvez augmenter librement la variable d'environnement JAVA_OPTS, les demandes de ressources et les limites pour améliorer les performances. Faites attention !

> J'ai sélectionné Prometheus mais aucune cible n'est visible

Cela dépend de la configuration de l'opérateur Prometheus et des politiques de contrôle d'accès dans votre cluster. La version 1.6.0+ est nécessaire pour que la configuration RBAC fonctionne.

> J'ai sélectionné Prometheus, mais mes cibles ne sont jamais balayées

Cela signifie probablement que vos applications ne sont pas construites en utilisant le profil `prometheus` dans Maven/Gradle

> Mes microservices basés sur SQL restent bloqués pendant l'initialisation de Liquibase lors de l'exécution de plusieurs répliques

Parfois, le verrou du journal de changement de base de données devient corrompu. Vous devrez vous connecter à la base de données en utilisant `kubectl exec -it` et supprimer toutes les lignes de la table `databasechangeloglock` de liquibase.

# `jhipster kubernetes-helm | k8s-helm`

Ce sous-générateur génère des manifestes qui sont déployés sur [Kubernetes](http://kubernetes.io/) via `helm cli`.

## Prérequis

Pour utiliser le manifeste généré par ce sous-générateur, `helm cli` doit être installé. Suivez [ce lien](https://github.com/helm/helm) pour les instructions d'installation. Cela nécessite `helm 2.12.x ou ultérieur`.

Une fois Helm installé, vous devez ajouter les référentiels suivants :
<pre>
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com
</pre>
Ces référentiels doivent être ajoutés au cache local, car ce sous-générateur tirera des graphiques de services stables et prêts pour la production à partir des référentiels ci-dessus.

Ce sous-générateur utilise le sous-générateur `kubernetes` pour les manifestes des applications et tire des services comme la base de données, elasticsearch, prometheus etc. des images mentionnées dans vos applications à partir des référentiels ci-dessus.

## Déploiement

Vous pouvez déployer toutes vos applications en exécutant la commande suivante :

<pre>
bash helm-apply.sh (ou) ./helm-apply.sh
</pre>

`helm-apply.sh` effectuera toujours une installation propre. Tous les graphiques existants avec la même identité sont d'abord supprimés, puis une installation propre est effectuée.

Vous pouvez mettre à niveau toutes vos applications (si vous avez apporté des modifications aux manifestes générés) en exécutant la commande suivante :

<pre>
bash helm-upgrade.sh (ou) ./helm-upgrade.sh
</pre>

# `jhipster kubernetes-knative | knative`

Ce sous-générateur génère des manifestes qui sont déployés sur [Kubernetes](http://kubernetes.io/) via `kubectl ou helm cli`. Il génère des manifestes pour l'une des interfaces CLI en fonction de la réponse choisie.

## Prérequis

Ce sous-générateur dépend d'Istio. Pour utiliser les manifestes générés par ce sous-générateur, vous devez avoir istio et knative installés dans le cluster. Suivez [ce lien](https://knative.dev/docs/install/) pour les instructions d'installation. Il nécessite `knative 0.8.x ou ultérieur`.

## Déploiement

Si vous avez choisi de déployer en utilisant le générateur Kubernetes, exécutez la commande suivante :
<pre>
bash kubectl-knative-apply.sh (ou) ./kubectl-knative-apply.sh
</pre>

Si vous avez choisi de déployer en utilisant le générateur Helm, exécutez la commande suivante :
<pre>
bash helm-knative-apply.sh (ou) ./helm-knative-apply.sh
</pre>
`helm-knative-apply.sh` effectuera toujours une installation propre. Tous les graphiques existants avec la même identité sont d'abord supprimés, puis une installation propre est effectuée.

Vous pouvez mettre à niveau toutes vos applications (si vous avez apporté des modifications aux manifestes générés) en exécutant la commande bash suivante :

<pre>
bash helm-knative-upgrade.sh (ou) ./helm-knative-upgrade.sh
</pre>

## Plus d'informations

*   [Documentation Kubernetes](http://kubernetes.io/docs/)
