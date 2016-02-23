(function(module) {
  var searchController = {};

  $('#button').click(function() {
    var destination = (
      '/location/' + $('#search-location').val() +
      '/search/' + $('#search-keywords').val() + '/'
    );
    console.log('button navigating to', destination);
    page(destination);
  });

  searchController.index = function(ctx, next) {
    // load from context
    var location = ctx.params[1];
    var search = ctx.params[3];
    var page = ctx.params[5];

    // $('.jobs').show();
    // $('#jobsection').slideDown();


    if (location && search) {
      // build model query
      var query = {
        query: search,
        location: location,
        page: page,
      };

      jobs.loadJobs(query, jobsView.drawJobs);
      // TODO: load/display events
      events.loadEvents(query, eventsView.drawEvents)
    }

    ctx.handled = true;
    next();
  };

  // exports
  module.searchController = searchController;
})(window);
