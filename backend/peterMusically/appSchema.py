import graphene
import graphql_jwt


import user.schema as userSchema
import peterMusically.schema as md


class Query(userSchema.Query, md.StockQuery, md.PortQuery):
    pass


class Mutation(userSchema.Mutation, md.Mutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
