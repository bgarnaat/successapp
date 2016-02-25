'use strict';
(function(module) {
  var meetup = {};

  meetup.PAGE_SIZE = 10;

  meetup.loadMeetup = function(query, page) {
    var meetupQuery = $.ajax({
      url: '/meetup/',
      type: 'GET',
      data: {
        callback: '?',
        topic: query.query,
        zip: query.location,
        offset: jobs.PAGE_SIZE * ((page || 1) - 1),
        page: jobs.PAGE_SIZE,

        // sign: true,
        // 'photo-host': 'public',
        // zip: 98109,
      },
      success: function(data, message ,xhr) {
        console.log(data);
      }
    });
  };

  module.meetup = meetup;
})(window);
