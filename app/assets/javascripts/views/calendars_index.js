Cal.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],
  
  events: {
    "click button#last-month": "lastMonth",
    "click button#next-month": "nextMonth",
    "click button#month-view": "monthView",
    "click button#week-view": "weekView",
    "click button#day-view": "dayView",
  },
  
  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "change:Cal._currentDate", this.render);
    
    $(document).keydown(function (event) {
      if (event.target.nodeName.toLowerCase() !== 'input') {
        that.whichKey(event);
      }     
    });
  },
  
  render: function () {
    var _currentHour = Cal._currentDate.getHours(); 
    var _currentMonth = Cal._currentDate.getMonth(); 
    var _currentYear = Cal._currentDate.getFullYear(); 
    var _firstOfMonth = new Date(_currentYear, _currentMonth, 1); 
    var _dayOfWeek = _firstOfMonth.getDay(); 
    var _lastOfMonth = new Date(_currentYear, _currentMonth + 1, 0); 
    var _lastDayOfWeek = _lastOfMonth.getDay(); 
    var _daysInMonth = _lastOfMonth.getDate(); 
   
    var _daysArr = []; 

    for(var i = 0; i < _daysInMonth; i++) { 
      _daysArr.push(i + 1); 
    }

    var renderedContent = this.template({
      calendars: this.collection,
      today: Cal._currentDate,
      month: Cal._monthNames[_currentMonth],
      year: _currentYear,
      dayOfWeek: Cal._dayNames[_dayOfWeek],
      daysInMonth: _daysArr,
      lastWeekday: Cal._dayNames[_lastDayOfWeek],
      lastDayOfMonth: _daysInMonth
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  dayView: function () {
    Cal.router.navigate("days", { trigger: true });
  },
  
  lastMonth: function () {
    Cal._currentDate.setMonth(Cal._currentDate.getMonth() - 1);
    this.render();
  },
  
  monthView: function () {
    Cal.router.navigate("", { trigger: true });
  },
  
  nextMonth: function () {
    Cal._currentDate.setMonth(Cal._currentDate.getMonth() + 1);
    this.render();
  },

  weekView: function () {
    Cal.router.navigate("weeks", { trigger: true });
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 74: // j
        this.lastMonth();
        break;
      case 75: // k
        this.nextMonth();
        break;
    }
  }

});
