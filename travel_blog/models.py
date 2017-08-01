from sqlalchemy import *
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base

from . import db

class Section(db.Model):
    __tablename__ = 'section'
    id = Column(Integer, primary_key=True)
    str_id = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False, unique=True)
    deleted = Column(Boolean, nullable=False, default=False)

class Article(db.Model):
    __tablename__ = 'article'
    id = Column(Integer, primary_key=True)
    str_id = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False, unique=True)
    deleted = Column(Boolean, nullable=False, default=False)
    section_id = Column(Integer, ForeignKey('section.id'))
    section = relationship(Section, backref=backref('articles', uselist=True, cascade='delete,all'))

class PageTemplate(db.Model):
    __tablename__ = 'page_template'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    items = Column(String, nullable=False)
    deleted = Column(Boolean, nullable=False, default=False)

class Page(db.Model):
    __tablename__ = 'page'
    id = Column(Integer, primary_key=True)
    str_id = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False, unique=True)
    contents = Column(String, nullable=False)
    deleted = Column(Boolean, nullable=False, default=False)
    article_id = Column(Integer, ForeignKey('article.id'))
    article = relationship(Article, backref=backref('pages', uselist=True, cascade='delete,all'))
    template_id = Column(Integer, ForeignKey('page_template.id'))
    template = relationship(PageTemplate, backref=backref('pages', uselist=True, cascade='delete,all'))
