'use strict';
(function(module) {
  var resourceController = {};

  // RUNS THE '/resource' ROUTE
  resourceController.index = function(ctx, next) {
    // get height of header to offset page view by this amount.
    var headerHeight = $('.top-section').height();

    // if header height is greater than 92 (height of collapsed mobile menu) use 92, if less use headerHeight.
    headerHeight = headerHeight > 92 ? 92 : headerHeight;

    $('html,body').animate(
      // set scroll position to container position offset for header height.
      { scrollTop: $('.resources-section').offset().top - headerHeight},
      'slow'
    );
    ctx.handled = true;
    next();
  };

  module.resourceController = resourceController;
})(window);
