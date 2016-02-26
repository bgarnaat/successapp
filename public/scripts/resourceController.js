'use strict';
(function(module) {
  var resourceController = {};

  // RUNS THE '/about' ROUTE
  resourceController.index = function(ctx, next) {
    $('html,body').animate(
      { scrollTop: $('.resources-section').offset().top},
      'slow'
    );
    ctx.handled = true;
    next();
  };

  module.resourceController = resourceController;
})(window);
