'use strict';
(function(module) {
  var infoView = {};
  /*
  Dynamically updates and displays the about/resources/connect sections
  section = appended section | template = handlebar template of respective section
  */
  infoView.initIndexPage = function(section , handleTemp) {
    localCache.fetch('about', function(data) {
      Info.loadAll(data);
      var $section = $('#' + section).empty();
      Info.all.forEach(function(a) {
        $section.append(a.toHtml('#' + handleTemp));
      });
    });
  };

  module.infoView = infoView;
})(window);
