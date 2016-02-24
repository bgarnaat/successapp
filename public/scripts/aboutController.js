(function(module) {
  var aboutController = {};

  About.fetchAll(localStorage.rawAbout, 'rawAbout', 'about.json');
  aboutView.initIndexPage('#about');

  aboutController.index = function() {
    console.log('hey');
    $('#about').fadeIn('slow');
  };

  module.aboutController = aboutController;
})(window);
