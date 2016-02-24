(function(module) {
  var aboutView = {};

  // APPENDS THE SECTION THAT IS RAN IN THE CONTROLLER
  aboutView.initIndexPage = function(section) {
    if (section == '#about') {
      About.all.forEach(function(a) {
        $(section).append(a.toHtml('#about-template'));
      });
    } else if (section == '#resource') {
      About.all.forEach(function(a) {
        $(section).append(a.toHtml('#resource-template'));
      });
    }
  };

  module.aboutView = aboutView;
})(window);
