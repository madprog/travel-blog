const loki = require('lokijs');

const db = {
  loki: new loki(__dirname + '/database.json', {
    autoload: true,
    autoloadCallback() {
      db.sections = db.getOrAddCollection('sections', { unique: ['id', 'name'], indices: ['id'] });
      db.articles = db.getOrAddCollection('articles', { unique: ['id', 'name'], indices: ['id'] });
      db.pages = db.getOrAddCollection('pages', { unique: ['id'], indices: ['id'] });
      db.templates = db.getOrAddCollection('templates', { unique: ['id'], indices: ['id'] });
    },
    autosave: true,
  }),
  getOrAddCollection(name, options) {
    return db.loki.getCollection(name) || db.loki.addCollection(name, options);
  },
};

module.exports.default = db;
