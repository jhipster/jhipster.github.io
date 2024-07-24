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
        from: '/blueprints/quarkus/001_installing_jhipster_quarkus.html',
        to: '/blueprints/quarkus/installing-jhipster-quarkus',
      },
      {
        from: '/blueprints/quarkus/002_creating_an_application.html',
        to: '/blueprints/quarkus/creating-an-application',
      },
      {
        from: '/blueprints/quarkus/003_creating_an_entity.html',
        to: '/blueprints/quarkus/creating-an-entity',
      },
      {
        from: '/tips/003_tip_add_querydsl_support.html',
        to: '/tips/tip_add_querydsl_support',
      },
      {
        from: '/tips/004_tip_using_ms_sql_server.html',
        to: '/tips/tip_using_ms_sql_server',
      },
      {
        from: '/tips/006_tips_enable_cross_origin_requests.html',
        to: '/tips/tips_enable_cross_origin_requests',
      },
      {
        from: '/tips/008_tips_static_swagger_docs.html',
        to: '/tips/tips_static_swagger_docs',
      },
      {
        from: '/tips/009_tips_using_bootswatch_themes.html',
        to: '/tips/tips_using_bootswatch_themes',
      },
      {
        from: '/tips/010_tip_configuring_html_5_mode.html',
        to: '/tips/tip_configuring_html_5_mode',
      },
      {
        from: '/tips/011_tip_configuring_email_in_jhipster.html',
        to: '/tips/tip_configuring_email_in_jhipster',
      },
      {
        from: '/tips/013_tip_speed_up_generator.html',
        to: '/tips/tip_speed_up_generator',
      },
      {
        from: '/tips/014_tip_using_mariadb.html',
        to: '/tips/tip_using_mariadb',
      },
      {
        from: '/tips/015_tip_local_smtp_server.html',
        to: '/tips/tip_local_smtp_server',
      },
      {
        from: '/tips/016_tip_ldap_authentication.html',
        to: '/tips/tip_ldap_authentication',
      },
      {
        from: '/tips/017_tip_repl_with_the_remote_shell.html',
        to: '/tips/tip_repl_with_the_remote_shell',
      },
      {
        from: '/tips/018_tip_kubernetes_and_google_cloud_sql.html',
        to: '/tips/tip_kubernetes_and_google_cloud_sql',
      },
      {
        from: '/tips/019_tip_infinite_scroll_with_slice.html',
        to: '/tips/tip_infinite_scroll_with_slice',
      },
      {
        from: '/tips/020_tip_using_docker_containers_as_localhost_on_mac_and_windows.html',
        to: '/tips/tip_using_docker_containers_as_localhost_on_mac_and_windows',
      },
      {
        from: '/tips/021_tip_prevent_error_and_hanging_on_windows_when_using_gradle.html',
        to: '/tips/tip_prevent_error_and_hanging_on_windows_when_using_gradle',
      },
      {
        from: '/tips/022_tip_registering_user_with_additional_information.html',
        to: '/tips/tip_registering_user_with_additional_information',
      },
      {
        from: '/tips/023_tip_protecting_kibana_with_apache_basic_authent.html',
        to: '/tips/tip_protecting_kibana_with_apache_basic_authent',
      },
      {
        from: '/tips/024_tip_enabling_social_login_with_oauth2.html',
        to: '/tips/tip_enabling_social_login_with_oauth2',
      },
      {
        from: '/tips/025_tip_create_new_authority.html',
        to: '/tips/tip_create_new_authority',
      },
      {
        from: '/tips/026_tip_issue_of_onetoone_with_mapsid_how_to_avoid_it.html',
        to: '/tips/tip_issue_of_onetoone_with_mapsid_how_to_avoid_it',
      },
      {
        from: '/tips/027_tip_lazy_init_test_beans.html',
        to: '/tips/tip_lazy_init_test_beans',
      },
      { from: '/tips/028_tip_ie_support.html', to: '/tips/tip_ie_support' },
      {
        from: '/tips/028_tip_pgadmin_heroku.html',
        to: '/tips/tip_pgadmin_heroku',
      },
      {
        from: '/tips/029_tip_frontend_only.html',
        to: '/tips/tip_frontend_only',
      },
      {
        from: '/tips/030_tip_redis_replication.html',
        to: '/tips/tip_redis_replication',
      },
      {
        from: '/tips/031_tip_e2e_intellij.html',
        to: '/tips/tip_e2e_intellij',
      },
      {
        from: '/tips/032_tip_time_drift_docker.html',
        to: '/tips/tip_time_drift_docker',
      },
      {
        from: '/tips/033_tip_dynamic_env_variables.html',
        to: '/tips/tip_dynamic_env_variables',
      },
      { from: '/tips/033_tip_v7_upgrade.html', to: '/tips/tip_v7_upgrade' },
      {
        from: '/tips/034_tip_remove_register_account_service.html',
        to: '/tips/tip_remove_register_account_service',
      },
      {
        from: '/tips/035_tip_combine_generation_and_custom_code.html',
        to: '/tips/tip_combine_generation_and_custom_code',
      },
      {
        from: '/tips/036_tip_allow_common_web_fonts_in_spring_security.html',
        to: '/tips/tip_allow_common_web_fonts_in_spring_security',
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
