
/* main page index:
/location/:location/search/:query/page/:page#/, all three are optional
*/
page(
  /^\/(location\/(.+?)\/)?(search\/(.+?)\/)?$/,
  searchController.index
);

// ROUTE TO ABOUT PAGE
page('/about', aboutController.index);

// FALLBACK IF ANY ROUTE FAILS
page('*', function(ctx, next) {
  if (!ctx.handled) {
    ctx.handled = true;
    page('/');
  }
  next();
});

// CALL PAGE FUNCTION IN page.js
page();
