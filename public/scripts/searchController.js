'use strict';
(function(module) {
  var searchController = {};

  // CLICK HANDLER FOR SEARCH BUTTON
  $('#button').click(function() {
    var destination = '/';
    var location = $('#search-location').val();
    var keywords = $('#search-keywords').val();
    if (location || keywords) { // don't do anything if the boxes are both empty
      if (location) {
        destination += 'location/' + encodeURIComponent(location) + '/';
      }
      if (keywords) {
        destination += 'search/' + encodeURIComponent(keywords) + '/';
      }
      console.log('button navigating to', destination);
      page(destination);
    }
  });

  // SEARCH INDEX CONTROLLER
  searchController.index = function(ctx, next) {
    // load search parameters from regex capturing groups
    // sadly javascript's regex does not support named capturing groups
    var location = ctx.params[1];
    var keywords = ctx.params[3];

    if (location || keywords) {
      // we are performing a search
      searchController.performSearch(location, keywords);
    } else {
      // we are just on /, show the search boxes
      searchController.searchHome();
    }

    ctx.handled = true;
    next();
  };

  // Shows the search origin
  searchController.searchHome = function() {
    // scroll to the top of the page
    $('html,body').animate(
      { scrollTop: $('.landing-page').offset().top },
      'slow'
    );
  };

  // Executes a search on the page
  searchController.performSearch = function(location, keywords) {
    // decode parameters of our search
    if (location) {
      location = decodeURIComponent(location);
      $('#search-location').val(location);
    }
    if (keywords) {
      keywords = decodeURIComponent(keywords);
      $('#search-keywords').val(keywords);
    }

    // show the result boxes
    $('.lists-section').show();

    // SCROLL DOWN ANIMATION
    $('html,body').animate(
      { scrollTop: $('.lists-section').offset().top - $('.top-section').height()},
      'slow'
    );

    // BUILD MODEL QUERY
    var query = {
      query: keywords,
      location: location,
    };

    // fetch and display data from APIs
    jobs.loadJobs(query, 1, jobsView.drawJobs);
    events.loadEvents(query, eventsView.drawEvents);
    meetup.loadMeetup(query, 1);
  };

  // exports
  module.searchController = searchController;
})(window);
