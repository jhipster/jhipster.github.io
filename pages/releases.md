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

To get the latest JHipster news, please follow us on Twitter: [@jhipster](https://twitter.com/jhipster)

{% for post in site.posts %}
  {% assign split_post_title = post.title | split: "Release " %}
  {% assign split_post_version = split_post_title[1] | split: "." %}
  {% assign post_minor_version = split_post_version[1] %}
  {% assign post_patch_version = split_post_version[2] %}
  {% assign split_post_date = post.date | split: " " %}
  {% assign post_date = split_post_date.first %}
  {% if post_minor_version == '0' and post_patch_version == '0' %}
  *   **[{{ post.title }}]({{ post.url }}) ({{ post_date }})** :rocket:
  {% else %}
  *   [{{ post.title }}]({{ post.url }})
  {% endif %}
{% endfor %}
