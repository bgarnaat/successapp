// EVENTS
/*
Eventbrite API: proxied through /eventbrite/* on server
parameters list: https://www.eventbrite.com/developer/v3/endpoints/events/
parameters:
  q: query string
  location.address: location address, city, state, zip, country
  start: start date & time
  limit: number results per page
  sort_by: sort by id, date, name, city, distance, or best.  prefix with hyphenb for inverse sort
  location.within: distance around a given location to search.  Should be followed by 'mi' or 'km'
*/

(function(module) {
  var events = {};

  var PAGE_SIZE = 10;

  events.loadEvents = function(query, page, next) {
    eventbrite_query = $.ajax({
      type: 'GET',
      url: '/eventbrite/',
      dataType: 'json',
      data: {
        q: query.query,
        location.address: query.location,
        start: PAGE_SIZE * (query.page - 1),
        limit: PAGE_SIZE,
        sort_by: 'date',
        location.within: (query.radius || 25) + 'mi',
      },
    });

    location: {
      address: query.location,
      within: (query.radius || 25) + 'mi'
    }

    $.when(eventbrite_query).done(function(data) {
      // TODO:  list returned data (some or all?)

      loadedEvents = [];
      data.events.forEach(function(r) {
        // TODO:  use cat_id, subcat_id, venue_id to load associated data
        loadedEvents.push({
          name: r.name.text,
          category_id: r.category_id,
          subcategory_id: r.subcategory_id,
          organizer_id: r.organizer_id,
          time: r.start.local,
          description: r.description,
          url: r.url;
        });
      });

      next(loadedEvents);
    });
  }

  module.events = events;
})(window);
