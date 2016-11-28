---
layout: default
title: JHipster IDE Tools
permalink: /jhipster-ide/
sitemap:
    priority: 0.5
    lastmod: 2016-11-26T22:00:00-00:00
---

# <i class="fa fa-object-group"></i>JHipster IDE

JHipster IDE is an Xtext DSL which provides textual editing support of JHipster Domain Language files for popular IDEs and editors such as Eclipse, IDEA and Visual Studio Code. Thanks to Xtext, JHipster-IDE provides the features we have come to expect from modern text editors such as:

- Syntax Coloring
- Semantic Coloring
- Error Checking
- Auto-Completion
- Formatting
- Hover Information
- Mark Occurences
- Go To Declaration
- Rename Refactoring
- Toggle Comments
- Outline / Structure View
- Quick Fix Proposals
- Find References
- Call Hierarchy
- Type Hierarchy
- Folding

JHipster IDE is created by [Jose Badeau](https://github.com/jbadeau) and [Serano Colameo](https://github.com/colameo).

## Installation Prerequisites
- [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/)
- [Graphviz](http://www.graphviz.org/)

## Eclipse installation

Go to the "Help -> Install new software" menu and add a new repository with URL [https://dl.bintray.com/colameo/jhipster-ide/](https://dl.bintray.com/colameo/jhipster-ide/).

JHipster IDE is also available in the [Eclipse Marketplace](https://marketplace.eclipse.org/content/jhipster-ide). The easiest way to install it is to drag the icon on the start page into your Eclipse.
<br/>
<a href="http://marketplace.eclipse.org/marketplace-client-intro?mpc_install=3184658" class="drag" title="Drag to your running Eclipse workspace to install JHipster IDE"><img class="img-responsive" src="https://marketplace.eclipse.org/sites/all/themes/solstice/public/images/marketplace/btn-install.png" alt="Drag to your running Eclipse workspace to install JHipster IDE" /></a>. 

You can also open the marketplace dialog in Eclipse (Help > Eclipse Marketplace...) and search for <b>JHipster</b>.

![Eclipse installation]({{ site.url }}/images/jhipster_ide_eclipse.gif)

## Visual Studio Code installation

![Visual Studio Code installation]({{ site.url }}/images/jhipster_ide_vscode.png)

## Web Editor installation

![Web Editor installation]({{ site.url }}/images/jhipster_ide_webeditor.png)

## Coming soon
- Xdocker IDE Features to manage Docker containers and images
- IntelliJ IDEA
- Support for other tools supporting LSP such as Eclipse Che
- Web integration with AngularJS

## JHipster-IDE was made possible by these cool projects

- [Xtext](http://www.eclipse.org/Xtext/)
- [PlantUML](http://plantuml.com/)
- [Language Server Protocol (LSP)](https://github.com/Microsoft/language-server-protocol)
- [Eclipse](https://www.eclipse.org)
- [Visual Studio Code](https://code.visualstudio.com)
