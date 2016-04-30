---
layout: default
title: Monitoring your JHipster Applications
permalink: /monitoring/
sitemap:
    priority: 0.7
    lastmod: 2016-03-17T00:00:00-00:00
---
# <i class="fa fa-line-chart"></i> Monitoring your JHipster Applications

JHipster provides several easy ways to get started with logs and metrics monitoring of your applications. Logs and metrics forwarding to a remote server can be set up simply by setting the relevant properties in your `application.yml` configuration file. Then those logs and metrics can be displayed and analyzed in real-time using a monitoring platform. Aware of the importance of monitoring your applications in production, the JHipster project offers its own monitoring solution called the [JHipster Console](https://github.com/jhipster/jhipster-console), which is detailed below.

## Configuring your apps for log and metrics forwarding to a remote server

### <a name="configuring-log-forwarding"></a> Forwarding logs to the JHipster Console

To configure a JHipster application to forward their logs to JHipster Console, enable logstash logging in their `application-dev.yml` or `application-prod.yml`:

    jhipster:
        logging:
            logstash:
                enabled: true
                host: localhost
                port: 5000
                queueSize: 512

To configure metrics monitoring, enable metrics log reporting in your JHipster application:

    jhipster:
        metrics:
            logs:
                enabled: true
        	    reportFrequency: 60 # seconds

Setting those properties will enrich your logs with metrics coming from Dropwizard metrics.

## <a name="jhipster-console"></a> Introducing the JHipster Console

The [JHipster Console](https://github.com/jhipster/jhipster-console) is a monitoring tool based on the [ELK Stack](https://www.elastic.co/products). It provides ready-to-use dashboards and analytics tools to have a real-time overview of your infrastructure's performance.

The ELK stack is composed of:

- [Elasticsearch](https://www.elastic.co/products/elasticsearch) for indexing the data (logs and metrics)
- [Logstash](https://www.elastic.co/products/logstash) to manage and process the logs received from the applications
- [Kibana](https://www.elastic.co/products/kibana) to visualize the logs with a nice interface

The JHipster Console is a Docker-based project that adds features on top of the official Elasticsearch, Logstash and Kibana Docker images. We have made a few visual changes to Kibana and set-up useful dashboards, so that you can get started to monitor your JHipster applications in minutes instead of the hours that would be needed to set up your own monitoring infrastructure.

![JHipster Console Monitoring Dashboard][monitoring-dashboard]

## Setting up JHipster Console

If you already have a JHipster [microservice architecture]({{ site.url }}/microservices-architecture/) set up with the Docker Compose workflow, the JHipster Console can be automatically set up by the Docker Compose sub-generator.

If you are using the monolithic version of JHipster, you can get JHipster Console's Docker-Compose file and configuration by running the following commands:

    mkdir conf
    curl -o conf/logstash.conf https://raw.githubusercontent.com/jhipster/jhipster-console/v1.1.0/log-monitoring/log-config/logstash.conf
    curl -o docker-compose.yml https://raw.githubusercontent.com/jhipster/jhipster-console/v1.1.0/bootstrap/docker-compose.yml

Then you will be able to start the console with:

    docker-compose up -d

It will start Elasticsearch, Logstash, Kibana and ElastAlert all at once. You will then be able to access the JHipster Console at [http://localhost:5601](http://localhost:5601). It should automatically receive logs from your applications if they have been correctly configured to forward their logs and metrics to Logstash.

To stop everything, run:

    docker-compose stop

Once stopped, you can remove the containers if you don't intend to start them again:

    docker-compose rm

<div class="alert alert-warning"><i>Warning: </i>
If you are using Docker Machine on Mac or Windows, your Docker daemon has only limited access to your OS X or Windows file system. Docker Machine tries to auto-share your /Users (OS X) or C:\Users\&lt;username&gt; (Windows) directory. So you have to create the project folder under these directory to avoid any issues especially if you are using the JHipster Console for monitoring.
</div>

## Using JHipster Console

Once your application is running with logs and metrics forwarding enabled, you can view a dashboards by clicking on the **Load Saved Dashboards** icon ( <i class="fa fa-folder-open-o"></i> ) in the **Dashboard** tab.

<div class="alert alert-info">Tip: If you encounter the following error with dashboards: <i>Cannot read property 'byName' of undefined</i>, try refreshing the <b>logstash-*</b> index pattern field list under <b>Settings</b> > <b>Indices</b> using the yellow refresh button (<i class="fa fa-refresh"></i>)</div>


You can also use Kibana's **Discover** and **Visualize** tabs to explore your data and create new visualizations. To understand how to use Kibana's interface effectively please refer to its official documentation in particular the [Discover](https://www.elastic.co/guide/en/kibana/current/discover.html), [Visualize](https://www.elastic.co/guide/en/kibana/current/visualize.html) and [Dashboard](https://www.elastic.co/guide/en/kibana/current/dashboard.html) sections of the Kibana User Guide.

![JHipster Console JVM Dashboard][jvm-dashboard]


### Data persistence with docker volumes

When using JHipster Console you can enable docker volumes in the `docker-compose.yml` file by uncommenting the appropriate lines. Those volumes are used to share data between containers and the host. They will persist data and configuration even if containers are removed from your system.

- Elasticsearch has its data saved to `log-monitoring/log-data`
- Logstash loads its configuration from `log-monitoring/log-config/logstash.conf`, you can edit this file to add new parsing rules for data received by logstash on UDP port 5000.
- Kibana loads dashboards description files in `jhipster-console/dashboards` on each startup.

### Save your custom searches, visualizations and dashboards as JSON for auto import

Searches, visualization and dashboards created in Kibana can be exported using the **Settings** > **Objects** menu.
You can then extract the JSON description of a specific object under the `_source` field of the export.json file.
You can then put this data in a JSON file in one of the `jhipster-console/dashboards` sub-folder for auto-import.

If you have created useful dashboards and visualizations for your JHipster applications please consider contributing those back to the community by submitting a Pull Request on the [JHipster Console's GitHub project](https://github.com/jhipster/jhipster-console).

## <a name="alerting"></a> Alerting with Elastalert

JHipster Console comes with built-in alerting by integrating [Elastalert](https://github.com/Yelp/elastalert), an alerting system that can generate alerts from data in Elasticsearch. Elastalert is simple to use and able to define complex alerting rules to detect failures, spikes or any pattern based on an Elasticsearch Query.

#### Enable alerting

To enable alerting, add the following lines for the **jhipster-console** service in `docker-compose.yml`.

    environment:
        - ENABLE_ALERTING=true
    volumes:
        - ./alerts/config.yaml:/opt/elastalert/config.yaml
        - ./alerts/rules/:/opt/elastalert/rules

#### Configure alerting

Elastalert configuration can be modified in `alerts/config.yaml`. For example, you can configure the alerting frequency and the buffer period, by changing the following properties:

    run_every:
        minutes: 1
    buffer_time:
        minutes: 5

Then you will need to write some rules that define when alerts will be thrown.

#### Write alertings rules

To define new alerts, add new YAML rule files in `alerts/rules` and then test them over past data with:

    ./test-alerting-rule.sh rule.yaml

Note that those YAML files should have a `.yaml` file extension. Read more on how to write rules at [Elastalert's official documentation](https://elastalert.readthedocs.org/en/latest/ruletypes.html).

#### Alerting dashboard

Go to [localhost:5601/app/kibana#/dashboard/alerting-dashboard](http://localhost:5601/app/kibana#/dashboard/alerting-dashboard) to see the history of all your alerts.

[monitoring-dashboard]: {{ site.url }}/images/jhipster-console-monitoring.png "Monitoring Dashboard"
[jvm-dashboard]: {{ site.url }}/images/jhipster-console-jvm.png "JVM Dashboard"
