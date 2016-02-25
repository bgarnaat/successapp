(function(module) {
  var aboutController = {};

  // APPEND THE ABOUT PAGE AND TAKE 'about' && 'about-template' AS PARAMETERS
  infoView.initIndexPage('about', 'about-template');

  // RUNS THE '/about' ROUTE
  aboutController.index = function(ctx, next) {
    $('html,body').animate(
      { scrollTop: $('.about').offset().top},
      'slow'
    );
    ctx.handled = true;
    next();
  };

  module.aboutController = aboutController;
})(window);
