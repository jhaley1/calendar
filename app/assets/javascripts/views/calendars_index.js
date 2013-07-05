Cal.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],
  currentView: "month",
  
  events: {
    "click button#last-month": "lastMonth",
    "click button#next-month": "nextMonth",
    "click button#new-event": "newEvent",
    "click button#show-cal": "toggleCal",
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
    var _currentMonth = Cal._currentDate.getMonth();
    var _currentYear = Cal._currentDate.getFullYear();
    var _firstOfMonth = new Date(_currentYear, _currentMonth, 1);
    var _dayOfWeek = _firstOfMonth.getDay();
    var _lastOfMonth = new Date(_currentYear, _currentMonth + 1, 0);
    var _lastDayOfWeek = _lastOfMonth.getDay();
    var _daysInMonth = _lastOfMonth.getDate();
    
    var _daysArr = [];

    for (var i = 0; i < _daysInMonth; i++) {
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
    this.template = JST["calendars/days"];
    this.currentView = "day";
    this.render();
  },
  
  lastMonth: function () {
    Cal._currentDate.setMonth(Cal._currentDate.getMonth() - 1);
    this.render();
  },
  
  monthView: function () {
    this.template = JST["calendars/index"];
    this.currentView = "month";
    this.render();
  },
  
  nextMonth: function () {
    if (this.currentView == "month") {
      Cal._currentDate.setMonth(Cal._currentDate.getMonth() + 1);
    } else if (this.currentView == "week") {
      Cal._currentDate.setDate(Cal._currentDate.getDate() + 7);
    } else if (this.currentView == "day") {
      Cal._currentDate.setDate(Cal._currentDate.getDate() + 1);
    }
    this.render();
  },
  
  newEvent: function () {
    Cal.router.navigate("events/new", { trigger: true })
  },
  
  toggleCal: function (event) {
    event.preventDefault();
    var calId = $(event.currentTarget).attr("data-id");
    var cal = Cal.calendars.get(calId);
    var el = $(".cal-" + calId);
    
    el.is(":hidden") ? el.show() : el.hide()
  },
  
  weekView: function () {
    this.template = JST["calendars/weeks"];
    this.render();
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
