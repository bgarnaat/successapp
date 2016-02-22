var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

// Indeed API proxying
var proxyIndeed = function(request, response) {
  console.log('Routing Indeed request for', request.params[0]);
  (requestProxy({
    url: 'http://api.indeed.com/ads/apisearch',
    query: {
      v: '2',
      publisher: process.env.INDEED_PUBLISHER,
      format: 'json',
      userip: req.ip,
      useragent: req.get('User-Agent'),
    }
  }))(request, response);
};
app.get('/indeed/*', proxyIndeed);

// static files
app.use(express.static('./public/'));

// fallback: send index
app.get('*', function(request, response) {
  console.log('New request:', request.url);
  if (request.url === '/favicon.ico') {
    console.log('sending 404');
    response.sendStatus(404);
  } else {
    console.log('sending index');
    response.sendFile('./public/index.html', { root: '.' });
  }
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
