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
        var ourTimeZone = new Date().getTimezoneOffset() * 60000;
        var ourTime = new Date(r.start.utc).getTime();
        var eventDay = Math.floor((ourTime - ourTimeZone) / 86400000);
        var today = Math.floor((Date.now() - ourTimeZone) / 86400000);
        var daysFromNow = eventDay - today;
        var eventLength = (new Date(r.end.utc).getTime() - new Date(r.start.utc).getTime()) / 3600000;
        if (daysFromNow == 0) {
          daysFromNow = ' (today)';
        } else if (daysFromNow == 1) {
          daysFromNow = ' (tomorrow)';
        } else {
          daysFromNow = ' (' + daysFromNow + ' days from now)';
        }

        if (eventLength < 24) {eventLength += ' hours';}
        else if (eventLength < 168) {eventLength = Math.floor(eventLength / 24) + ' days';}
        else if (eventLength < 5040) {eventLength = Math.floor(eventLength / 168) + ' weeks';}
        else if (eventLength < 60480) {eventLength = Math.floor(eventLength / 5040) + ' months';}

        loadedEvents.push({
          capacity: r.capacity,
          category: r.category,
          description: r.description.text,
          duration: eventLength,
          end: new Date(r.end.utc),
          logo: r.logo,
          name: r.name.text,
          organizer: r.organizer.name,
          start: new Date(r.start.utc),
          subcategory: r.subcategory,
          time: r.start.local.substring(0,10) + daysFromNow,
          url: r.url,
          venue: r.venue
        });
      });

      console.log('loadedEvents: ', loadedEvents);
      next(loadedEvents);
    });
  }

  module.events = events;
})(window);
