// EVENTS
/*
  parameter shorthand corresponds to GET /events/search/ paramters.  Reference to https://www.eventbrite.com/developer/v3/endpoints/events/:
    q: query string
    vc: venue.city
    c: categories
    d: start_date.keyword


*/

(function(module) {
  var events = {};

  var PAGE_SIZE = 10;

  events.loadEvents = function(query, page, next) {

    $.ajax({
      url: 'https://www.eventbriteapi.com/v3/events/search/' +
            query ? '?' + query : '',
      type: 'GET',
      headers: {'Authorization': 'Bearer ' + key_eb},

      dataType: 'json',
      data: {
        q: query.query,
        l: query.location,
        start: PAGE_SIZE * (query.page - 1),
        limit: PAGE_SIZE,
        // sort: 'relevance',
        radius: query.radius || 25,
      },

      dataType: 'json',
      data: {
        q: query.query,
        l: query.location,
        start: PAGE_SIZE * (query.page -1),
        limit: PAGE_SIZE,
        // sort: 'relevance',
        // radius: query.radius || 25,
      },

      success: function(data, message, xhr) {
        console.log('xhr: ');
        console.log(xhr);
        console.log('data: ');
        console.log(data);
      }
    });

    next();
  }

  module.events = events;
})(window);
