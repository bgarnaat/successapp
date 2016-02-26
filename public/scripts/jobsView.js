'use strict';
(function(module) {
  var jobsView = {};

  var jobTemplate = Handlebars.compile($('#job-template').text());

  jobsView.clear = function() {
    // show the spinner
    $('#job-loader').show();
    // empty out page numbers and job listings
    $('#job-pages').empty().siblings('.job-listing, .no-jobs').remove();
  };

  jobsView.drawJobs = function(jobsData, currentPage, totalResults) {
    $('#job-loader').hide();
    var lastPageNumber = Math.ceil(totalResults / jobs.PAGE_SIZE);

    var $jobSection = $('#job-section');
    var $jobPages = $('#job-pages');

    // empty out page numbers and job listings
    $jobPages.empty().siblings('.job-listing, .no-jobs').remove();

    if (jobsData.length > 0) {  // add job listings
      jobsData.forEach(function(job) {
        $jobSection.append(jobTemplate(job));
      });
    } else {
      // received no nobs!
      $jobSection.append($('<p class="no-jobs">No Jobs Found</p>'));
    }

    // utility function, creates page link handlers
    var jumpToPage = function(page) {
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
