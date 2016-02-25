(function(module) {
  var aboutView = {};

  // Updates and displays the about section
  aboutView.initIndexPage = function() {
    localCache.fetch('about', function(data) {
      About.loadAll(data);
      var $aboutSection = $('#about').empty();
      About.all.forEach(function(a) {
        $aboutSection.append(a.toHtml('#about-template'));
      });
    });
  };

  module.aboutView = aboutView;
})(window);
