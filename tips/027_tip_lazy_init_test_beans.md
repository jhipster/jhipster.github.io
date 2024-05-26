---
layout: default
title: Augmenter les performances des tests d'intégration en initialisant les beans de manière paresseuse
sitemap:
priority: 0.1
lastmod: 2019-10-01T18:20:00-00:00
---

# Augmenter les performances des tests d'intégration en initialisant les beans de manière paresseuse

__Conseil soumis par [@atomfrede](https://github.com/atomfrede)__

Dans de nombreux tests d'intégration Spring, vous n'avez pas besoin de tous les beans. Par conséquent, l'initialisation de tous les beans dans le contexte pour, par exemple, un test de repository n'est pas nécessaire et consomme un temps précieux.

Vous pouvez configurer vos tests pour initialiser les beans de manière paresseuse, de sorte que seuls les beans requis soient créés en créant une classe `TestLazyBeanInitConfiguration` dans `src/test/java/VOTRE-PACKAGE/config` avec le contenu suivant :

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

Si vous voulez / avez besoin qu'un test initialise tous les beans de manière proactive, vous devez annoter ce test avec `@ActiveProfiles(TestLazyBeanInitConfiguration.EAGER_BEAN_INIT)`.

Pour plus de détails, consultez le [blog de Spring Boot](https://spring.io/blog/2019/03/14/lazy-initialization-in-spring-boot-2-2) et le [pull request associé](https://github.com/jhipster/generator-jhipster/pull/10241).

Merci à [@rabiori](https://github.com/rabiori) pour l'implémentation.





