import graphene
from django.contrib.auth import get_user_model
from graphql import GraphQLError
from graphene_django import DjangoObjectType
import uuid

from peterMusically.models import Stock
from peterMusically.models import Portfolio
import json


class StockType(DjangoObjectType):
    class Meta:
        model = Stock


class StockQuery(graphene.ObjectType):
    stock = graphene.Field(StockType, id=graphene.Int(required=True))

    def resolve_stock(self, info, id):
        return Stock.objects.get(id=id)


class PortType(DjangoObjectType):
    class Meta:
        model = Portfolio


class PortQuery(graphene.ObjectType):
    portfolio = graphene.Field(PortType, id=graphene.Int(required=True))

    def resolve_portfolio(self, info, id):
        return Portfolio.objects.get(id=id)


class CreatePort(graphene.Mutation):
    newPortfolio = graphene.Field(PortType)

    class Arguments:
        stocks = graphene.String(required=False)

    def mutate(self, info, stocks=None):
        if stocks != None:
            stocks = json.loads(stocks)
        user = info.context.user
        # this line decodes the token and returns the user informaiton
        if user.is_anonymous:
            raise GraphQLError('unauthorized')
        user_in_db = get_user_model().objects.get(id=user.id)
        port = Portfolio(
            id=uuid.uuid4(), userId=user_in_db) if stocks == None else Portfolio(
            id=uuid.uuid4(), userId=user_in_db, holdings=stocks)
        port.save()
        return CreatePort(newPortfolio=port)


class AddToPort(graphene.Mutation):
    portfolio = graphene.Field(PortType, id=graphene.Int(required=True))

    class Arguments:
        stocks = graphene.String(required=True)
        portId = graphene.Int(required=True)

    def mutate(self, info, stocks, portId):
        user = info.context.user
        # this line decodes the token and returns the user informaiton
        if user.is_anonymous:
            raise GraphQLError('unauthorized')
        if stocks != None:
            stocks = json.loads(stocks)

        port = Portfolio.objects.get(userId=user.id, id=portId)

        stocks = json.loads(stocks)

        if len(port) < 1:
            return GraphQLError('no portfolio associated with this user')
        port.holdings.add(stocks)
        port.save()
        return AddToPort(portfolio=port)


class Mutation(graphene.ObjectType):
    create_port = CreatePort.Field()
    add_to_port = AddToPort.Field()
