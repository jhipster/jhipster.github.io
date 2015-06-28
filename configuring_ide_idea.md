---
layout: default
title: Configuring your IDE
sitemap:
priority: 0.7
lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="icon-keyboard"></i> Configuring Intellij IDEA

## Import your project

- Simply open your project normally
- Maven should be detected, and your project will build automatically

## Exclude directories

- Right-click on the `src/main/webapp/bower_components` folder
- Select "Mark Directory As" and select "Excluded"
- You should also exclude
    - `.tmp/`,
    - `node_modules/` and
    - `src/main/webapp/dist` (the `dist` folder will be created when you generate a production build)

![Exclude](images/configuring_ide_idea_1.png)

## Java Code Support

To add code support to many of the jHipster modules from a new project first go to `File → Project Structure`.

![Project Structure](http://puu.sh/ipvli/0f5dc91020.png)

Then go to the Modules tab, click on the `+` button, and then click on "Spring" to add Spring code assistance to your project.

![Spring](https://puu.sh/ipvnO/f717884d67.png)

It will tell you there are unmapped Spring configuration files, click on the plus sign on the right, not the original one, and select all the Spring files that belong to your project, just clicking the folder is enough to select everything.

![Spring Application Context](https://puu.sh/ipvqj/038441848a.png)

After that click `OK`, and your Spring should be configured with proper code assistance. 

Now click on the original `+` button which you used to add Spring in the first place, and add Hibernate. You do not need to add any files on this one, just adding it there will give you Hibernate based code assistance. Remember to click `OK` on the Project structure dialog. 

With this you should now have Java support for most of the codebase. You have to repeat this step everytime you start a new project, as these settings are project specific.

## Javascript Code Support

Go and open `File → Settings`.

![Settings](https://puu.sh/ipvDD/6ad4505a7a.png)

Type "Javascript" on the top search bar and navigate to `Languages & Frameworks → Javascript → Libraries` 

![Navigation to Javascript](https://puu.sh/ipvLe/2acdc910e8.png)

From there tick on:

<ul>
    <li>angular-ui-router-DefinitelyTyped</li>
    <li>angularjs-DefinitelyTyped</li>
    <li>bootstrap-DefinitelyTyped</li>
    <li>gruntjs-DefinitelyTyped</li>
    <li>jquery</li>
    <li>jQuery-2.0.0</li>
    <li>Modernizr-2.6.2</li>
    <li>HTML</li>
    <li>HTML5 / ECMAScript 5</li>
</ul>

If any of these options don't show up, click the `Download` button on the right side of the Libraries tab you should be in, it will show you a menu with several Official Libraries, then you click on the Library you need to install and click the `Download and Install` button.

![Download Library](https://puu.sh/ipvXi/04f3ecba9e.png)

You can also switch to the `TypeScript community stubs` tab in the `Download Library` menu if you want very in-depth code support for specific libraries, I've found that just having the ones on the above list gives you very good code coverage.

After configuring this you should have fairly extensive code support for the Javascript libaries in jHipster.
