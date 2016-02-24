// JOB LISTINGS
/* Indeed API: proxied through /indeed/* on our server
Parameters:
  q: query
    'all these words "this exact phrase" (atleast or one or ofthesewords) title:title company:company -notthisword $123,456+'
  l: location name
  sort: 'relevance' or 'date'
  radius: crow miles
  jt: 'fulltime', 'parttime', 'contract', 'internship', 'temporary'
  start: pagination offset
  limit: results per page
  fromage: do not return results more than this many days old
  highlight: '1' bolds searched keywords in results
  latlong: '1' returns map location for each result
*/

(function(module) {
  var jobs = {};

  jobs.PAGE_SIZE = 5;
  var currentQuery;

  /*
  Parameters:
    query can be null or some query info.
      If we are opening a new query, the query param should have:
        query: search string stuff
        location: location
        radius: radius in miles (optional)
    page is a positive integer
    next is the callback

  Returns job objects to the callback:
    title: title of the entry
    company: company name
    location: location
    time: relative time of the job posting
    description: short description of the job
    url: url to link to
  */
  jobs.loadJobs = function(query, page, callback) {
    if (query) { // this could be null if we are just paging around
      currentQuery = query; // update our query info
    }

    indeedQuery = $.ajax({
      type: 'GET',
      url: '/indeed/',
      dataType: 'json',
      data: {
        q: currentQuery.query,
        l: currentQuery.location,
        start: jobs.PAGE_SIZE * ((page || 1) - 1),
        limit: jobs.PAGE_SIZE,
        sort: 'relevance',
        radius: currentQuery.radius || 25,
      },
    });

    $.when(indeedQuery).done(function(data) {
      // here we have our data
      // ╰( ͡° ͜ʖ ͡° )つ──☆・ﾟ
      /*
      Fields in the returned data as a whole:
        results - actual data
        version - 2 for us
        start - 1-based ordinal of the first item in this result set
        radius - radius in miles that we passed
        totalResults - total number of results
        end - 1-based ordinal of the last item in this result set
        dupefilter - false for us
        location - location we passed
        query - query we passed
        pageNumber - page number (zero based ¯\_(ツ)_/¯ )
        highlight - probably false for us

      Fields we get back per object in data.results:
        company
        formattedLocation
        formattedRelativeTime
        jobtitle
        snippet
        source
        sponsored - true if the entry is sponsored
        url
      */
      // repeatedly push foreach into array so we can add more
      // api endpoints later
      loadedJobs = [];
      data.results.forEach(function(r) {
        loadedJobs.push({
          title: r.jobtitle,
          company: r.company,
          location: r.formattedLocation,
          time: r.formattedRelativeTime,
          description: r.snippet,
          url: r.url,
        });
      });

      callback(loadedJobs, data.pageNumber + 1, data.totalResults);
    })
  };

  // exports
  module.jobs = jobs;
})(window);
