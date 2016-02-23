(function(module) {
  var searchController = {};

  $('button').click(function() {
    page(
      '/location/' + $('searchlocation').val() +
      '/search/' + $('seachkeyword').val()
    );
  });

  searchController.index = function(ctx, next) {
    // load from context
    location = ctx.params[1];
    search = ctx.params[3];
    page = ctx.params[5];

    // build model query
    var query = {
      query: search,
      location: location,
      page: page,
    };

    jobs.loadJobs(query, jobsView.drawJobs);
    events.loadEvents(query , eventsView.drawEvents)
    // TODO: load/display events

  };
  // exports
  module.searchController = searchController;
})(window);
