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
        destination += 'keyword/' + encodeURIComponent(keywords) + '/';
      }
      console.log('button navigating to', destination);
      page(destination);
    }
  });

  // search result controller
  searchController.index = function(ctx, next) {
    console.log('ctx: ', ctx);
    console.log('ctx.params: ', ctx.params);
    // load from context
    var location = ctx.params[2];
    var keyword = ctx.params[3];

    // IF WE DO A SEARCH
    if (location || keyword) {
      if (location) {
        location = decodeURIComponent(location);
        $('#search-location').val(location);
      }
      if (keyword) {
        keyword = decodeURIComponent(keyword);
        $('#search-keywords').val(keyword);
      }

      $('html,body').animate(
        { scrollTop: $('.lists-section').offset().top - $('.top-section').height()},
        'slow'
      );

      // $('.jobs').show();
      // $('#job-section').slideDown();

      // build model query
      var query = {
        query: keyword,
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
