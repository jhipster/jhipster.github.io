---
layout: default
title: Time Drift in Docker
sitemap:
priority: 0.1
lastmod: 2020-05-02T06:14:00-00:00
---

# Time Drift in Docker

**Tip submitted by [@SudharakaP](https://github.com/SudharakaP)**

One of the things that should be taken into account when running Docker for extended periods of time (with sleep cycles in between), is that there are instances were a 
time drift between the Docker container(s) and OS clock can occur.

This results in hard to find bugs such as [https://github.com/jhipster/generator-jhipster/issues/11659](https://github.com/jhipster/generator-jhipster/issues/11659). 

Docker time drift has been reported for both [Macs](https://github.com/docker/for-mac/issues/2076) and [Windows](https://github.com/docker/for-win/issues/4526) 
and the simplest solution is to restart the Docker container(s) after extended periods of sleep cycles. 