---
layout: default
title: Documentation API statique
sitemap:
priority: 0.5
lastmod: 2015-07-31T18:40:00-00:00
---

# Documentation API statique avec Swagger2Markup

__Conseil soumis par [@atomfrede](https://github.com/atomfrede)__

> Vous devriez utiliser le nouveau module [swagger2markup](https://github.com/atomfrede/generator-jhipster-swagger2markup) au lieu de suivre ce conseil ! Consultez le [Marketplace JHipster](https://www.jhipster.tech/modules/marketplace/) pour plus de détails sur le système de modules.

Si vous souhaitez générer une documentation API statique (et la combiner avec une documentation écrite à la main), [Swagger2Markup](https://swagger2markup.readme.io/) fournit un moyen facile de combiner la documentation API auto-générée produite par Swagger avec une documentation écrite à la main dans un guide utilisateur à jour, facile à lire, en ligne et hors ligne, en HTML, PDF et EPUB.

## Ajouter les dépendances, plugins et classe de test requis

### Maven

Ajoutez ce qui suit aux dépendances de votre projet :

    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-staticdocs</artifactId>
        <version>${springfox.version}</version>
        <scope>test</scope>
    </dependency>

Ajoutez ce qui suit à la section des plugins :

    <plugin>
      <groupId>org.asciidoctor</groupId>
      <artifactId>asciidoctor-maven-plugin</artifactId>
      <version>1.5.2</version>
      <executions>
        <execution>
          <id>output-html</id>
          <phase>test</phase>
          <goals>
            <goal>process-asciidoc</goal>
          </goals>
          <configuration>
            <backend>html5</backend>
            <outputDirectory>${project.build.directory}/docs/html</outputDirectory>
          </configuration>
        </execution>
        <execution>
          <id>output-pdf</id>
          <phase>test</phase>
          <goals>
            <goal>process-asciidoc</goal>
          </goals>
          <configuration>
            <backend>pdf</backend>
            <outputDirectory>${project.build.directory}/docs/pdf</outputDirectory>
          </configuration>
        </execution>
      </executions>
      <dependencies>
        <dependency>
          <groupId>org.asciidoctor</groupId>
          <artifactId>asciidoctorj-pdf</artifactId>
          <version>1.5.0-alpha.8</version>
        </dependency>
      </dependencies>
      <configuration>
        <sourceDirectory>src/docs/asciidoc</sourceDirectory>
        <sourceDocumentName>index.adoc</sourceDocumentName>
        <attributes>
          <doctype>book</doctype>
          <toc>left</toc>
          <toclevels>2</toclevels>
          <generated>${project.build.directory}/docs/asciidoc/generated</generated>
        </attributes>
      </configuration>
    </plugin>

Dans `src/test/rest`, créez une nouvelle classe appelée `Swagger2MarkupTest` :

    @RunWith(SpringJUnit4ClassRunner.class)
    @SpringApplicationConfiguration(classes = Application.class)
    @WebAppConfiguration
    @IntegrationTest
    public class Swagger2MarkupTest {

        private static final String API_URI = "/v2/api-docs";

        @Inject
        private WebApplicationContext context;

        private MockMvc mockMvc;

        private File projectDir;

        @Before
        public void setup() throws IOException {
            this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();

            ClassPathResource pathfileRes = new ClassPathResource("config/application.yml");
            projectDir = pathfileRes.getFile().getParentFile().getParentFile().getParentFile().getParentFile();
        }

        @Test
        public void convertSwaggerToAsciiDoc() throws Exception {
            Swagger2MarkupResultHandler.Builder builder = Swagger2MarkupResultHandler
                .outputDirectory(outputDirForFormat("asciidoc"));
            mockMvc.perform(get(API_URI).accept(APPLICATION_JSON))
                .andDo(builder.build())
                .andExpect(status().isOk());

        }

        private String outputDirForFormat(String format) throws IOException {
            return new File(projectDir, "target/docs/" + format + "/generated").getAbsolutePath();
        }
    }

### Gradle

Ajoutez la dépendance suivante aux dépendances de votre projet :

    testCompile group: 'io.springfox', name:'springfox-staticdocs', version: springfox_version

Ajoutez ce qui suit aux dépendances de votre script de construction :

    classpath 'org.asciidoctor:asciidoctor-gradle-plugin:1.5.2'
    classpath 'org.asciidoctor:asciidoctorj-pdf:1.5.0-alpha.8'

Appliquez le plugin `asciidoctor convert` :

    apply plugin: 'org.asciidoctor.convert'

Ajoutez ce qui suit pour générer HTML et PDF :

    ext {
        generatedAsciidoc = file("${buildDir}/docs/asciidoc/generated")
    }

    asciidoctor {
        dependsOn test
        sources {
            include 'index.adoc'
        }
        backends = ['html5', 'pdf']
        attributes = [
            doctype: 'book',
            toc: 'left',
            toclevels: '2',
            numbered: '',
            sectlinks: '',
            sectanchors: '',
            hardbreaks: '',
            generated: generatedAsciidoc
        ]
    }


Dans `src/test/rest` créez une nouvelle classe appelée `Swagger2MarkupTest`:

    @RunWith(SpringJUnit4ClassRunner.class)
    @SpringApplicationConfiguration(classes = Application.class)
    @WebAppConfiguration
    @IntegrationTest
    public class Swagger2MarkupTest {

        private static final String API_URI = "/v2/api-docs";

        @Inject
        private WebApplicationContext context;

        private MockMvc mockMvc;

        private File projectDir;

        @Before
        public void setup() throws IOException {
            this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();

            ClassPathResource pathfileRes = new ClassPathResource("config/application.yml");
            projectDir = pathfileRes.getFile().getParentFile().getParentFile().getParentFile().getParentFile();
        }

        @Test
        public void convertSwaggerToAsciiDoc() throws Exception {
            Swagger2MarkupResultHandler.Builder builder = Swagger2MarkupResultHandler
                .outputDirectory(outputDirForFormat("asciidoc"));
            mockMvc.perform(get(API_URI).accept(APPLICATION_JSON))
                .andDo(builder.build())
                .andExpect(status().isOk());

        }

        private String outputDirForFormat(String format) throws IOException {
            return new File(projectDir, "docs/" + format + "/generated").getAbsolutePath();
        }
    }

## Créez le fichier index.adoc

Créez `index.adoc` dans `src/docs/asciidoc` avec le contenu suivant :

    include::{generated}/overview.adoc[]
    include::{generated}/paths.adoc[]
    include::{generated}/definitions.adoc[]

## Générez la documentation statique

Votre documentation statique est générée pendant la phase de test de votre projet. Vous la trouverez dans  `src/target/docs/html` ou `build/asciidoc/html5`.

![Exemple de documentation](../images/008_tips_static_swagger_docs_01.png)

## Plus

Pour plus d'informations (par exemple, comment ajouter une documentation écrite à la main), consultez la [documentation de référence officielle](https://swagger2markup.readme.io/).
