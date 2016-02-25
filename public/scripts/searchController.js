(function(module) {
  var searchController = {};

  // click handler for our search button
  $('#button').click(function() {
    var destination = '/search/';
    var location = $('#search-location').val();
    var keywords = $('#search-keywords').val();
    if (location || keywords) { // don't do anything if the boxes are empty
      if (location) {
        destination += 'location/' + encodeURIComponent(location) + '/';
      }
      if (keywords) {
        destination += 'keywords/' + encodeURIComponent(keywords) + '/';
      }
      console.log('button navigating to', destination);
      page(destination);
    }
  });

  searchController.index = function(ctx, next) {
    $('html,body').animate(
      { scrollTop: $('.landing-page').offset().top},
      'slow'
    );

    ctx.handled = true;
    next();
  }

  // search result controller
  searchController.results = function(ctx, next) {
    // load from context
    var location = ctx.params[2];
    var keywords = ctx.params[4];

    // IF WE DO A SEARCH
    if (location || keywords) {
      if (location) {
        location = decodeURIComponent(location);
        $('#search-location').val(location);
      }
      if (keywords) {
        keywords = decodeURIComponent(keywords);
        $('#search-keywords').val(keywords);
      }

      $('html,body').animate(
        { scrollTop: $('.lists-section').offset().top - $('.top-section').height()},
        'slow'
      );

      // $('.jobs').show();
      // $('#job-section').slideDown();

      // build model query
      var query = {
        query: keywords,
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
