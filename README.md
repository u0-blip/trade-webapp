# Trading web management

A platform for managing new registration of users.
<img src="https://github.com/u0-blip/trade-webapp/raw/master/screenshots/dashboard.png"
     alt="UI"
     style="float: left; margin-right: 10px;" />

the hidden meaning to the steps of deploying gunicorn sites.

How does graphene work:
Query contain 2 parts:

1. fields
   field contain the model in the meta state and additional field that's required to provide identification and such.
2. resolver
   resolver returns the data for the query based on the argument parameters.

Mutation contains 2 parts:

1. class Argument:
   the input arguments for the model to mutate to.
2. mutater
   apply the mutation
   afterwards need to put all mutations into a single class and associate methods with them. it's call mounting instance of the mutation field. for example
   class Mutation(graphene.ObjectType):
   create_user = CreateUser.Field()

basic user case for the app:

1. user login. done
2. user add stock.
   a. search stock
   b. add it
3. app output the performance calculation

How does CircleCI works?
example file:
version: 2.1

orbs:
#define a testing environment.
python: circleci/python@0.2.1

#jobs to run for integration
jobs:
build-and-test:
executor: python/default
working_directory: ~/project/backend/
steps: - checkout:
path: ~/project - python/load-cache - python/install-deps - python/save-cache - run:
command: python ./manage.py test
name: Test

#define workflow to run
workflows:
main:
jobs: - build-and-test

steps involved in create CI/CD pipeline on AWS service.
AWS tools that's involved:

1. Codedeploy agent
2. EC2 instance
3. Deployment group: what does it do?

The pipeline has two stages:

A source stage named Source, which detects changes in the versioned sample application stored in the S3 bucket and pulls those changes into the pipeline.

A Deploy stage that deploys those changes to EC2 instances with CodeDeploy.
need to install the codedeploy agent on the ubuntu server.
