---
layout: default
title: Deploying to AWS with Elastic Beanstalk
permalink: /aws/
redirect_from:
  - /aws.html
sitemap:
    priority: 0.7
    lastmod: 2015-07-30T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> [BETA] Deploying to AWS with Elastic Beanstalk

**WARNING!** This is a new sub-generator, of **BETA** quality. Use it at your own risk! Feedback is highly welcome!

**WARNING!** Amazon does not provide a free tier, and does not sponsor JHipster. As such, we cannot test this sub-generator, and cannot guarantee that it works correctly. If you want us to be able to test this generator, you can consider sponsoring the project.

This sub-generator allows to deploy automatically your JHipster application to the [Amazon AWS cloud](https://aws.amazon.com/).

<div class="alert alert-info">_Tip:_ As an alternative to Elastic Beanstalk you can also deploy your JHipster application to AWS using [Boxfuse](/boxfuse/).  
Boxfuse comes with first-class support for JHipster as well as support for both MySQL and PostgreSQL databases.</div>

## Limitations

*   You can only use it with a MySQL database (PostgreSQL and Oracle will be added later).
*   Websockets doesn't work behind the load balancer by default.

## Running the sub-generator

Before running the sub-generator, you need to go the JHipster Generator directory, and install the AWS-SDK with some other dependencies.

Under Windows following these Steps:

```
cd %USERPROFILE%\AppData\Roaming\npm\node_modules\generator-jhipster
npm install aws-sdk progress node-uuid
```

and under Mac/Linux following these Steps:

```
cd /usr/local/lib/node_modules/generator-jhipster # Path to globally installed node modules
npm install aws-sdk progress node-uuid
```

Then log in with your Amazon AWS account and create a user for your JHipster application. To grant this user the required permissions attach the `AWSElasticBeanstalkFullAccess` policy.

After that create a credentials file at `~/.aws/credentials` on Mac/Linux or `C:\Users\USERNAME\.aws\credentials` on Windows.

```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

To deploy your application to Amazon AWS, type:

`yo jhipster:aws`

This should package your application in "production" mode, create an Bean Stalk application (with a MySQL database), upload your code, and start the application.

## Updating your deployed application

When your application is already deployed, you can re-deploy it by run the sub-generator again:

`yo jhipster:aws`

The sub generator ask your database credentials again but they will be ignored during the update.

## More information

*   [AWS SDK for JavaScript](http://aws.amazon.com/sdk-for-node-js)
*   [Progressbar for WAR upload](https://github.com/tj/node-progress)
