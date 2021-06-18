---
layout: default
title: Deploying to AWS
permalink: /aws/
# redirect_from:
#   - /aws.html
sitemap:
    priority: 0.7
    lastmod: 2018-01-17T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Deploying to AWS

[![Powered by AWS Cloud Computing]({{ site.url }}/images/logo/logo-aws.png)](https://aws.amazon.com/what-is-cloud-computing)

## *aws* sub-generator

An instance based sub-generator for deploying applications via Elastic Beanstalk. This is great (and very cheap!) for small applications.

This sub-generator allows to deploy automatically your JHipster application to the [Amazon AWS cloud](https://aws.amazon.com/) using [Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html).

<div class="alert alert-info"> <i>Tip:</i> As an alternative to Elastic Beanstalk you can also deploy your JHipster application to AWS using <a href="{{ site.url }}/boxfuse/">Boxfuse</a>.  
Boxfuse comes with first-class support for JHipster as well as support for both MySQL and PostgreSQL databases.</div>

### Limitations

*   You can only use it with a SQL database (Oracle and Microsoft SQL Server aren't supported).
*   Websockets doesn't work behind the load balancer by default.

### Prerequisites

Before running the sub-generator, you need to setup your AWS SDK credentials. Log in with your Amazon AWS account and create a user for your JHipster application. To grant this user the required permissions attach the `AWSElasticBeanstalkFullAccess`, `AmazonRDSFullAccess` and `IAMFullAccess` policies.

After that create a credentials file at `~/.aws/credentials` on Mac/Linux or `C:\Users\USERNAME\.aws\credentials` on Windows.

```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

If you use a named profile different than `default`, you have to set the environment variable `AWS_PROFILE` with the correct profile.

### Deploying your application

To deploy your application to Amazon AWS, type:

`jhipster aws`

This should package your application in "production" mode, create a Beanstalk application (with a SQL database), upload your code on S3, and start the application.

### Updating your deployed application

When your application is already deployed, you can re-deploy it by run the sub-generator again:

`jhipster aws`

The sub generator ask your database credentials again but they will be ignored during the update.

### Deleting your application

- Delete the Elastic Beanstalk.
- Delete S3 buckets relevant to the application.
- Delete the [Amazon Relational Database Service (RDS)](https://aws.amazon.com/rds/) instance.
- Delete the EC2 security groups relevant to the application. You can find this by looking at the description of the 
security group which should say `Enable database access to Beanstalk application`.

### More information

*   [AWS SDK for JavaScript](http://aws.amazon.com/sdk-for-node-js)
*   [Progressbar for WAR upload](https://github.com/tj/node-progress)
