/* main page index:
/location/:location/search/:query/page/:page#/, all three are optional
*/
page(
  /^\/(location\/(.+?)\/)?(search\/(.+?)\/)?$/,
  searchController.index
);

page('/about', aboutController.index);

// fallback
page('*', function(ctx, next) {
  if (!ctx.handled) {
    console.log('fallback route');
    ctx.handled = true;
    page('/');
  }
  next();
});

page();
