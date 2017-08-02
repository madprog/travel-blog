import re
from graphene import Field, Int, Mutation, String

from ..objects import Article
from ...models import (
    db,
    Article as ArticleModel,
)

class CreateArticle(Mutation):
    class Input:
        section_id = Int()
        name = String()

    article = Field(lambda: Article)

    @staticmethod
    def mutate(root, args, context, info):
        str_id = re.sub(r'[^A-Za-z0-9_ -]', '', args['name']).replace(' ', '-').lower()
        article = ArticleModel(
            str_id=str_id,
            **args
        )
        db.session.add(article)
        db.session.commit()
        return CreateArticle(article=None)

class DeleteArticle(Mutation):
    class Input:
        id = Int()

    article = Field(lambda: Article)

    @staticmethod
    def mutate(root, args, context, info):
        id = int(args['id'])
        article = Article.get_query(context).get_or_404(id)
        article.deleted = True
        db.session.commit()
        return DeleteArticle(article=article)

class DestroyArticle(Mutation):
    class Input:
        id = Int()

    article = Field(lambda: Article)

    @staticmethod
    def mutate(root, args, context, info):
        id = int(args['id'])
        article = Article.get_query(context).get_or_404(id)
        db.session.delete(article)
        db.session.commit()
        return DestroyArticle(article=None)

class UndeleteArticle(Mutation):
    class Input:
        id = Int()

    article = Field(lambda: Article)

    @staticmethod
    def mutate(root, args, context, info):
        id = int(args['id'])
        article = Article.get_query(context).get_or_404(id)
        article.deleted = False
        db.session.commit()
        return UndeleteArticle(article=article)
