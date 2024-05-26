#code source du site Web public de JHipster en version Francaise disponible sur [https://www.jhipster.tech/](https://www.jhipster.tech/fr).

**Remarque**: Lorsque vous modifiez les styles, veuillez mettre à jour les fichiers `.scss` sous `css/scss` et exécuter `npm run sass` pour générer le CSS. NE METTEZ PAS À JOUR LE CSS directement.

Ce site Web est rendu avec les pages GitHub.

Pour exécuter localement :

- [Fourchez](https://github.com/jhipster/jhipster.github.io/fork) ce dépôt et clonez-le sur votre système de fichiers.
- [Installez Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/).
- Exécutez `npm install && bundle install` si vous l'exécutez pour la première fois.
- Si vous souhaitez éviter d'installer dans des répertoires système, installez plutôt dans le répertoire `vendor` : `bundle install --path vendor/bundle`.
- Sur MacOS, si vous avez des problèmes pour installer `nokogiri`, essayez : `bundle config build.nokogiri --use-system-libraries=true --with-xml2-include="$(xcrun --show-sdk-path)"/usr/include/libxml2`.
- Exécutez `bundle exec jekyll serve` ou `npm start` dans le dossier du dépôt cloné.
- Vous pourrez accéder au site à l'adresse http://localhost:4000.

Ou avec Docker et Docker-Compose (méthode recommandée sur Windows) :

- [Fourchez](https://github.com/jhipster/jhipster.github.io/fork) ce dépôt et clonez-le sur votre système de fichiers.
- Exécutez `docker-compose up`.
- Vous pourrez accéder au site à l'adresse http://0.0.0.0:4000.
