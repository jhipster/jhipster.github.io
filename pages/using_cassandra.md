---
layout: default
title: Using Cassandra
permalink: /using-cassandra/
redirect_from:
  - /using_cassandra.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-eye"></i> Using Cassandra

Cassandra is one of the supported databases that can be selected when your application is being generated.

This generator has one limitation:

*   It does not support OAuth2 authentication (we need to implement a Cassandra back-end to Spring Security's OAuth2 server)

When Cassandra is selected:

*   Spring Data Reactive for Apache Cassandra is used
*   The [entity sub-generator]({{ site.url }}/creating-an-entity/) will not ask you for entity relationships, as you can't have relationships with a NoSQL database (at least not in the way you have relationships with JPA)
*   The generated entities only support one partition key, which is the ID. Future versions will provide composite primary keys and clustering keys

## Migration tool

Similar to [Liquibase](http://www.liquibase.org/), JHipster provide a tool to apply your CQL migration scripts, with some restrictions:

*   The tool is not run by the application itself when it is started but inside a Docker container or manually
*   All CQL scripts must follow the pattern `{timestamp}_{description}.cql` and be placed in the changelog directory: `src/main/resources/config/cql/changelog/`
*   All non already applied scripts located in the changelog directory are applied in alphabetical order (ie: following the timestamp)
*   Because Cassandra is not a transactional database, if an error happen before inserting the metadata in the table used by the tool there is a risk to have your CQL migration script run multiple times

Some information on the tool:

*   After generating an entity, its CQL file will be generated in `src/main/resources/config/cql/changelog/` in the same way we generate Liquibase changelogs for JPA
*   For running tests, all the CQL scripts in the `src/main/resources/config/cql/changelog/` directory are automically applied to the in memory cluster
    *   Meaning you have nothing to do but to drop your script in the changelog directory to have it applied for the tests
*   The tool uses its own cassandra table `schema_version` to store the metadata info

The tool will apply the migration scripts from `src/main/resources/config/cql/` in the following order:

1.  `create-keyspace.cql` - create the keyspace and the `schema_version` table to store the migration metadata
2.  all `cql/changelog/\*.cql` files in alphabetical order

### Running the tool

Depending if you are using Docker or not, you have several options to run the migration tool.

#### With Docker:

If you have started the Cassandra cluster with docker-compose, using the generated `app.yml` or `cassandra.yml` compose files, the tool has already been run and all cql scripts applied.

After adding a CQL script in the changelog directory, you can relaunch the docker-service responsible to run the migration service again without stopping the cluster:  
`docker-compose -f src/main/docker/cassandra.yml up <app>-cassandra-migration`

#### Manually:

With some prerequisites, you can run the tool manually. It could be useful to familiarize you with the tool to later include it to your deployment pipeline.

##### Prerequisites:

*   Add the Cassandra contact point environment variable, typically locally: ``export CASSANDRA_CONTACT_POINT=`127.0.0.1` ``
*   Install a recent (>4) bash version and md5sum with your favorite package manager
*   Have CQLSH in your classpath

To run the tool use this command: `src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/`

By default, the `src/main/resources/config/create-keyspace.cql` script is used to create the keyspace if necessary.
You can override it with a second argument: `src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/ create-keyspace-prod.cql`

If you only want to execute a specific script against your cluster use: `src/main/docker/cassandra/scripts/execute-cql.sh src/main/resources/config/cql/changelog/<your script>.cql`

## Cassandra and Docker on non-linux OSs

On Mac OSx and Windows, Docker containers are not hosted directly but on a VirtualBox VM.  
Those, you can not access them in localhost but have to hit the VirtualBox IP.

You can override the Cassandra contact point (localhost by default) with this environment variable: ``export SPRING_DATA_CASSANDRA_CONTACTPOINTS=`docker-machine ip default` ``

#### Cassandra nodes:

Because Cassandra nodes are also hosted in the Virtual machine, the Cassandra Java driver will receive an error when trying to contact them after receiving their address from the contact point.  
To workaround this, you can add a routing rule to your routing table, [(source)](http://krasserm.github.io/2015/07/13/chaos-testing-with-docker-and-cassandra/#port-mapping).

Assuming the containers running the Cassandra nodes have IP address 172.18.0.x:  
``sudo route -n add 172.18.0.0/16 `docker-machine ip default` ``
