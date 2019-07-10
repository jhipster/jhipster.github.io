---
layout: default
title: Bug bounties
permalink: /bug-bounties/
sitemap:
    priority: 0.1
    lastmod: 2018-07-20T00:00:00-00:00
---
# <i class="fa fa-usd"></i> Bug bounties

## Introduction

Any ticket opened on the [JHipster bug tracker](https://github.com/jhipster/generator-jhipster/issues) can have a "\$\$ bug-bounty \$\$" label: the person who solves that ticket will get the money, either $100, $200, $300 or $500 depending on the ticket!

## Who can create bug bounties?

- [Silver and gold sponsors]({{ site.url }}/sponsors/)
- The three [core team project leads]({{ site.url }}/team/), [@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) and [@pascalgrimaud](https://github.com/pascalgrimaud).

## How much is a bug bounty?

Next to the "\$\$ bug-bounty \$\$" label, there should be a "$100", "$200", "$300" or "$500" label, that tells how the much the bug bounty is worth.

## Where is the list of currently opened bug bounties?

Bug bounties are mostly available on the main project, but can also be opened on sub-projects under the JHipster organization on GitHub.

- [Opened bug bounties on all projects](https://github.com/search?l=&p=1&q=is%3Aissue+is%3Aopen+label%3A%22%24%24+bug-bounty+%24%24%22+user%3Ajhipster+state%3Aopen&ref=advsearch&type=Issues&utf8=%E2%9C%93)
- [Opened bug bounties for the main project](https://github.com/jhipster/generator-jhipster/labels/%24%24%20bug-bounty%20%24%24)
- [Opened bug bounties for the JHipster VueJS sub-project](https://github.com/jhipster/jhipster-vuejs/labels/%24%24%20bug-bounty%20%24%24)

Happy bug hunting :-)

## How bug bounties are created

Once a ticket is created, it can get the bug bounty label by two actions:

- a silver or gold sponsor adds a comment asking to add the bug bounty label and mentioning [@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) or [@pascalgrimaud](https://github.com/pascalgrimaud) on GitHub.
- [@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) or [@pascalgrimaud](https://github.com/pascalgrimaud) directly add the bug bounty label, as they believe it is an important new feature, a critical bug, a long-standing issue, or a time-consuming task. If you are working on an issue and if you think it deserves a bounty don't hesitate to ask one of the project leads.

To be valid, the bug bounty should then have the [\$\$ bug-bounty \$\$](https://github.com/jhipster/generator-jhipster/labels/%24%24%20bug-bounty%20%24%24) label added by either
[@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) or [@pascalgrimaud](https://github.com/pascalgrimaud). It should also have a "$100", "$200", "$300" or "$500" label to tell how much it is worth, but if that tag has been forgotten, it is by default worth "$100".

## How to get the money

Once a bug bounty is created, anybody can propose a fix (even [@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) and [@pascalgrimaud](https://github.com/pascalgrimaud)!). Our goal is to spend that money so that something is fixed as quickly as possible.

In order to claim the money, you must:

- Create a Pull Request that fixes a ticket with the "\$\$ bug-bounty \$\$" label.
- In order to close the ticket automatically, you must have one commit message with the `Fix` keyword. For example, `Fix #1234` to close ticket `#1234`.
- That Pull Request must be merged by someone from the core team. If there are several Pull Requests, the core team member either selects the most recent one or the best one - that's up to him to decide what is best for the project.
- You can then [add a $100, $200, $300 or $500 expense on the JHipster OpenCollective](https://opencollective.com/generator-jhipster/expenses/new). You must add a link to your Pull Request in the description (for example: `$100 bug bounty claim for https://github.com/jhipster/generator-jhipster/pull/1234`). You will also need to provide an invoice, see the [Open Collective FAQ for expenses](https://opencollective.com/faq/expenses) for more details, and to get a Google Docs template that you can use.
- Then, you must add a comment on your Pull Request, telling that you claimed the money, with a link to your OpenCollective expense. This is to be sure it is the same person who fixed the issue and claimed the money.
- That expense will then be validated by [@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) or [@pascalgrimaud](https://github.com/pascalgrimaud), and you will receive your money on your Paypal account.
