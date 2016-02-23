(function(module) {
  var eventsView = {};

  var eventsTemplate = Handlebars.compile($('#events_template').text());

  eventsView.drawEvents = function(events) {
    $eventSection = $('#eventsection');
    $eventSection.empty();
    events.forEach(function(a) {
      $eventSection.append(eventsTemplate(a));
    });
  };

  module.eventsView = eventsView;
})(window);
