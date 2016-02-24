(function(module) {
  var jobsView = {};

  var jobTemplate = Handlebars.compile($('#job-template').text());

  jobsView.drawJobs = function(jobs, pageNumber, totalResults) {
    lastPageNumber = Math.ceil(totalResults / jobs.PAGE_SIZE);

    $jobSection = $('#job-section');
    $jobPages = $('#job-pages');
    // empty out pages and job listings
    $jobPages.empty().siblings().remove();

    // add job listings
    jobs.forEach(function(job) {
      $jobSection.append(jobTemplate(job));
    });

    // creates page link handlers
    jumpToPage = function(page) {
      return function() {
        jobs.loadJobs(null, page, jobsView.drawJobs);
      };
    };

    /*
    Add page numbers
      Page numbers always have the class "page-number", and also
      have the class "other-page-link" if they are clickable to link to
      another page.
    */
    for (
      var i = Math.max(1, pageNumber - 3);
      i <= Math.min(lastPageNumber, pageNumber + 3);
      i++
    ) {
      pageNumber = $('<span class="page-number">' + i + '</span>');
      if (i != pageNumber) {
        pageNumber.addClass('other-page-link');
        pageNumber.click(jumpToPage(i));
      }
      $jobPages.append(pageNumber);
    }
  };

  // exports
  module.jobsView = jobsView;
})(window);
