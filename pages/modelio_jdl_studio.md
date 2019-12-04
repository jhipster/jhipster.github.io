---
layout: default
title: Modelio-JDL-Studio
permalink: /modelio-jdl-studio/
redirect_from:
  - /modelio_jdl_studio.html
sitemap:
    priority: 0.5
    lastmod: 2019-12-01T20:00:00-00:00
---

# <i class="fa fa-desktop"></i> Modelio-JDL-Studio

Modelio-JDL-Studio is a [Modelio](https://www.modelio.org/) module created by Softeam/Modeliosoft that allows Modelio users to design a JDL data model diagram and then to generate from it a JDL file.

Here's what's covered on this page:

1. [Introduction](#introduction)
2. [Installation Guide](#installation)  
    2.1. [Installing Modelio](#installingmodelio)  
    2.2. [Deploying the Modelio-JDL-Studio module in Modelio](#deployment)  
3. [User Guide](#userguide)  
    3.1. [The Modeling environment overview](#modelingenvironment)  
    3.2. [Creating a JDL model](#creatingjdlmodel)  
    3.3. [Palette tools](#palettetools)  
    3.4. [Property Page](#propertypage)  
    3.5. [Generating a JDL file](#generatingjdlfile)

***

## <a name="introduction"></a>Introduction

Modelio-JDL-Studio is a Modelio module used to design a JDL data model diagram and then to generate from it a JDL file for entities and their relationships. The module is available for the Modelio open source and is compatible with the version: 4.0 which can be downloaded for free [here](https://sourceforge.net/projects/modeliouml/files/4.0.0/).

***

## <a name="installation"></a>Installation Guide

### <a name="installingmodelio"></a>Installing Modelio

Modelio open source requires Java JDK 8 and supports the three main operating systems:  Windows, Linux and MacOS.

1. Download [Modelio Open Source](https://www.modelio.org/downloads/download-modelio.html).
2. Extract the package into the directory of your choice.
3. Start Modelio.

![modelio]({{ site.url }}/images/modelio_jdl_studio/modelio.png){:width="700" height="450"}

### <a name="deployment"></a>Deploying the Modelio-JDL-Studio module in Modelio

*Please note: the following instructions were tested under the Modelio 4.0 Open Source version*

To get the latest version of the Modelio-JDL-Studio module, head [here](https://github.com/ambpro/modelio-jdl-studio/releases/download/1.0.00/Modelio_JDL_Studio_1.0.00.jmdac).

After starting Modelio, it's time to add the Modelio-JDL-Studio module into the Modelio modules catalogues. To do this, click on the menu ***Configuration*** > ***Modules Catalog...*** then ***Add a module to the catalog...*** button and select the module *jmdac* file that you have downloaded.

![modules-catalog]({{ site.url }}/images/modelio_jdl_studio/modules_catalog.png){:width="700" height="500"}

Once the module has been added into the modules catalogues, create a new Modelio project and open it.

![create-project]({{ site.url }}/images/modelio_jdl_studio/create_project.png){:width="450" height="350"}

After that, in order to deploy the module inside your project, click on the menu ***Configuration*** > ***Modules***.

![modules]({{ site.url }}/images/modelio_jdl_studio/modules.png){:width="750" height="400"}

Next, click on ***Add*** button, select **Modelio-JDL-Studio** module that you have imported earlier to your modules catalogues then click on ***Deploy in the project***.

![deploy-modules]({{ site.url }}/images/modelio_jdl_studio/deploy_modules.png){:width="600" height="500"}

There you go, the module has been deployed successfully and it's available on the current project.

![project-configuration]({{ site.url }}/images/modelio_jdl_studio/project_configuration.png){:width="700" height="500"}

***

## <a name="userguide"></a>User Guide

### <a name="modelingenvironment"></a>The Modeling environment overview

Modelio-JDL-Studio module extends the capabilities of the Modelio modeling environment to provide a seamless way to design your JDL data model diagram and then generate the corresponding JDL file later. The module IU environment is comprised of:

1. **Model Explorer** : contains the elements of the hierarchy tree of the project where each element is contained inside its parent.

2. **JDL data model diagram** : consists of the place where you design your diagram including your entities, fields and associations.

3. **Palette** : contains the list of available tools used by the modelers to drag and drop the different components (entities, fields, associations, etc).

4. **Property Page** : displays the properties of the selected elements of the diagram.

![modelio-jdl-studio-sample]({{ site.url }}/images/modelio_jdl_studio/modelio_jdl_studio_sample.png){:width="750" height="400"}

### <a name="creatingjdlmodel"></a>Creating a JDL model

In order to start designing the JDL data model diagram, you have to create a package which encapsulates the diagram's model elements. To do so, right-click on the project package, ***Modelio JDL Studio*** > ***Create JDL Model***. A new package will be added including an empty palette template where you can create diagram later.

![create-jdl-model]({{ site.url }}/images/modelio_jdl_studio/create_jdl_model.png){:width="800" height="500"}

### <a name="palettetools"></a>Palette tools

The Palette is a main component of the modeling environment which allows to drag and drop the elements necessary to design a JDL diagram.

![palette-tools]({{ site.url }}/images/modelio_jdl_studio/palette_tools.png){:width="200" height="200"}

The JDL diagram is composed of the following elements:

* ![class-color]({{ site.url }}/images/modelio_jdl_studio/class_color.png){:width="30" height="30"} **Entity**: the model element to create an entity.
* ![success]({{ site.url }}/images/modelio_jdl_studio/success.png){:width="30" height="30"} **Field**: the model element to create an field.
* ![standard-enumeration]({{ site.url }}/images/modelio_jdl_studio/standard_enumeration.png){:width="30" height="30"} **Enumeration**: the model element to create an enumeration.
* ![standard-enumeration-literal]({{ site.url }}/images/modelio_jdl_studio/standard_enumeration_literal.png){:width="30" height="30"} **Enumeration literal**: the model element to attach an  entry value to an enumeration.
* ![relationship]({{ site.url }}/images/modelio_jdl_studio/relationship.png){:width="30" height="30"} **Relationship**: the model element used to link two entities together.
* ![javadoc]({{ site.url }}/images/modelio_jdl_studio/javadoc.png){:width="30" height="30"} **Javadoc**: the model element used to attach javadoc comments for entities, fields, relationships, etc.
* ![note]({{ site.url }}/images/modelio_jdl_studio/note.png){:width="30" height="30"} **Description**: the model element used to attach internal comments for JDL data model which will not be counted as Javadoc.

### <a name="propertypage"></a>Property Page

The Modelio-JDL-Studio module comes with a property page at the bottom right corner of the modeling tool. It used to manage the model elements properties including entities, fields and relationships.

* **Entity property page**

Once the entity model element has been selected into the JDL diagram, you can specify options for your entities such as pagination or DTO, etc.

![property-page-entity]({{ site.url }}/images/modelio_jdl_studio/property_page_entity.png){:width="800" height="200"}

* **Field property page**

This property view allows you to specify types and validations for the different fields of an entity.

![property-page-field]({{ site.url }}/images/modelio_jdl_studio/property_page_field.png){:width="800" height="200"}

* **Relationship property page**

It's also possible to specify options for your relationships like relationship types, orientations, roles, etc through the relationship property page.

![property-page-relationship]({{ site.url }}/images/modelio_jdl_studio/property_page_relationship.png){:width="800" height="200"}

### <a name="generatingjdlfile"></a>Generating a JDL file

Once your JDL data model diagram is done, it is time to generate your JDL file. To do this, right-click on your ***JDLModel*** package, choose ***Modelio JDL Studio*** > ***generate JDL file*** then select a directory and click on ***OK***.

![generate-jdl-file]({{ site.url }}/images/modelio_jdl_studio/generate_jdl_file.png){:width="750" height="400"}