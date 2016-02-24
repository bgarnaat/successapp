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

  var PAGE_SIZE = 5;

  events.loadEvents = function(query, next) {
    eventbriteQuery = $.ajax({
      type: 'GET',
      url: '/eventbrite/',
      dataType: 'json',
      data: {
        q: query.query,
        'location.address': query.location,
        'location.within': (query.radius || 25) + 'mi',
        // start: PAGE_SIZE * (query.page - 1),
        sort_by: 'date',
        expand: 'category,organizer,subcategory,venue',
      },
    });

    $.when(eventbriteQuery).done(function(data) {
      // TODO:  list returned data (some or all?)
      console.log('data.events: ', data.events);
      loadedEvents = [];
      // event.current = data.events[9];
      data.events.forEach(function(r) {
        // TODO:  use cat_id, subcat_id, venue_id to load associated data
        loadedEvents.push({
          name: r.name.text,
          category_id: r.category,
          subcategory_id: r.subcategory,
          organizer_id: r.organizer,
          time: new Date(r.start.local).toLocaleDateString(),
          description: r.description,
          url: r.url,
          venue_id: r.venue
        });
      });

      console.log('loadedEvents: ', loadedEvents);
      next(loadedEvents);
    });
  }

  module.events = events;
})(window);
