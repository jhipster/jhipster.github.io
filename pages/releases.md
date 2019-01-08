---
layout: default
title: Release notes
permalink: /releases/
redirect_from:
  - /releases.html
sitemap:
    priority: 0.4
    lastmod: 2014-02-17T00:00:00-00:00
---

# <i class="fa fa-file-text-o"></i> Release notes

To get the latest JHipster news, please follow us on Twitter: [@java_hipster](https://twitter.com/java_hipster)

{% for post in site.posts %}
*   [{{ post.title }}]({{ post.url }})
{% endfor %}
