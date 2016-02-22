(function(module) {
  var searchController = {};

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
  };

  // exports
  module.searchController = searchController;
})(window);
