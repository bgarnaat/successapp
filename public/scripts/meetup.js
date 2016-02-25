'use strict';
(function(module) {
  var meetup = {};

  meetup.PAGE_SIZE = 10;

  meetup.loadMeetup = function() {
    var meetupQuery = $.ajax({
      url: '/meetup/',
      type: 'GET',
      data: {
        topic: query.query,
        offset: jobs.PAGE_SIZE * ((page || 1) - 1),
        page: jobs.PAGE_SIZE,
        // sign: true,
        // 'photo-host': 'public',
        zip: 98109,
      },
      success: function(data, message ,xhr) {
        console.log(data);
      }
    });
  };

  module.meetup = meetup;
})(window);
