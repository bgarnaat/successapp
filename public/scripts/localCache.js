'use strict';
// STORES AND CACHES JSON FILES FROM OUR SERVER's (/data/*) FOLDER IN LOCALSTORAGE
(function(module) {
  var localCache = {};

  localCache.fetch = function(key, callback) {
    // THIS IS THE END GOAL
    var processData = function(data, message, xhr) {
      callback(JSON.parse(data));
    };

    // FETCHES DATA FROM THE URL
    var fetchData = function(key, url, next) {
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
      }).done(function(data, message, xhr) {
        // SAVE THE ETAG AND SEND THE DATA ALONG
        localStorage.setItem('etag:' + key, xhr.getResponseHeader('ETag'));
        localStorage.setItem(key, data);
        next(data);
      });
    };

    var cached = localStorage.getItem(key);
    var eTag = localStorage.getItem('etag:' + key);
    var url = '/data/' + key + '.json';

    if (!cached || !eTag) {
      // WE ARE MISSING EITHER OUR DATA || ETAG, FETCH AGAIN
      fetchData(key, url, processData);
    } else {
      // WE HAVE DATA AND AN ETAG, AND NEED TO CHECK IT
      $.ajax({
        type: 'HEAD',
        url: url,
      }).done(function(data, message, xhr) {
        var serverETag = xhr.getResponseHeader('ETag');
        if (eTag !== serverETag) {
          // ETAG DOESN'T MATCH, FETCH ALL OVER AGAIN
          fetchData(key, url, processData);
        } else {
          // WE ALREADY HAVE THE CORRECT DATA
          processData(cached);
        }
      });
    }
  };

  module.localCache = localCache;
})(window);
