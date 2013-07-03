Cal.Views.EventsIndex = Backbone.View.extend({

  template: JST['events/index'],
  
  render: function () {
    var _currentDate = new Date ();
    var _currentMonth = _currentDate.getMonth();
    var _currentYear = _currentDate.getFullYear();
    var _dayOfWeek = _currentDate.getDay(_currentDate);
    
    var renderedContent = this.template({
      events: this.collection,
      today: _currentDate,
      month: Cal._monthNames[_currentMonth],
      dayOfWeek: Cal._dayNames[_dayOfWeek]
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }

});
