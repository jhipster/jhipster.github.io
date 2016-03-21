---
layout: default
title: Monitoring your JHipster Applications
permalink: /monitoring/
sitemap:
    priority: 0.7
    lastmod: 2016-03-17T00:00:00-00:00
---
# <i class="fa fa-line-chart"></i> Monitoring your JHipster Applications

JHipster provides easy ways to get started with logs and metrics monitoring of your applications. Log and metrics forwarding to a remote server can be set up simply by setting the relevant properties in your _application.yml_ configuration file. Then those logs and metrics can be displayed and analyzed in real-time using a monitoring platform. Aware of the importance of monitoring your apps in production, the JHipster project offers its own monitoring solution called the JHipster Console

## Configuring your apps for log and metrics forwarding to a remote server

### <a name="configuring-log-forwarding"></a> Forwarding logs to the JHipster Console

To configure a JHipster app to forward their logs to JHipster Console, enable logstash logging in their application-dev.yml or application-prod.yml.

    jhipster:
        logging:
            logstash:
                enabled: true
                host: localhost
                port: 5000
                queueSize: 512

To configure metrics monitoring, enable metrics log reporting in your JHipster apps.

    jhipster:
        metrics:
            logs:
                enabled: true
        	    reportFrequency: 60 # seconds

Setting those properties will enrich your logs with metrics coming from Dropwizard metrics.

## <a name="jhipster-console"></a> Introducing the JHipster Console

The JHipster Console is a monitoring tool based on the [ELK Stack](https://www.elastic.co/products). It provides ready to use dashboards and analytics tools to have a real time overview of your infrastructure's performance.

The ELK stack is composed of :
- [Elasticsearch](https://www.elastic.co/products/elasticsearch) for indexing the data (logs and metrics)
- [Logstash](https://www.elastic.co/products/logstash) to manage and process the logs received from the applications
- [Kibana](https://www.elastic.co/products/kibana) to visualize the logs with a nice interface

The JHipster Console is a docker based project that adds features on top of the official Elasticsearch, Logstash and Kibana docker images. We have made a few visual changes to Kibana and set up useful dashboards, so that you can get started to monitor your JHipster apps in minutes instead of the hours that would be needed to set up your own monitoring infrastructure.


## Setting up JHipster Console

If you already have a JHipster microservice architecture set up with the Docker-Compose workflow, the JHipster Console can be automatically set up by the Docker-Compose sub-generator.

If you are using the monolith version of JHipster, you will need docker and docker-composed installed, then you can clone JHipster Console's [git repository](https://github.com/jhipster/jhipster-console) and run:

    docker-compose up -d

It will start Elasticsearch, Logstash, Kibana and ElastAlert all at once. You will then be able to access the JHipster Console at [http://localhost:5601](http://localhost:5601). It should automatically receive logs from your applications if they have been correctly configured to forward their logs and metrics to logstash.

To stop everything, run:

    docker-compose down

Once stopped, you can remove the containers, if you don't intend to start them again:

    docker-compose rm

## Using JHipster Console

Once your application is running with log and metrics forwarding enabled, you can view a dashboards by clicking on the **Load Saved Dashboards** icon ( <i class="fa fa-folder-open-o"></i> ) in the **Dashboard** tab.

You can also use Kibana's **Discover** and **Visualize** tabs to explore your data and create new visualizations. To understand how to use Kibana's interface effectively please refer to its official documentation in particular the [Discover](https://www.elastic.co/guide/en/kibana/current/discover.html), [Visualize](https://www.elastic.co/guide/en/kibana/current/visualize.html) and [Dashboard](https://www.elastic.co/guide/en/kibana/current/dashboard.html) sections of the Kibana User Guide.

### Data persistence with docker volumes

When using JHipster Console you can enable docker volumes in the _docker-compose.yml_ file by uncommenting the appropriate lines. Those volumes are used to share data between containers and the host. They will persist data and configuration even if containers are removed from your system.

- Elasticsearch has its data saved to `log-monitoring/log-data`
- Logstash loads its configuration from `log-monitoring/log-config/logstash.conf`, you can edit this file to add new parsing rules for data received by logstash on UDP port 5000.
- Kibana loads dashboards description files in `kibana/dashboards` on each startup.

### Save your custom searches, visualizations and dashboards as JSON for auto import

Searches, visualization and dashboards created in Kibana can be exported using the _Settings_ > _Objects_ menu.
You can then extract the JSON description of a specific object under the `_source` field of the export.json file.
You can then put this data in a JSON file in one of the `kibana/dashboard` sub-folder for auto-import.

If you have created useful dashboards and visualizations for your JHipster apps please consider contributing those back to the community by submitting a Pull Request on the JHipster Console's github.

### <a name="alerting"></a> Alerting with Elastalert

[Elastalert](https://github.com/Yelp/elastalert) is an alerting system that can generate alerts from data in Elasticsearch.

### Configure Alerting

Elastalert configuration can be modified in `alerts/config.yaml`.
To enable alerting, you just need to set up how often you would like the alerting system to check for events, by setting for example:

    run_every:
        minutes: 1

Then you will need to write some rules that define when alerts will be thrown.

### Write alertings rules

Add new YAML rule files in `alerts/rules` and then test them over past data with:

    ./test-alerting-rule.sh rule.yaml

Note that those YAML files should have a `.yaml` file extension. Read more on how to write rules at [Elastalert's official documentation](https://elastalert.readthedocs.org/en/latest/ruletypes.html)
