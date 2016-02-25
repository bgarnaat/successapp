(function(module) {
  var aboutController = {};

  aboutView.initIndexPage();

  aboutController.index = function(ctx, next) {
    $('#about').fadeIn('slow');

    $('html,body').animate(
      { scrollTop: $('.about').offset().top},
      'slow'
    );

    ctx.handled = true;
    next();
  };

  module.aboutController = aboutController;
})(window);
