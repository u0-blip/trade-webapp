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
