(function(module) {

  function Info(opts) {
    for (var i in opts) {
      this[i] = opts[i];
    }
  };

  Info.prototype.toHtml = function(temp) {
    var template = Handlebars.compile($(temp).text());
    return template(this);
  }

  Info.all = [];
  Info.loadAll = function(rawInfo) {
    Info.all = rawInfo.map(function(e) {
      return new Info(e);
    });
  };

  module.Info = Info;
}(window));
