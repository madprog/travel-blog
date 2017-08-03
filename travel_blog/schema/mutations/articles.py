from graphene import Field, Int, Mutation, String

from ..objects import Article
from ...models import (
    db,
    Article as ArticleModel,
)
from ...tools import normalize_id

class CreateArticle(Mutation):
    class Input:
        section_id = Int()
        name = String()

    article = Field(lambda: Article)

    @staticmethod
    def mutate(root, args, context, info):
        article = ArticleModel(
            str_id=normalize_id(args['name']),
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
