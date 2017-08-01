from flask import Flask, send_from_directory
from flask_graphql import GraphQLView
from flask_sqlalchemy import SQLAlchemy
from werkzeug.serving import run_simple

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite3'
db = SQLAlchemy(app)

from travel_blog.schema import schema, Section

STATIC_FILES = {
    '/': lambda: send_from_directory('../www', 'index.html'),
    '/index.css': lambda: send_from_directory('../www', 'index.css'),
    '/bundle.js': lambda: send_from_directory('../www', 'bundle.js'),
    '/bundle.js.map': lambda: send_from_directory('../www', 'bundle.js.map'),
}
for route, callback in STATIC_FILES.items():
    app.add_url_rule(route, route, callback)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

def main():
    db.create_all()
    db.session.commit()

    run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True)
