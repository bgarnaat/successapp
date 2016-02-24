
(function(module) {

  function About(opts) {
    for (var i in opts) {
      this[i] = opts[i];
    }
  };

  About.prototype.toHtml = function() {
    var template = Handlebars.compile($('#about-template').text());
    return template(this);
  }

  About.all = [];
  About.loadAll = function(rawData) {
    About.all = rawData.map(function(e) {
      return new About(e);
    });
 };

  About.fetchAll(localStorage.rawAbout, 'rawAbout', 'about.json')
  About.fetchAll = function(rawData, raw, dataUrl) {
    if (rawData) {
      $.ajax({
        type: 'HEAD',
        url: 'data/' + dataUrl,
        success: function(data, message, xhr) {
          About.loadAll(JSON.parse(rawData));
          var eTag = xhr.getResponseHeader('eTag');
          if (localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
          } else {
            About.loadAll(JSON.parse(rawData));
          }
        }
      });
      About.loadAll(JSON.parse(rawData));
    } else if (!rawData) {
      // COULDN'T FIND DATA IN LOCALSTORAGE, SO I SET IT UP
      $.getJSON('data/' + dataUrl, function(data) {
        localStorage.setItem(raw, JSON.stringify(data));
        About.loadAll(JSON.parse(data));
      });
    }
  };



  module.About = About;

}(window));
