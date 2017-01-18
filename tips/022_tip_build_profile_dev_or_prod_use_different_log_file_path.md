---
layout: default
title: Build profile dev/prod use different log file path
sitemap:
priority: 0.5
lastmod: 2017-01-18T10:00:00-00:00
---

# Build profile dev/prod use different log file path

__Tip submitted by [@hookszhang](https://github.com/hookszhang)__

If you want to enable the logging output to a file, there will be such a problem:

How do i according to the different environment config log file path?

## For Gradle

Enable logging output to a file, edit file `src/main/resource/logback-spring.xml`

```
<configuration>
...
<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <fileNamePattern>#logback.fileNamePattern#</fileNamePattern>
        <maxHistory>90</maxHistory>
    </rollingPolicy>
    <encoder>
        <charset>utf-8</charset>
        <Pattern>%d %-5level [%thread] %logger{0}: %msg%n</Pattern>
    </encoder>
</appender>

<appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
    <queueSize>512</queueSize>
    <appender-ref ref="FILE"/>
</appender>

<root>
  ...
  <appender-ref ref="ASYNC"/>
  ...
</root>
...
</configuration>
```

Then edit file `gradle/profile_dev.gradle` to configuring when build profile is `dev` the log file path.

```
ext {
    logbackLoglevel = "DEBUG"
    // log file path
    logbackFileNamePattern = "log/logFile.%d{yyyy-MM-dd}.log"
}

processResources {
  filesMatching('**/logback-spring.xml') {
      filter {
          it.replace('#logback.loglevel#', logbackLoglevel)
      }
      filter {
          it.replace('#logback.fileNamePattern#', logbackFileNamePattern)
      }
  }
  ...
}
```

Then edit file `gradle/profile_dev.gradle` to configuring when build profile is `prod` the log file path.

```
ext {
    logbackLoglevel = "INFO"
    // log file path
    logbackFileNamePattern = "/var/log/jhipster/logFile.%d{yyyy-MM-dd}.log"
}

processResources {
  filesMatching('**/logback-spring.xml') {
      filter {
          it.replace('#logback.loglevel#', logbackLoglevel)
      }
      filter {
          it.replace('#logback.fileNamePattern#', logbackFileNamePattern)
      }
  }
  ...
}
```

*Check that*

Build profile dev
```
$ ./gradlew clean build
```

Build profile prod
```
$ ./gradlew clean build -Pprod
```

Open file `build/resources/logback-spring.xml` and look at, the mark `#logback.fileNamePattern#` already replaced by `dev/prod` log file path.

## For Maven

Enable logging output to a file, edit file `src/main/resource/logback-spring.xml`

```
<configuration>
...
<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <fileNamePattern>@logback.fileNamePattern@</fileNamePattern>
        <maxHistory>90</maxHistory>
    </rollingPolicy>
    <encoder>
        <charset>utf-8</charset>
        <Pattern>%d %-5level [%thread] %logger{0}: %msg%n</Pattern>
    </encoder>
</appender>

<appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
    <queueSize>512</queueSize>
    <appender-ref ref="FILE"/>
</appender>

<root>
  ...
  <appender-ref ref="ASYNC"/>
  ...
</root>
...
</configuration>
```

Then edit file `pom.xml`, position at id is dev profile element

```
<profile>
  <id>dev</id>
  ...
  <properties>
      <!-- log configuration -->
      <logback.loglevel>DEBUG</logback.loglevel>
      <logback.fileNamePattern>log/logFile.%d{yyyy-MM-dd}.log</logback.fileNamePattern>
  </properties>
  ...
</profile>
```

Then edit position at id is prod profile element

```
<profile>
  <id>prod</id>
  ...
  <properties>
      <!-- log configuration -->
      <logback.loglevel>INFO</logback.loglevel>
      <logback.fileNamePattern>/var/log/jhipster/logFile.%d{yyyy-MM-dd}.log</logback.fileNamePattern>
  </properties>
  ...
</profile>
```

*Check that*

Build profile dev
```
$ ./mvnw clean package
```

Build profile prod
```
$ ./mvnw clean package -Pprod
```

Open file `build/resources/logback-spring.xml` and look at, the mark `@logback.fileNamePattern@` already replaced by `dev/prod` log file path.
