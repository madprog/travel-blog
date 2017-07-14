const loki = require('lokijs');

const db = {
  loki: new loki(__dirname + '/database.json', {
    autoload: true,
    autoloadCallback() {
      db.sections = db.loki.addCollection('sections', { unique: ['id', 'name'], indices: ['id'] });
      db.articles = db.loki.addCollection('articles', { unique: ['id', 'name'], indices: ['id'] });
      db.pages = db.loki.addCollection('pages', { unique: ['id'], indices: ['id'] });
      db.templates = db.loki.addCollection('templates', { unique: ['id'], indices: ['id'] });

      initialize();

      db.loki.save();
    },
  }),
};

const initialize = () => {
  db.sections.insert([
    { id: "cargo-isa", name: "Cargo ISA" },
    { id: "usa-cote-est", name: "USA (côte est)" },
    { id: "montreal", name: "Montréal" }
  ]);
  db.articles.insert([
    { id: "bienvenue", section: "cargo-isa", name: "Bienvenue à bord!" },
    { id: "prologue", section: "cargo-isa", name: "Prologue" },
    { id: "owner-cabin", section: "cargo-isa", name: "The owner cabin" },
    { id: "cleveland", section: "usa-cote-est", name: "Cleveland" },
    { id: "erie", section: "usa-cote-est", name: "Érié" },
    { id: "niagara-falls", section: "usa-cote-est", name: "Niagara Falls" },
    { id: "airbnb", section: "montreal", name: "Airbnb d'arrivée" },
    { id: "couchsurfing", section: "montreal", name: "Couchsurfing rue d'Orléans" },
    { id: "h1w3c6", section: "montreal", name: "H1W3C6" }
  ]);
  db.pages.insert([
    { id: "bienvenue-1", article: "bienvenue", template: JSON.parse("{\"type\":\"template\",\"template\":\"2x2\"}"), contents: JSON.parse("[[\"Bienvenue à bord!\\nVous pouvez suivre [la position de notre cargo](https://www.marinetraffic.com/fr/ais/details/ships/shipid:146089/imo:9180358/mmsi:212773000/vessel:ISA) en temps réel!\",\"top right\"],[\"bottom left\",\"bottom right\"]]") },
    { id: "bienvenue-2", article: "bienvenue", template: JSON.parse("{\"type\":\"template\",\"template\":\"two-rows\"}"), contents: JSON.parse("[\"top\",\"left\"]") },
    { id: "bienvenue-3", article: "bienvenue", template: JSON.parse("{\"type\":\"template\",\"template\":\"2x2\"}"), contents: JSON.parse("[[\"top left\",\"top right\"],[\"bottom left\",\"bottom right\"]]") },
    { id: "prologue-1", article: "prologue", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Prologue, page 1\"" },
    { id: "prologue-2", article: "prologue", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Prologue, page 2\"" },
    { id: "prologue-3", article: "prologue", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Prologue, page 3\"" },
    { id: "owner-cabin-1", article: "owner-cabin", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Owner cabin, page 1\"" },
    { id: "owner-cabin-2", article: "owner-cabin", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Owner cabin, page 2\"" },
    { id: "owner-cabin-3", article: "owner-cabin", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Owner cabin, page 3\"" },
    { id: "cleveland-1", article: "cleveland", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Cleveland, page 1\"" },
    { id: "cleveland-2", article: "cleveland", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Cleveland, page 2\"" },
    { id: "cleveland-3", article: "cleveland", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Cleveland, page 3\"" },
    { id: "erie-1", article: "erie", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Érié, page 1\"" },
    { id: "erie-2", article: "erie", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Érié, page 2\"" },
    { id: "erie-3", article: "erie", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Érié, page 3\"" },
    { id: "niagara-falls-1", article: "niagara-falls", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Niagara Falls, page 1\"" },
    { id: "niagara-falls-2", article: "niagara-falls", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Niagara Falls, page 2\"" },
    { id: "niagara-falls-3", article: "niagara-falls", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Niagara Falls, page 3\"" },
    { id: "airbnb-1", article: "airbnb", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Airbnb d'arrivée, page 1\"" },
    { id: "airbnb-2", article: "airbnb", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Airbnb d'arrivée, page 2\"" },
    { id: "airbnb-3", article: "airbnb", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Airbnb d'arrivée, page 3\"" },
    { id: "couchsurfing-1", article: "couchsurfing", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Couchsurfing rue d'Orléans, page 1\"" },
    { id: "couchsurfing-2", article: "couchsurfing", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Couchsurfing rue d'Orléans, page 2\"" },
    { id: "couchsurfing-3", article: "couchsurfing", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"Couchsurfing rue d'Orléans, page 3\"" },
    { id: "h1w3c6-1", article: "h1w3c6", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"H1W3C6, page 1\"" },
    { id: "h1w3c6-2", article: "h1w3c6", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"H1W3C6, page 2\"" },
    { id: "h1w3c6-3", article: "h1w3c6", template: JSON.parse("{\"type\":\"cell\"}"), contents: "\"H1W3C6, page 3\"" }
  ]);
  db.templates.insert([
    { id: "two-columns", spec: JSON.parse("{\"type\":\"row\",\"items\":[{\"type\":\"cell\",\"grow\":1},{\"type\":\"cell\",\"grow\":1}]}") },
    { id: "two-rows", spec: JSON.parse("{\"type\":\"column\",\"items\":[{\"type\":\"cell\",\"grow\":1},{\"type\":\"cell\",\"grow\":1}]}") },
    { id: "2x2", spec: JSON.parse("{\"type\":\"column\",\"items\":[{\"type\":\"template\",\"template\":\"two-columns\",\"grow\":1},{\"type\":\"template\",\"template\":\"two-columns\",\"grow\":1}]}") }
  ]);
};
