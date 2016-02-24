(function(module) {
  var aboutController = {};

  localCache.fetch('about', function(data) {
    About.loadAll(data);
    aboutView.initIndexPage('#about');
  );
  // aboutView.initIndexPage('#about');

  aboutController.index = function() {
    console.log('jey');
    $('#about').fadeIn('slow');
  };

  module.aboutController = aboutController;
})(window);
