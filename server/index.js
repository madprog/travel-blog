const app = require('./app').default;

require('./sections');
require('./templates');

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../www' });
});

const server = app.listen(5000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
