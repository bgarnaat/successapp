var requestProxy = require('express-request-proxy');
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

// Indeed API proxying
var proxyIndeed = function(request, response) {
  console.log('Routing Indeed request for', request.originalUrl);
  (requestProxy({
    url: 'http://api.indeed.com/ads/apisearch',
    query: {
      v: '2',
      publisher: process.env.INDEED_PUBLISHER,
      format: 'json',
      userip: request.ip,
      useragent: request.get('User-Agent'),
    }
  }))(request, response, function(err) {
    console.log('err proxying indeed:', err);
  });
};

app.get('/indeed/*', proxyIndeed);

// eventbrite API proxying
var proxyEvent = function(request, response) {
  console.log('Routing Eventbrite request for', request.originalUrl);
  (requestProxy({
    url: 'https://www.eventbriteapi.com/v3/events/search/',
    headers: {'Authorization': 'Bearer ' + process.env.KEY_EVENTBRITE}
  }))(request, response, function(err) {
    console.log('err proxying eventbrite:', err);
  });
};

app.get('/eventbrite/*', proxyEvent);

// static files
app.use(express.static('./public/'));

// fallback: send index
app.get('*', function(request, response) {
  console.log('New request:', request.url);
  console.log('sending index');
  response.sendFile('./public/index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
