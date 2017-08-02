from graphene import Field, Int, List, Mutation, ObjectType, Schema, String

from .objects import (
    # Article,
    # Page,
    # PageTemplate,
    Section,
)

from .mutations import (
    CreateArticle, DeleteArticle, DestroyArticle, UndeleteArticle,
    CreateSection, DeleteSection, DestroySection, UndeleteSection,
)

class Mutations(ObjectType):
    create_article = CreateArticle.Field()
    delete_article = DeleteArticle.Field()
    destroy_article = DestroyArticle.Field()
    undelete_article = UndeleteArticle.Field()

    create_section = CreateSection.Field()
    delete_section = DeleteSection.Field()
    destroy_section = DestroySection.Field()
    undelete_section = UndeleteSection.Field()

class Query(ObjectType):
    #article = Field(Article, id=String())
    book = List(Section)
    #page = Field(Page, id=String())
    section = Field(Section, strId=String())

    def resolve_book(self, args, context, info):
        return Section.get_query(context).all()

    def resolve_section(self, args, context, info):
        return Section.get_query(context).filter_by(str_id=args['strId']).one()

schema = Schema(query=Query, mutation=Mutations)
