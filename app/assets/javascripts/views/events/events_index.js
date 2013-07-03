Cal.Views.EventsIndex = Backbone.View.extend({

  template: JST['events/index'],
  
  render: function () {
    var _currentDate = new Date ();
    var _currentMonth = _currentDate.getMonth();
    var _currentYear = _currentDate.getFullYear();
    var _dayOfWeek = _currentDate.getDay(_currentDate);
    var _lastDay = new Date(_currentYear, _currentMonth + 1, 0);
    var _daysInMonth = _lastDay.getDate();
    
    var _daysArr = [];
    
    for (var i = 0; i < _daysInMonth; i++) {
      _daysArr.push(i + 1);
    }
    
    var renderedContent = this.template({
      events: this.collection,
      today: _currentDate,
      month: Cal._monthNames[_currentMonth],
      dayOfWeek: Cal._dayNames[_dayOfWeek],
      daysInMonth: _daysArr
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }

});
