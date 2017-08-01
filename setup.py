from setuptools import setup

setup(
    name='travel-blog',
    version='2.0',
    description='Travel blog',
    url='',
    author='Paul Morelle',
    author_email='madprog@htkc.org',
    license='MIT',
    install_requires=[
        'Flask',
        'Flask-GraphQL',
        'Flask-SQLAlchemy',
        'graphene_sqlalchemy',
    ],
    packages=['travel_blog'],
)
