This is the source of JHipster's public [Web site](http://jhipster.github.io/).
=======

This Web site is rendered with Github pages.

To run this locally

* [Fork this](https://github.com/jhipster/jhipster.github.io/fork) repo and clone to your file system
* [Install Jekyll](https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll)
* Run `bundle exec jekyll serve` in the cloned repo folder
* you will be able to access the site at http://localhost:4000

Or with Docker
* [Fork this](https://github.com/jhipster/jhipster.github.io/fork) repo and clone to your file system
* `docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll   -it -p 127.0.0.1:4000:4000 jekyll/jekyll:pages`
* you will be able to access the site at http://localhost:4000
