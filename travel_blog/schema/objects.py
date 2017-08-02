from graphene_sqlalchemy import SQLAlchemyObjectType

from ..models import (
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
