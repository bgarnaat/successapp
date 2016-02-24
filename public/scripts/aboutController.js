(function(module) {
  var aboutController = {};

  localCache.fetch('about', About.loadAll);
  aboutView.initIndexPage('#about');

  aboutController.index = function() {
    console.log('jey');
    $('#about').fadeIn('slow');
  };

  module.aboutController = aboutController;
})(window);
