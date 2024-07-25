const redirectsPlugin = [
  '@docusaurus/plugin-client-redirects',
  {
    redirects: [
      { from: '/jdl', to: '/jdl/intro' },
      { from: ['/boxfuse.html', '/boxfuse'], to: '/cloudcaptain' },
      {
        from: '/configuring_a_corporate_proxy.html',
        to: '/configuring-a-corporate-proxy',
      },
      {
        from: '/configuring_ide_eclipse.html',
        to: '/configuring-ide-eclipse',
      },
      { from: '/configuring_ide_idea.html', to: '/configuring-ide-idea' },
      {
        from: '/configuring_ide_netbeans.html',
        to: '/configuring-ide-netbeans',
      },
      {
        from: '/configuring_ide.html',
        to: '/configuring-ide',
      },
      {
        from: ['/thanks.html', '/thanks'],
        to: '/contributing-companies',
      },
      { from: '/creating_an_app.html', to: '/creating-an-app' },
      { from: '/creating_an_entity.html', to: '/creating-an-entity' },
      {
        from: ['/customizing_bootstrap.html', '/customizing-bootstrap/'],
        to: '/customizing-bootstrap-3',
      },
      { from: '/docker_compose.html', to: '/docker-compose' },
      { from: '/docker_hub.html', to: '/docker-hub' },
      {
        from: '/installing_new_languages.html',
        to: '/installing-new-languages',
      },
      { from: '/jhipster_uml.html', to: '/jhipster-uml' },
      {
        from: '/managing_relationships.html',
        to: '/managing-relationships',
      },
      { from: '/running_tests.html', to: '/running-tests' },
      {
        from: '/setting_up_ci_jenkins2.html',
        to: '/setting-up-ci-jenkins2',
      },
      { from: '/setting_up_ci_linux.html', to: '/setting-up-ci-linux' },
      {
        from: '/setting_up_ci_windows.html',
        to: '/setting-up-ci-windows',
      },
      { from: '/setting_up_ci.html', to: '/setting-up-ci' },
      { from: '/tech_stack.html', to: '/tech-stack' },
      { from: '/using_angularjs.html', to: '/using-angularjs' },
      { from: '/using_cassandra.html', to: '/using-cassandra' },
      { from: '/using_couchbase.html', to: '/using-couchbase' },
      { from: '/using_dtos.html', to: '/using-dtos' },
      { from: '/using_elasticsearch.html', to: '/using-elasticsearch' },
      { from: '/using_kafka.html', to: '/using-kafka' },
      { from: '/using_mongodb.html', to: '/using-mongodb' },
      { from: '/using_oracle.html', to: '/using-oracle' },
      { from: '/using_pulsar.html', to: '/using-pulsar' },
      { from: '/using_websockets.html', to: '/using-websockets' },
      { from: '/using_neo4j.html', to: '/using-neo4j' },
      { from: '/video_tutorial.html', to: '/video-tutorial' },
      {
        from: [
          '/creating_a_blueprint.html',
          '/modules/creating_a_blueprint.html',
        ],
        to: '/modules/creating-a-blueprint',
      },
      {
        from: ['/creating_a_module.html', '/modules/creating_a_module.html'],
        to: '/modules/creating-a-module',
      },
      {
        from: [
          '/extending_and_customizing.html',
          '/modules/extending_and_customizing.html',
        ],
        to: '/modules/extending-and-customizing',
      },
      {
        from: '/official-blueprints.html',
        to: '/modules/official-blueprints',
      },
      {
        from: '/companies-using-jhipster/companies-using-jhipster.html',
        to: '/companies-using-jhipster/',
      },
      {
        from: '/2022/09/02/jhipster-release-7.9.4.html',
        to: '/2023/09/05/jhipster-release-7.9.4.html',
      },
    ],
  },
];

export default redirectsPlugin;
