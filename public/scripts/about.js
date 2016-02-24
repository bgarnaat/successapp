(function(module) {

  function About(opts) {
    for (var i in opts) {
      this[i] = opts[i];
      console.log(i);
    }
  };

  About.prototype.toHtml = function(temp) {
    var template = Handlebars.compile($(temp).text());
    return template(this);
  }

  About.all = [];
  About.loadAll = function(rawData) {
    About.all = rawData.map(function(e) {
      return new About(e);
    });
  };

  module.About = About;

}(window));
