(function(module) {
  var searchController = {};

  // click handler for our search button
  $('#button').click(function() {
    var destination = '/';
    var location = $('#search-location').val();
    var keywords = $('#search-keywords').val();
    if (location || keywords) { // don't do anything if the boxes are empty
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

  // search result controller
  searchController.index = function(ctx, next) {
    // load from context
    var location = ctx.params[1];
    var search = ctx.params[3];

    // IF WE DO A SEARCH
    if (location || search) {
      if (location) {
        location = decodeURIComponent(location);
        $('#search-location').val(location);
      }
      if (search) {
        search = decodeURIComponent(search);
        $('#search-keywords').val(search);
      }

      $('html,body').animate(
        { scrollTop: $('.lists-section').offset().top},
        'slow'
      );

      // $('.jobs').show();
      // $('#job-section').slideDown();

      // build model query
      var query = {
        query: search,
        location: location,
      };

      jobs.loadJobs(query, 1, jobsView.drawJobs);
      events.loadEvents(query, eventsView.drawEvents);
    }

    ctx.handled = true;
    next();
  };

  // exports
  module.searchController = searchController;
})(window);
