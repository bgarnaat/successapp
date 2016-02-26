'use strict';
(function(module) {
  var aboutController = {};

  // APPEND THE ABOUT PAGE AND TAKE 'about' && 'about-template' AS PARAMETERS
  infoView.initIndexPage('about', 'about-template');

  // RUNS THE '/about' ROUTE
  aboutController.index = function(ctx, next) {
    // get height of header to offset page view by this amount.
    var headerHeight = $('.top-section').height();

    // if header height is greater than 92 (height of collapsed mobile menu) use 92, if less use headerHeight.
    headerHeight = headerHeight > 92 ? 92 : headerHeight;

    $('html,body').animate(
      // set scroll position to container position offset for header height.
      { scrollTop: $('.about').offset().top - headerHeight},
      'slow'
    );
    ctx.handled = true;
    next();
  };

  module.aboutController = aboutController;
})(window);
