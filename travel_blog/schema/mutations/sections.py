from graphene import Field, Int, Mutation, String

from ..objects import Section
from ...models import (
    db,
    Section as SectionModel,
)
from ...tools import normalize_id

class CreateSection(Mutation):
    class Input:
        name = String()

    section = Field(lambda: Section)

    @staticmethod
    def mutate(root, args, context, info):
        str_id=normalize_id(args['name']),
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
        section = Section.get_query(context).get_or_404(id)
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
        section = Section.get_query(context).get_or_404(id)
        db.session.delete(section)
        db.session.commit()
        return DestroySection(section=None)

class UndeleteSection(Mutation):
    class Input:
        id = Int()

    section = Field(lambda: Section)

    @staticmethod
    def mutate(root, args, context, info):
        id = int(args['id'])
        section = Section.get_query(context).get_or_404(id)
        section.deleted = False
        db.session.commit()
        return UndeleteSection(section=section)
