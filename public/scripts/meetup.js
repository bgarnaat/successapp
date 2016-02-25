'use strict';
(function(module) {
  var meetup = {};

  meetup.loadMeetup = function() {
    var meetupQuery = $.ajax({
      url: 'https://api.meetup.com/2/open_events',
      data: {
        key: key_mu,
        sign: true,
        'photo-host': 'public',
        zip: 98109,
        page: 25,
      },
      type: 'GET',
      success: function(data, message ,xhr) {
        console.log(data);
      }
    });
  };

  module.meetup = meetup;
})(window);
