(function(module) {
  var jobsView = {};

  var jobTemplate = Handlebars.compile($('#job-template').text());

  jobsView.drawJobs = function(jobs) {
    $jobsection = $('#jobsection');
    $jobsection.empty();
    jobs.forEach(function(job) {
      $jobsection.append(jobTemplate(job));
    });
  };

  // exports
  module.jobsView = jobsView;
})(window);
