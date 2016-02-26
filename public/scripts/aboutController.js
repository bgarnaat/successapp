'use strict';
(function(module) {
  var aboutController = {};

  // APPEND THE ABOUT PAGE AND TAKE 'about' && 'about-template' AS PARAMETERS
  infoView.initIndexPage('about', 'about-template');

  // RUNS THE '/about' ROUTE
  aboutController.index = function(ctx, next) {

    var topHeight = $('.top-section').height();

    topHeight = topHeight > 92 ? 92 : topHeight;
    console.log(topHeight);

    $('html,body').animate(
      { scrollTop: $('.about-container').offset().top - topHeight},
      'slow'
    );
    ctx.handled = true;
    next();
  };

  module.aboutController = aboutController;
})(window);
