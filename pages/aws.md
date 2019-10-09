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

There are two different sub-generators for deploying JHipster projects to AWS:
* **aws-containers**: A Docker container based sub-generator for deploying applications via AWS Elastic Container Service. This is great for complex applications and/or microservice architectures.
* **aws**: An instance based sub-generator for deploying applications via Elastic Beanstalk. This is great (and very cheap!) for simple applications.

## *aws-containers* sub-generator
When using the monolith flow, this sub-generator will automatically deploy your docker-based JHipster application, using AWS Fargate running on Elastic Container Service. It leverages a number of AWS services to achieve this:
- [AWS Fargate](https://aws.amazon.com/fargate/): A new AWS service which allows containers to be run without needing to worry about the underlying VM instance infrastructure. The sub-generator currently uses Elastic Container Service to manage the containers.
- [Elastic Container Registry](https://aws.amazon.com/ecr/): A Docker Image repository, where the application images are stored.
- [Elastic Load Balanacer - Network Load Balancer](https://aws.amazon.com/elasticloadbalancing): The Network Load balanacer is used to direct traffic to containers.
- [Aurora](https://aws.amazon.com/rds/aurora): A AWS managed database service, which is MySQL and PostgreSQL compatible.
- [AWS S3](https://aws.amazon.com/s3): File storage used to store CloudFormation scripts.
- [CloudWatch](https://aws.amazon.com/cloudwatch): Distributed log collection tool used to view the status of containers.
- [AWS Cloudformation](https://aws.amazon.com/cloudformation):  All required services (besides AWS System Manager Parameters) are defined in a set of CloudFormation files. The base file contains high level services, and then each application is defined in its own file, which is called a nested stack.
- [AWS System Manager - Parameter Store](https://aws.amazon.com/systems-manager/features/): A Secure password storage mechanism, which is used to store the database password. Running the sub-generator will introduce a new Spring Cloud component which will read in the password on application startup.
- [AWS - IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html): The generator creates a new role which the ECS tasks will execute under, with an associated policy.

When using the microservice flow, this will guide you through the creation of an [Elastic Kubernetes Cluster (EKS)](https://aws.amazon.com/eks/) 
and [Elastic Container Registries (ECR)](https://aws.amazon.com/ecr/) for all your microservices and gateway. Afterwards you have to use the [Kubernetes Subgenerator](/kubernetes) to generate the Kubernetes configuration files and 
push them via docker to ECR. A sample deployment can be found at https://github.com/jhipster/generator-jhipster/issues/8366#issuecomment-535329759

![AWS Component Diagram]({{ site.url }}/images/aws_component_diagram.svg?sanitize=true)

If you choose to deploy the application, the sub-generator will go through a number of steps before the application starts.
1. Rebuilds the application's Docker Imager, so it includes the newly generated Spring Cloud classes.
2. Creates an S3 bucket for the CloudFormation YAML files.
3. Uploads the Cloudformation YAML files to the S3 bucket.
4. Creates the CloudFormation stack (excluding the ECS Service). The service is initially excluded so we have the opportunity to upload the required Docker Images into the newly created registry so the service will start successfully when its created.
5. Tag Docker Images and Upload to Registry.
6. Set Database access password in AWS SSM. This has been excluded from the Cloudformation file because it currently does not support SecureStrings, and it is bad-practice to store passwords within Cloudformation.
7. Update Stack to include ECS Service. Prints out Load Balancer URL.

### Limitations
- Only the following database types are supported (all via Aurora): Mysql, MariaDB and PostgreSQL.
- Fargate is, at time of writing, only available in the `us-west-2` region. Check [this list](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/) before attempting to run the sub-generator against a different region.
- Instance to instance communication is currently not supported. The biggest consequence of this is that cache synchronisation is not supported between nodes. It is recommended to look at AWS' [ElasticCache](https://aws.amazon.com/elasticache/) service for distributed caching requirements.
- SSL is not enabled.

### Costs
<div class="alert alert-warning"><i>Warning: </i>
This generator will start incurring costs as soon as the deployment starts. Do not leave it running for extended lengths without understanding the costing implications of the components used. </div>
The services used by this generator are not covered by the [AWS Free Tier](https://aws.amazon.com/free/). This generator is designed to allow applications to be run in a production-grade manner, and at this time is not recommended for small or cost sensitive workloads.

### Running the sub-generator

Before running the sub-generator, you need to setup your [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html) so they are accessible. Although you do not need the Amazon CLI installed for this generator to work, it's recommended for subsequent development purposes. Log in with your Amazon AWS account and create a user for your JHipster application.  After that create a credentials file at `~/.aws/credentials` on Mac/Linux or C:\Users\USERNAME\.aws\credentials` on Windows. An alternative to the credentials files is to use [environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html) to set your Access Key ID + Secret.

Within a **new folder** run:

`jhipster aws-containers`

The sub-generator will ask a number of questions regarding how you would like your application deployed, using information it will determine from your AWS environment. There are a couple of things to consider:
- A monolith application can be deployed in either a single tier (using a default VPC configuration), or a two-tier model (example CloudFormation file [here](https://github.com/satterly/AWSCloudFormation-samples/blob/master/multi-tier-web-app-in-vpc.template)). When determining your deployment subnets, you should ensure that the application is being deployed across at least two Availability Zones, otherwise Amazon Aurora will not deploy correctly.
- If you need to remove the generated CloudFormation stack, you must remove all created ECR images before attempting to delete the stack. CloudFormation cannot delete the registry if it is still holding images.

### Updating your deployed application

When your application is already deployed, you can re-deploy it by run the sub-generator again:

`jhipster aws-containers`

You will be re-prompted to confirm your settings, giving you the oppoortunity to re-adjust things like the performance level. Note, in some circumstances the application will have issues terminating the previously deployed task instances, which may require them to be manually terminated via the console or CLI.

### Deleting your application
To delete your deployed application:
* Navigate to `Elastic Container Service > Repositories > [Your application names]` and delete all images within the repository. Do not delete the repository itself. You cannot delete the application via CloudFormation if there are images within the repository.
* Navigate to `CloudFormation` and delete the stack which you have created. This will deprovision the majority of services.

For a complete cleanup of your environment, there are two additional configurations which need to be deleted.
* Remove the stored password via `AWS Systems Manager > Parameter Store`.
* Remove the CloudFormation template files from the generated `S3` bucket, which is in the format `[Stack Name]-[timestamp]`.

## *aws* sub-generator
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

If you use a named profile different than `default`, you just have to set the environment variable `AWS_PROFILE` with the correct profile.

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
- Delete the EC2 security groups relevant to the application. You can easily find this by looking at the description of the 
security group which should say `Enable database access to Beanstalk application`.

### More information

*   [AWS SDK for JavaScript](http://aws.amazon.com/sdk-for-node-js)
*   [Progressbar for WAR upload](https://github.com/tj/node-progress)
