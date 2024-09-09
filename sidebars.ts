import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'getting-started',
    },
    {
      type: 'category',
      label: 'Installation and set up',
      items: [
        {
          type: 'doc',
          label: 'Installing JHipster',
          id: 'environment/installation',
        },
        {
          type: 'doc',
          label: 'Configuring a proxy',
          id: 'environment/configuring-a-corporate-proxy',
        },
        {
          type: 'category',
          label: 'Configuring your IDE',
          link: { type: 'doc', id: 'environment/configuring-ide/index' },
          items: [
            {
              type: 'doc',
              label: 'Eclipse with Maven',
              id: 'environment/configuring-ide/configuring-ide-eclipse',
            },
            {
              type: 'doc',
              label: 'Eclipse with Gradle',
              id: 'environment/configuring-ide/configuring-ide-eclipse-gradle',
            },
            {
              type: 'doc',
              label: 'Intellij IDEA',
              id: 'environment/configuring-ide/configuring-ide-idea',
            },
            {
              type: 'doc',
              label: 'Visual Studio Code',
              id: 'environment/configuring-ide/configuring-ide-visual-studio-code',
            },
            {
              type: 'doc',
              label: 'Netbeans',
              id: 'environment/configuring-ide/configuring-ide-netbeans',
            },
          ],
        },
        {
          type: 'doc',
          label: 'Docker Compose',
          id: 'environment/docker-compose',
        },
        {
          type: 'category',
          label: 'Shell Plugins',
          link: { type: 'doc', id: 'environment/shell-plugins/index' },
          items: [
            {
              type: 'doc',
              label: 'Oh-My-Zsh JHipster plugin',
              id: 'environment/shell-plugins/oh-my-zsh',
            },
            {
              type: 'doc',
              label: 'Fisher JHipster plugin',
              id: 'environment/shell-plugins/fisher',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Create application and entities',
      items: [
        {
          type: 'doc',
          label: 'Creating an application',
          id: 'core-tasks/creating-an-app',
        },
        {
          type: 'doc',
          label: 'Creating an entity',
          id: 'core-tasks/creating-an-entity',
        },
        { type: 'doc', label: ' Creating DTOs', id: 'core-tasks/using-dtos' },
        {
          type: 'doc',
          label: 'Managing relationships',
          id: 'core-tasks/managing-relationships',
        },
        {
          type: 'doc',
          label: 'Internationalization',
          id: 'core-tasks/installing-new-languages',
        },
        {
          type: 'doc',
          label: 'Upgrading an application',
          id: 'core-tasks/upgrading-an-application',
        },
      ],
    },
    {
      type: 'category',
      label: 'Optional Technologies',
      items: [
        { type: 'doc', label: 'Securing your app', id: 'options/security' },
        {
          type: 'doc',
          label: 'Filtering your entities',
          id: 'options/entities-filtering',
        },
        {
          type: 'doc',
          label: 'Using Elasticsearch',
          id: 'options/using-elasticsearch',
        },
        {
          type: 'doc',
          label: 'Using Websockets',
          id: 'options/using-websockets',
        },
        {
          type: 'doc',
          label: 'Doing API-First development',
          id: 'options/doing-api-first-development',
        },
        { type: 'doc', label: 'Using a cache', id: 'options/using-cache' },
        { type: 'doc', label: 'Using Oracle', id: 'options/using-oracle' },
        { type: 'doc', label: 'Using MongoDB', id: 'options/using-mongodb' },
        {
          type: 'doc',
          label: 'Using Couchbase',
          id: 'options/using-couchbase',
        },
        { type: 'doc', label: 'Using Neo4j', id: 'options/using-neo4j' },
        {
          type: 'doc',
          label: 'Using Cassandra',
          id: 'options/using-cassandra',
        },
        { type: 'doc', label: 'Using Kafka', id: 'options/using-kafka' },
        { type: 'doc', label: 'Using Pulsar', id: 'options/using-pulsar' },
      ],
    },
    {
      type: 'category',
      label: 'JDL',
      items: [
        { type: 'doc', label: 'Overview', id: 'jdl/intro' },
        { type: 'doc', label: 'Getting Started', id: 'jdl/getting-started' },
        { type: 'doc', label: 'Applications', id: 'jdl/applications' },
        { type: 'doc', label: 'Entities & fields', id: 'jdl/entities-fields' },
        { type: 'doc', label: 'Enums', id: 'jdl/enums' },
        { type: 'doc', label: 'Relationships', id: 'jdl/relationships' },
        { type: 'doc', label: 'Options', id: 'jdl/options' },
        { type: 'doc', label: 'Deployments', id: 'jdl/deployments' },
        { type: 'doc', label: 'Troubleshooting', id: 'jdl/troubleshooting' },
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        {
          type: 'doc',
          label: 'Using in development',
          id: 'development/development',
        },
        { type: 'doc', label: 'Managing profiles', id: 'development/profiles' },
        {
          type: 'doc',
          label: 'Common application properties',
          id: 'development/common-application-properties',
        },
        { type: 'doc', label: 'Common ports', id: 'development/common-ports' },
        {
          type: 'doc',
          label: 'Separating front-end and API',
          id: 'development/separating-front-end-and-api',
        },
        {
          type: 'category',
          label: 'Managing server errors',
          link: { type: 'doc', id: 'development/managing-server-errors' },
          items: [
            {
              type: 'doc',
              label: 'Problem with message',
              id: 'development/problem/problem-with-message',
            },
            {
              type: 'doc',
              label: 'Constraint violation',
              id: 'development/problem/constraint-violation',
            },
            {
              type: 'doc',
              label: 'Problem with a parameterized message',
              id: 'development/problem/parameterized',
            },
            {
              type: 'doc',
              label: 'Entity not found',
              id: 'development/problem/entity-not-found',
            },
            {
              type: 'doc',
              label: 'Invalid password',
              id: 'development/problem/invalid-password',
            },
            {
              type: 'doc',
              label: 'E-mail already used',
              id: 'development/problem/email-already-used',
            },
            {
              type: 'doc',
              label: 'Login already used',
              id: 'development/problem/login-already-used',
            },
            {
              type: 'doc',
              label: 'E-mail not found',
              id: 'development/problem/email-not-found',
            },
          ],
        },
        {
          type: 'doc',
          label: 'Using Angular',
          id: 'development/using-angular',
        },
        { type: 'doc', label: 'Using React', id: 'development/using-react' },
        { type: 'doc', label: 'Using Vue', id: 'development/using-vue' },
        {
          type: 'doc',
          label: 'Customizing Bootstrap',
          id: 'development/customizing-bootstrap',
        },
        { type: 'doc', label: 'Using TLS and HTTP/2', id: 'development/tls' },
      ],
    },
    {
      type: 'category',
      label: 'Test & QA',
      items: [
        {
          type: 'doc',
          label: 'Running tests',
          id: 'tests-and-qa/running-tests',
        },
        { type: 'doc', label: 'Code quality', id: 'tests-and-qa/code-quality' },
        {
          type: 'doc',
          label: 'Dependency Vulnerabilities Check',
          id: 'tests-and-qa/dependency-vulnerabities-check',
        },
        {
          type: 'category',
          label: 'Continuous Integration',
          link: { type: 'doc', id: 'tests-and-qa/setting-up-ci/index' },
          items: [
            {
              type: 'category',
              label: 'Setting up Jenkins 1',
              link: {
                type: 'doc',
                id: 'tests-and-qa/setting-up-ci/setting-up-ci-jenkins1',
              },
              items: [
                {
                  type: 'doc',
                  label: 'Jenkins 1 on Linux',
                  id: 'tests-and-qa/setting-up-ci/setting-up-ci-linux',
                },
                {
                  type: 'doc',
                  label: 'Jenkins 1 on Windows',
                  id: 'tests-and-qa/setting-up-ci/setting-up-ci-windows',
                },
              ],
            },
            {
              type: 'doc',
              label: 'Setting up Jenkins 2',
              id: 'tests-and-qa/setting-up-ci/setting-up-ci-jenkins2',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Production',
      items: [
        {
          type: 'doc',
          label: 'Using in production',
          id: 'production/production',
        },
        { type: 'doc', label: 'Monitoring', id: 'production/monitoring' },
        { type: 'doc', label: 'Docker Hub', id: 'production/docker-hub' },
        { type: 'doc', label: 'Deploying to Azure', id: 'production/azure' },
        {
          type: 'doc',
          label: 'Deploying with CloudCaptain',
          id: 'production/cloudcaptain',
        },
        {
          type: 'doc',
          label: 'Deploying to Clever Cloud',
          id: 'production/clever-cloud',
        },
        { type: 'doc', label: 'Deploying to Heroku', id: 'production/heroku' },
        {
          type: 'doc',
          label: 'Deploying to Kubernetes',
          id: 'production/kubernetes',
        },
      ],
    },
    {
      type: 'category',
      label: 'Microservices',
      items: [
        {
          type: 'doc',
          label: 'Overview',
          id: 'microservices/microservices-architecture',
        },
        { type: 'doc', label: 'API Gateway', id: 'microservices/api-gateway' },
        { type: 'doc', label: 'Consul', id: 'microservices/consul' },
        {
          type: 'doc',
          label: 'JHipster Registry',
          id: 'microservices/jhipster-registry',
        },
        {
          type: 'doc',
          label: 'Creating microservices',
          id: 'microservices/creating-microservices',
        },
        {
          type: 'doc',
          label: 'Microservices in production',
          id: 'microservices/microservices-in-production',
        },
        {
          type: 'doc',
          label: 'JHipster Control Center',
          id: 'microservices/jhipster-control-center',
        },
      ],
    },
    {
      type: 'category',
      label: 'Blueprints',
      items: [
        {
          type: 'doc',
          label: 'Official blueprints',
          id: 'modules/official-blueprints',
        },
        {
          type: 'doc',
          label: 'Blueprint Basics',
          id: 'modules/extending-and-customizing',
        },
        {
          type: 'doc',
          label: 'Creating a module',
          id: 'modules/creating-a-module',
        },
        {
          type: 'doc',
          label: 'Creating a Blueprint',
          id: 'modules/creating-a-blueprint',
        },
        {
          type: 'category',
          label: 'Quarkus documentation',
          link: { type: 'doc', id: 'blueprints/quarkus/index' },
          items: [
            {
              type: 'doc',
              label: 'Installing JHipster Quarkus Blueprint',
              id: 'blueprints/quarkus/installing-jhipster-quarkus',
            },
            {
              type: 'doc',
              label: 'Creating an application',
              id: 'blueprints/quarkus/creating-an-application',
            },
            {
              type: 'doc',
              label: 'Creating an entity',
              id: 'blueprints/quarkus/creating-an-entity',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      items: [
        {
          type: 'link',
          label: 'JDL Studio',
          href: 'https://start.jhipster.tech/jdl-studio/',
        },
        { type: 'doc', label: 'JHipster IDE', id: 'tools/jhipster-ide' },
        { type: 'doc', label: 'JHipster-UML', id: 'tools/jhipster-uml' },
      ],
    },
    {
      type: 'doc',
      label: 'JHipster Lite',
      id: 'jhipster-lite',
    },
    {
      type: 'category',
      label: 'JHipster in a few minutes',
      items: [
        { type: 'doc', label: 'Technology stack', id: 'about/tech-stack' },
        {
          type: 'doc',
          label: 'JHipster in 5 screenshots',
          id: 'about/screenshots',
        },
        {
          type: 'doc',
          label: 'Video tutorial (15 minutes)',
          id: 'about/video-tutorial',
        },
        {
          type: 'link',
          label: 'Online guides',
          href: 'https://github.com/jhipster/jhipster-guides',
        },
        {
          type: 'doc',
          label: 'Companies using JHipster',
          id: 'about/companies-using-jhipster',
        },
        {
          type: 'doc',
          label: 'Showcase of JHipster apps',
          id: 'about/showcase',
        },
      ],
    },
    {
      type: 'category',
      label: 'Release notes',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'releases/index',
      },
      items: [{ type: 'autogenerated', dirName: 'releases' }],
    },
    {
      type: 'category',
      label: 'Getting help',
      items: [
        { type: 'doc', label: 'Community help', id: 'help/help' },
        { type: 'doc', label: 'Bug bounties', id: 'help/bug-bounties' },
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        {
          type: 'doc',
          label: 'Financial sponsors',
          id: 'contributing/sponsors',
        },
        {
          type: 'doc',
          label: 'Contributing individuals',
          id: 'contributing/contributing-individuals',
        },
        {
          type: 'doc',
          label: 'Contributing companies',
          id: 'contributing/contributing-companies',
        },
      ],
    },
    {
      type: 'category',
      label: 'Tips and tricks',
      link: { type: 'doc', id: 'tips/index' },
      items: [
        {
          type: 'doc',
          label: 'Using Bootswatch themes',
          id: 'tips/tips_using_bootswatch_themes',
        },
        {
          type: 'doc',
          label: 'Configuring Email with - Gmail and more',
          id: 'tips/tip_configuring_email_in_jhipster',
        },
        {
          type: 'doc',
          label: 'Speed up the generator-jhipster',
          id: 'tips/tip_speed_up_generator',
        },
        {
          type: 'doc',
          label: 'Local SMTP Server',
          id: 'tips/tip_local_smtp_server',
        },
        {
          type: 'doc',
          label: 'LDAP Authentication',
          id: 'tips/tip_ldap_authentication',
        },
        {
          type: 'doc',
          label: 'REPL with the remote shell (deprecated)',
          id: 'tips/tip_repl_with_the_remote_shell',
        },
        {
          type: 'doc',
          label: 'Kubernetes and Google Cloud SQL',
          id: 'tips/tip_kubernetes_and_google_cloud_sql',
        },
        {
          type: 'doc',
          label:
            'Boost performance of pagination with infinite scrolling using Slice',
          id: 'tips/tip_infinite_scroll_with_slice',
        },
        {
          type: 'doc',
          label: 'Using Docker containers as localhost on Mac/Windows',
          id: 'tips/tip_using_docker_containers_as_localhost_on_mac_and_windows',
        },
        {
          type: 'doc',
          label: 'Use QueryDSL',
          id: 'tips/tip_add_querydsl_support',
        },
        {
          type: 'doc',
          label: 'Protecting Kibana with Apache (Basic Authentication)',
          id: 'tips/tip_protecting_kibana_with_apache_basic_authent',
        },
        {
          type: 'doc',
          label: 'Enabling Social Login with OAuth2',
          id: 'tips/tip_enabling_social_login_with_oauth2',
        },
        {
          type: 'doc',
          label: 'How to create a new Authority',
          id: 'tips/tip_create_new_authority',
        },
        {
          type: 'doc',
          label: 'Issue of @OneToOne with @MapsId and how to avoid it',
          id: 'tips/tip_issue_of_onetoone_with_mapsid_how_to_avoid_it',
        },
        {
          type: 'doc',
          label:
            'Increase integration test performance by lazy bean initialization',
          id: 'tips/tip_lazy_init_test_beans',
        },
        {
          type: 'doc',
          label: 'How to connect PGAdmin (PostgreSQL) to Heroku',
          id: 'tips/tip_pgadmin_heroku',
        },
        {
          type: 'doc',
          label: 'Provide Internet Explorer support',
          id: 'tips/tip_ie_support',
        },
        {
          type: 'doc',
          label:
            'Improve developer experience if opening only front end in the IDE',
          id: 'tips/tip_frontend_only',
        },
        {
          type: 'doc',
          label: 'Configure Redis leader follower(master-slave) replication',
          id: 'tips/tip_redis_replication',
        },
        {
          type: 'doc',
          label: 'Running Protractor e2e tests within Intellij IDEA',
          id: 'tips/tip_e2e_intellij',
        },
        {
          type: 'doc',
          label: 'Time Drift in Docker',
          id: 'tips/tip_time_drift_docker',
        },
        { type: 'doc', label: 'User entity management', id: 'user-entity' },
        {
          type: 'doc',
          label: 'Remove the register account service',
          id: 'tips/tip_remove_register_account_service',
        },
        {
          type: 'doc',
          label: 'Combine generation and custom code',
          id: 'tips/tip_combine_generation_and_custom_code',
        },
        {
          type: 'doc',
          label: 'Allow common web fonts in Spring Security',
          id: 'tips/tip_allow_common_web_fonts_in_spring_security',
        },
      ],
    },
    {
      type: 'doc',
      label: 'JHipster Developers Association',
      id: 'association',
    },
    {
      type: 'doc',
      label: 'JHipster Tech Board',
      id: 'tech-board',
    },
    {
      type: 'doc',
      label: 'JHipster meetups',
      id: 'meetups',
    },
    {
      type: 'doc',
      label: 'Artwork',
      id: 'artwork',
    },
  ],
};

export default sidebars;
