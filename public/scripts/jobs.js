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

  var PAGE_SIZE = 5;

  /* query should have:
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
  jobs.loadJobs = function(query, next) {
    indeedQuery = $.ajax({
      type: 'GET',
      url: '/indeed/',
      dataType: 'json',
      data: {
        q: query.query,
        l: query.location,
        start: PAGE_SIZE * ((query.page || 1) - 1),
        limit: PAGE_SIZE,
        sort: 'relevance',
        radius: query.radius || 25,
      },
    });

    $.when(indeedQuery).done(function(data) {
      // here we have our data
      // ╰( ͡° ͜ʖ ͡° )つ──☆・ﾟ
      /* Fields we get back per object in data.results:
        company
        formattedLocation
        formattedRelativeTime
        jobtitle
        snippet
        source
        sponsored - true if the entry is sponsored
        url
      */
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

      next(loadedJobs);
    })
  };

  // exports
  module.jobs = jobs;
})(window);
