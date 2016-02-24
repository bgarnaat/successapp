(function(module) {
  var aboutController = {};

  localCache.fetch('about', About.loadAll);
  aboutView.initIndexPage('#about');

  aboutController.index = function() {
    console.log('hey');
    $('#about').fadeIn('slow');
  };

  module.aboutController = aboutController;
})(window);
