import re
from graphene import Field, Int, List, Mutation, ObjectType, Schema, String
from graphene_sqlalchemy import SQLAlchemyObjectType

from .models import (
    db,
    Article as ArticleModel,
    Page as PageModel,
    PageTemplate as PageTemplateModel,
    Section as SectionModel,
)

class Article(SQLAlchemyObjectType):
    class Meta:
        model = ArticleModel

class Page(SQLAlchemyObjectType):
    class Meta:
        model = PageModel

class PageTemplate(SQLAlchemyObjectType):
    class Meta:
        model = PageTemplateModel

class Section(SQLAlchemyObjectType):
    class Meta:
        model = SectionModel

class CreateSection(Mutation):
    class Input:
        name = String()

    section = Field(lambda: Section)

    @staticmethod
    def mutate(root, args, context, info):
        str_id = re.sub(r'[^A-Za-z0-9_ -]', '', args['name']).replace(' ', '-').lower()
        section = SectionModel(str_id=str_id, **args)
        db.session.add(section)
        db.session.commit()
        return CreateSection(section=section)

class DeleteSection(Mutation):
    class Input:
        id = Int()

    section = Field(lambda: Section)

    @staticmethod
    def mutate(root, args, context, info):
        id = int(args['id'])
        section = Section.get_query(context).get(id)
        section.deleted = True
        db.session.commit()
        return DeleteSection(section=section)

class DestroySection(Mutation):
    class Input:
        id = Int()

    section = Field(lambda: Section)

    @staticmethod
    def mutate(root, args, context, info):
        id = int(args['id'])
        section = Section.get_query(context).get(id)
        db.session.delete(section)
        db.session.commit()
        return DeleteSection(section=None)

class UndeleteSection(Mutation):
    class Input:
        id = Int()

    section = Field(lambda: Section)

    @staticmethod
    def mutate(root, args, context, info):
        id = int(args['id'])
        section = Section.get_query(context).get(id)
        section.deleted = False
        db.session.commit()
        return DeleteSection(section=section)

class Mutations(ObjectType):
    create_section = CreateSection.Field()
    delete_section = DeleteSection.Field()
    destroy_section = DestroySection.Field()
    undelete_section = UndeleteSection.Field()

class Query(ObjectType):
    #article = Field(Article, id=String())
    book = List(Section)
    #page = Field(Page, id=String())
    #section = Field(Section, id=String())

    def resolve_book(self, args, context, info):
        return Section.get_query(context)

schema = Schema(query=Query, mutation=Mutations)
