'use strict';
(function(module) {
  var eventsView = {};

  var eventsTemplate = Handlebars.compile($('#events-template').text());

  eventsView.clear = function() {
    // show the spinner
    $('#event-loader').show();
    // empty out event listings
    $('#event-section').find('.event-listing, .no-events').remove();
  };

  eventsView.drawEvents = function(events) {
    $('#event-loader').hide();
    var $eventSection = $('#event-section');

    if (events.length > 0) {
      events.forEach(function(a) {
        var $eventElement = $(eventsTemplate(a));
        // attach handler for expanded information
        $eventElement.click(function() {
          $(this).find('.event-expand').toggle();
        });
        $eventSection.append($eventElement);
      });
    } else {
      // we've gotten no events back!
      var $noEventElement = $('<p class="no-events">No Events Found</p>');
      $eventSection.append($noEventElement);
    }
  };

  module.eventsView = eventsView;
})(window);
