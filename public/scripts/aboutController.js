(function(module) {
  var aboutController = {};

  localCache.fetch('about', About.loadAll);
  aboutView.initIndexPage('#about');

  aboutController.index = function() {
    console.log('hey');
    $('.about').show();
  };

  module.aboutController = aboutController;
})(window);
