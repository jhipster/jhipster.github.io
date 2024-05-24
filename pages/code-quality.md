---
layout: default
title: Code Quality
permalink: /code-quality/
sitemap:
    priority: 0.7
    lastmod: 2018-08-18T12:40:00-00:00
---

## Qualité du code

La qualité du code peut être analysée en utilisant [SonarCloud](https://sonarcloud.io), qui est automatiquement configuré par JHipster.

## Utilisation de Sonar avec JHipster

JHipster fournit une configuration Docker Compose spécifique pour Sonar ([voici la documentation Docker Compose de JHipster]({{ site.url }}/docker-compose/)) qui fournit une instance Sonar prête à l'emploi. À la racine de votre projet, veuillez exécuter :

<pre>docker-compose -f src/main/docker/sonar.yml up -d</pre>


Si vous utilisez Maven, il a été automatiquement configuré :

  <pre>  ./mvnw -Pprod clean verify sonar:sonar -Dsonar.host.url=http://localhost:9001 </pre>

Si vous devez relancer la phase Sonar, veuillez vous assurer de spécifier au moins la phase  `initialize` car les propriétés Sonar sont chargées à partir du fichier sonar-project.properties.
   <pre> ./mvnw initialize sonar:sonar -Dsonar.host.url=http://localhost:9001</pre>

Si vous utilisez Gradle, il a également été automatiquement configuré :

 ./gradlew -Pprod clean check jacocoTestReport sonarqube -Dsonar.host.url=http://localhost:9001 


Dans tous les cas, vous pouvez désormais exécuter l'analyse avec [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner)si vous l'avez déjà installé.

    sonar-scanner

Une fois l'analyse terminée, elle sera disponible sur le tableau de bord Sonar, qui est disponible par défaut sur [http://127.0.0.1:9001/](http://127.0.0.1:9001/).

## Exclusion des fichiers de l'analyse Jacoco

Si vous souhaitez exclure certaines classes de l'analyse de couverture (par exemple, des classes générées ou la classe d'application) et que vous souhaitez avoir la couverture correcte dans le rapport html jacoco par défaut, vous devez exclure les classes de l'analyse et du rapport.

### Maven

Vous devez ajouter des exclusions aux objectifs `prepare-agent` et `report` des tests unitaires et d'intégration :

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>${jacoco-maven-plugin.version}</version>
    <executions>
        <execution>
            <id>pre-unit-tests</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
            <configuration>
                <!-- Exclure toute classe nommée Application de l'instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.utReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-unit-test</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
            <configuration>
                <!-- Exclure toute classe nommée Application du rapport -->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.utReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
        <execution>
            <id>pre-integration-tests</id>
            <goals>
                <goal>prepare-agent-integration</goal>
            </goals>
            <configuration>
                <!-- Exclure toute classe nommée Application de l'instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.itReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-integration-tests</id>
            <phase>post-integration-test</phase>
            <goals>
                <goal>report-integration</goal>
            </goals>
            <configuration>
                <!-- Exclure toute classe nommée Application du rapport -->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.itReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Gradle

Vous pouvez ajouter ce qui suit au fichier `sonar.gradle`:

```gradle
test {
    jacoco {
        excludes += ['build/generated/**']
    }
}

jacocoTestReport {
    afterEvaluate {
        classDirectories = files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                    '**/*_.class'
            ])
        })
    }
}
```

## Analyse automatique du projet généré par défaut

Le projet générateur JHipster publie un projet d'exemple qui est analysé chaque fois qu'un nouveau commit est fusionné dans la branche "main" :

[Analyse de l'application d'exemple JHipster ](https://sonarcloud.io/dashboard?id=jhipster-sample-application) sous [l'organisation JHipster](https://sonarcloud.io/organizations/jhipster)

Cela permet à l'équipe JHipster de s'assurer que vous commencerez à développer votre projet sur le code le plus propre possible.

Cette analyse est fournie gratuitement par  [SonarCloud](https://sonarcloud.io).
