(function(module) {
  var jobsView = {};

  var jobTemplate = Handlebars.compile($('#job-template').text());

  jobsView.drawJobs = function(jobsData, currentPage, totalResults) {
    var lastPageNumber = Math.ceil(totalResults / jobs.PAGE_SIZE);

    var $jobSection = $('#job-section');
    var $jobPages = $('#job-pages');
    // empty out pages and job listings
    $jobPages.empty().siblings().remove();

    // add job listings
    jobsData.forEach(function(job) {
      $jobSection.append(jobTemplate(job));
    });

    // utility function, creates page link handlers
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
      var i = Math.max(1, currentPage - 3);
      i <= Math.min(lastPageNumber, currentPage + 3);
      i++
    ) {
      var $pageNumberElement = $('<span class="page-number">' + i + '</span>');
      if (i != currentPage) {
        $pageNumberElement.addClass('other-page-link');
        $pageNumberElement.click(jumpToPage(i));
      }
      $jobPages.append($pageNumberElement);
    }
  };

  // exports
  module.jobsView = jobsView;
})(window);
