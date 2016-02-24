// stores and caches json files from our server's /data/* folder in localStorage

(function(module) {
  localCache = {};

  localCache.fetch = function(key, callback) {
    // this is the end goal
    var processData = function(data, message, xhr) {
      callback(JSON.parse(data));
    };

    // fetches data from the url
    var fetchData = function(key, url, next) {
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
      }).done(function(data, message, xhr) {
        // save the etag and send the data along
        localStorage.eTag = xhr.getResponseHeader('eTag:' + key);
        next(data);
      });
    };

    var cached = localStorage.getItem(key);
    var eTag = localStorage.getItem('eTag:' + key);
    var url = '/data/' + key + '.json';

    if (!cached || !eTag) {
      // we are missing either our data or our etag, fetch again
      fetchData(key, url, processData);
    } else {
      // we have data and an etag, and need to check it
      $.ajax({
        type: 'HEAD',
        url: url,
      }).done(function(data, message, xhr) {
        About.loadAll(JSON.parse(cached));
        var serverETag = xhr.getResponseHeader('eTag');
        if (eTag !== serverETag) {
          // eTag doesn't match, fetch all over again
          fetchData(key, url, processData);
        } else {
          // we already have the correct data
          processData(cached);
        }
      });
    }
  };

  // exports
  module.localCache = localCache;
})(window);
