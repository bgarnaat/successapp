// TODO: application routes

// fallback
page(/.*/, function(ctx, next) {
  if (!ctx.handled) {
    console.log('fallback route');
    ctx.handled = true;
    page('/');
  }
  next();
});

page();
