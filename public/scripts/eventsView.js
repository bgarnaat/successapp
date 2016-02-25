'use strict';
(function(module) {
  var eventsView = {};

  var eventsTemplate = Handlebars.compile($('#events-template').text());

  eventsView.drawEvents = function(events) {
    $('#gif').hide();
    var $eventSection = $('#event-section');
    $eventSection.empty();
    events.forEach(function(a) {
      var $eventElement = $(eventsTemplate(a));
      // attach handler for expanded information
      $eventElement.click(function() {
        $(this).find('.event-expand').toggle();
      });
      $eventSection.append($eventElement);
    });
  };

  module.eventsView = eventsView;
})(window);
