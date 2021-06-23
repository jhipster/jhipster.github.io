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

This sub-generator allows you to automatically deploy your JHipster application to the [Amazon AWS cloud](https://aws.amazon.com/) using [AWS Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html) to provision the infrastructure.

<div class="alert alert-info"> <i>Tip:</i> As an alternative to Elastic Beanstalk you can also deploy your JHipster application to AWS using <a href="{{ site.url }}/boxfuse/">Boxfuse</a>.  
Boxfuse comes with first-class support for JHipster as well as support for both MySQL and PostgreSQL databases.</div>

### Limitations

*   You can only use it with a SQL database (but note that Oracle and Microsoft SQL Server aren't supported).
*   Websockets don't work behind the load balancer by default.

### Prerequisites

Before running the sub-generator, create AWS SDK credentials so that JHipster can deploy to Elastic Beanstalk. 

Log into your Amazon AWS account and create an IAM user with programmatic access. 

Attach the following policies to grant the user the necessary permissions:
- `AdministratorAccess-AWSElasticBeanstalk` (formerly `AWSElasticBeanstalkFullAccess`, now deprecated)
- `AmazonRDSFullAccess` and
- `IAMFullAccess`.

Create the user and download the `csv` file with the new credentials. Use them to create a credentials file called `~/.aws/credentials` on Mac/Linux or `C:\Users\USERNAME\.aws\credentials` on Windows, as follows:
```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```
If you already have a `default` profile, create a new named profile and set the environment variable `AWS_PROFILE` to the new profile name (see [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) for details).

Test your access by executing `aws sts get-caller-identity`.

### Deploying your application

To deploy your application to Amazon AWS, type:

`jhipster aws`

You will be prompted for:
- Application name: 
- Environment name: 
- Name of S3 bucket: 
- Database name: 
- Database username: 
- Database password: [hidden]
- On which EC2 instance type do you want to deploy? 
- On which RDS instance class do you want to deploy? 
- On which region do you want to deploy? 

This should package your application in "production" mode, create a Beanstalk application (with a SQL database), upload your code on S3, and start the application.

### Updating your deployed application

You can update a deployed application by running the sub-generator again with `jhipster aws`.

Note that you will be prompted for your database credentials again but they will be ignored during the update.

### Deleting your application

- Delete the Elastic Beanstalk.
- Delete S3 buckets relevant to the application.
- Delete the [Amazon Relational Database Service (RDS)](https://aws.amazon.com/rds/) instance.
- Delete the EC2 security groups relevant to the application. You can find this by looking at the description of the 
security group which should say `Enable database access to Beanstalk application`.

### More information

*   [AWS SDK for JavaScript](http://aws.amazon.com/sdk-for-node-js)
*   [Progressbar for WAR upload](https://github.com/tj/node-progress)
