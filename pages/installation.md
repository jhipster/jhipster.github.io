---
layout: default
title: Installing JHipster
permalink: /installation/
redirect_from:
  - /installation.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-30T08:20:00-00:00
---

# <i class="fa fa-cloud-download"></i> Installing JHipster

## Installation types

We provide 6 ways of working with JHipster. If in doubt, choose our 2nd option, "Local installation with NPM":

*   [JHipster Online](https://start.jhipster.tech/) is a simple way to generate an application without installing JHipster in the first place.
*   "Local installation with NPM" is the classical way of working with JHipster. Everything is installed on your machine, which can be a little complex to set up, but that's how most people usually work. In case of doubt, choose this installation.
*   "Local installation with Yarn" is the same as classical "Local installation with NPM", but using [Yarn](https://yarnpkg.com/) instead of NPM
*   "Installation with a package manager" is only available for Mac OS X and Windows. This is a very simple installation method, if you use a package manager, but it is still in BETA.
*   The Vagrant-based "[development box](https://github.com/jhipster/jhipster-devbox)", with all tools already set up in a Ubuntu-based virtual machine.
*   The "[Docker](https://www.docker.io/)" container, which brings you a lightweight container with JHipster installed.

## JHipster Online (for users wanting a simplified way to run JHipster)

[JHipster Online](https://start.jhipster.tech/) allows you to easily generate JHipster applications, without having to install JHipster.

This is intended for people trying JHipster for the first time, or who just want to have a look at what JHipster provides.

While it is easier to use, it is not the "full JHipster experience", and once your application is generated you will still need to follow most of the steps from the next section ("Local installation with NPM"), as you will still need Java (to run your application) and NPM (to manage your front-end code).

In the future, we expect JHipster Online to provide more features, of course.

## Local installation with NPM (recommended for normal users)

### Quick setup

1.  Install Java 8 from [the Oracle website](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
2.  Install Node.js from [the Node.js website](http://nodejs.org/) (please use an LTS 64-bit version, non-LTS versions are not supported)
3.  NPM is installed with Node.js but you need to upgrade it: `npm install -g npm`
4.  If you want to use the JHipster Marketplace, install Yeoman: `npm install -g yo`
5.  Install JHipster: `npm install -g generator-jhipster`

Now that JHipster is installed, your next step is to [create an application]({{ site.url }}/creating-an-app/)

### Optional installations

1. Install a Java build tool.
    *   Whether you choose to use [Maven](http://maven.apache.org/) or [Gradle](http://www.gradle.org/), you normally don't have to install anything, as JHipster will automatically install the [Maven Wrapper](https://github.com/takari/maven-wrapper) or the [Gradle Wrapper](http://gradle.org/docs/current/userguide/gradle_wrapper.html) for you.
    *   If you don't want to use those wrappers, go to the official [Maven website](http://maven.apache.org/) or [Gradle website](http://www.gradle.org/) to do your own installation.
2.  Install Git from [git-scm.com](http://git-scm.com/). We recommend you also use a tool like [SourceTree](http://www.sourcetreeapp.com/) if you are starting with Git.
    * JHipster will try to commit your project to Git, if it is installed.
    * The [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) requires to have Git installed.

### Additional information

JHipster uses [Yeoman](http://yeoman.io/) for code generation.
To find more information, tips and help, please have a look at [the Yeoman "getting starting" guide](http://yeoman.io/learning/index.html) before [submitting a bug](https://github.com/jhipster/generator-jhipster/issues?state=open).

The configuration will be stored in a generated `.yo-rc.json` file, so it is **strongly** recommended not to generate a JHipster project in your HOME directory. If you did it, you won't be able to generate another project in a sub directory. To solve it, simply delete the `.yo-rc.json` file.

## Local installation with Yarn (alternative to NPM)

### Quick setup

This is the same procedure as using NPM, with two differences:

1. Instead of upgrading NPM in step 3, install Yarn from [the Yarn website](https://yarnpkg.com/en/docs/install)
2. Use `yarn global add` instead of `npm install -g`, for example:
    * To install Yeoman, type: `yarn global add yo`
    * To install JHipster, type: `yarn global add generator-jhipster`

### Troubleshooting

If you have problems using Yarn globally, be sure to have `$HOME/.config/yarn/global/node_modules/.bin` in your path.

On Mac or Linux: ```export PATH="$PATH:`yarn global bin`:$HOME/.config/yarn/global/node_modules/.bin"```

## Installation with a package manager

__Please note this is a BETA feature!__ If you selected this installation, don't hesitate to send us a [bug report](https://github.com/jhipster/generator-jhipster/issues) or feedback on [@java_hipster](https://twitter.com/java_hipster).

### Installation with Homebrew on Mac OS X

JHipster provides a [Homebrew](https://brew.sh/) package, available on [http://formulae.brew.sh/formula/jhipster](http://formulae.brew.sh/formula/jhipster).

To install JHipster (as well as Node and NPM), just type:

    brew install jhipster

New versions of this package are published each time a new JHipster release is created, but it might take time for the Homebrew team to validate this package - so if you have an older JHipster release, please be patient or use the NPM installation above.

### Installation with Chocolatey on Windows

JHipster provides a [Chocolatey](https://chocolatey.org/) package, available on [https://chocolatey.org/packages/jhipster](https://chocolatey.org/packages/jhipster).

To install JHipster (as well as Node, NPM, Yeoman, Java and Git), just type:

    choco install jhipster

New versions of this package are published each time a new JHipster release is created, but it might take time for the Chocolatey team to validate this package - so if you have an older JHipster release, please be patient or use the NPM installation above.

## Vagrant box installation

The [JHipster development box](https://github.com/jhipster/jhipster-devbox) project gives you a virtual machine with all the necessary tools to develop your JHipster project.

It's an easy way to get up and running very quickly with JHipster.

Besides JHipster, this virtual machine includes many development tools, as well as Docker, so you should have everything ready for working.

Please go to the [JHipster development box page](https://github.com/jhipster/jhipster-devbox) for installation and configuration information.

## Docker installation (for advanced users only)

_Please note: this Docker image is for running the JHipster generator inside a container. It's completely different from the [Docker and Docker Compose configurations]({{ site.url }}/docker-compose/) that JHipster will generate, which goal is to run your generated application inside a container_

### Information

JHipster has a specific [Dockerfile](https://github.com/jhipster/generator-jhipster/blob/master/Dockerfile), which provides a [Docker](https://www.docker.io/) image.

It makes a Docker "Automated build" that is available on: [https://hub.docker.com/r/jhipster/jhipster/](https://hub.docker.com/r/jhipster/jhipster/)

This image will allow you to run JHipster inside Docker.

### Prerequisites

This depends on your operating system.

1.  **Linux:** Linux supports Docker out-of-box. You just need to follow the tutorial on the [Docker](https://docs.docker.com/installation/#installation) website.
2.  **Mac & Windows:** install the [Docker Toolbox](https://www.docker.com/docker-toolbox) to get Docker installed easily.

As the generated files are in your shared folder, they will not be deleted if you stop your Docker container. However, if you don't want Docker to keep downloading all the Maven and NPM dependencies every time you start the container, you should commit its state or mount a volume.

<div class="alert alert-warning"><i>Warning: </i>

Based on your OS, your <code>DOCKER_HOST</code> will differ. On Linux, it will be simply your localhost.
For Mac/Windows, you will have to obtain the IP using following command: <code>docker-machine ip default</code>

</div>

<div class="alert alert-info"><i>Tip: </i>

Kitematic is an easy-to-use graphical interface provided with the Docker Toolbox, which will makes this installation a lot easier.

</div>

On Linux, you might need to run the `docker` command as root user if your user is not part of docker group. It's a good idea to add your user to docker group so that you can run docker commands as a non-root user. Follow the steps on [http://askubuntu.com/a/477554](http://askubuntu.com/a/477554) to do so.

### Usage on Linux/Mac Windows (using Docker Toolbox)

#### Pull the image

Pull the latest JHipster Docker image:

`docker image pull jhipster/jhipster`

Pull the development JHipster Docker image:

`docker image pull jhipster/jhipster:master`

You can see all tags [here](https://hub.docker.com/r/jhipster/jhipster/tags/)

#### Run the image

<div class="alert alert-warning"><i>Warning: </i>

If you are using Docker Machine on Mac or Windows, your Docker daemon has only limited access to your OS X or Windows file system. Docker Machine tries to auto-share your /Users (OS X) or C:\Users\&lt;username&gt; (Windows) directory. So you have to create the project folder under these directory to avoid any volume mounting issues.

</div>


Create a "jhipster" folder in your home directory:

`mkdir ~/jhipster`

Run the Docker image, with the following options:

*   The Docker "/home/jhipster/app" folder is shared to the local "~/jhipster" folder
*   Forward all ports exposed by Docker (8080 for the Java application, 9000 for BrowserSync, 3001 for the BrowserSync UI)

`docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

<div class="alert alert-info"><i>Tip: </i>

If you have already started the container once before, you do not need to run the above command, you can simply start/stop the existing container.

</div>

#### Check if the container is running

To check that your container is running, use the command `docker container ps`:

    CONTAINER ID    IMAGE               COMMAND                 CREATED         STATUS          PORTS                                                       NAMES
    4ae16c0539a3    jhipster/jhipster   "tail -f /home/jhipst"  4 seconds ago   Up 3 seconds    0.0.0.0:9000-3001->9000-3001/tcp, 0.0.0.0:8080->8080/tcp    jhipster

#### Common operations

*   To stop the container execute: `docker container stop jhipster`
*   And to start again, execute: `docker container start jhipster`

In case you update the Docker image (rebuild or pull from the Docker hub), it's better to remove the existing container, and run the container all over again. To do so, first stop the container, remove it and then run it again:

1.  `docker container stop jhipster`
2.  `docker container rm jhipster`
3.  `docker image pull jhipster/jhipster`
4.  `docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

### Accessing the container

<div class="alert alert-warning"><i>Warning: </i>

On Windows, you need to execute the Docker Quick Terminal as Administrator to be able to create symlinks during the `npm install` step.

</div>

The easiest way to log into the running container is by executing following command:

`docker container exec -it <container_name> bash`

If you copy-pasted the above command to run the container, notice that you have to specify `jhipster` as the container name:

`docker container exec -it jhipster bash`

You will log in as the "jhipster" user.

If you want to log in as "root", as the `sudo` command isn't available in Ubuntu Xenial, you need to run:

`docker container exec -it --user root jhipster bash`

### Your first project

You can then go to the /home/jhipster/app directory in your container, and start building your app inside Docker:

`cd /home/jhipster/app`

`jhipster`

<div class="alert alert-info"><i>Tip: </i>

If you prefer using Yarn, you can use <code>jhipster --yarn</code>, to use Yarn instead of NPM.

</div>

Once your application is created, you can run all the normal gulp/bower/maven commands, for example:

`./mvnw`

**Congratulations! You've launched your JHipster app inside Docker!**

On your host machine, you should be able to :

*   Access the running application at `http://DOCKER_HOST:8080`
*   Get all the generated files inside your shared folder

<div class="alert alert-warning"><i>Warning: </i>
    By default, Docker is not installed inside the <code>jhipster/jhipster</code> image.
    <br/>
    So you won't be able to:
    <ul>
        <li>use the docker-compose files</li>
        <li>build a Docker image with the docker daemon (Maven goal: <code>jib:dockerBuild</code> or Gradle task: <code>jibDockerBuild</code>)</li>
    </ul>
    However, you will be able to use [jib](https://github.com/GoogleContainerTools/jib)'s daemonless mode which can build a docker image and push it to a registry without access to a docker daemon (Maven goal: <code>jib:build</code> or Gradle task: <code>jibBuild</code>). But you will need to setup credentials to the docker registry as a pre-requisite of building the app. See the [Jib plugin configuration documentations](https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration) for more details.
</div>
