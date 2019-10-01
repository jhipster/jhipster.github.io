---
layout: default
title: Increase integration test performance by lazy bean initialization
sitemap:
priority: 0.1
lastmod: 2019-10-01T18:20:00-00:00
---

# Increase integration test performance by lazy bean initialization

__Tip submitted by [@atomfrede](https://github.com/atomfrede)__

In many spring integration tests you don't need all beans, therefore initialization 
of all beans in the context for e.g. a repository test is not required and consumes precious time.

You can configure your tests to initialize beans lazy, such that only required beans are create by creating
a class `TestLazyBeanInitConfiguration` in `src/test/java/YOUR-PACKAGE/config` with the following content:

```java
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Profile("!" + TestLazyBeanInitConfiguration.EAGER_BEAN_INIT)
public class TestLazyBeanInitConfiguration implements BeanFactoryPostProcessor {
    public static final String EAGER_BEAN_INIT = "eager-bean-init";

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        Arrays.stream(beanFactory.getBeanDefinitionNames())
            .map(beanFactory::getBeanDefinition)
            .forEach(beanDefinition -> beanDefinition.setLazyInit(true));
    }
}
```

If you want/need a test to initialize all beans eagerly you need to annotate this test with `@ActiveProfiles(TestLazyBeanInitConfiguration.EAGER_BEAN_INIT)`.

For reference look at [spring boot blog](https://spring.io/blog/2019/03/14/lazy-initialization-in-spring-boot-2-2) and the
[related pull request](https://github.com/jhipster/generator-jhipster/pull/10241).

Thanks to [@rabiori](https://github.com/rabiori) for the implementation.





