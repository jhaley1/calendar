Cal.Views.WeeksIndex = Backbone.View.extend({

  template: JST['calendars/weeks'],
  
  events: {
    "click button#last-week": "lastWeek",
    "click button#next-week": "nextWeek",
    "click button#new-event": "newEvent",
    "click button#show-cal": "toggleCal",
    "click button#month-view": "monthView",
    "click button#week-view": "weekView",
    "click button#day-view": "dayView",
    "click a#event-link": "showEvent",
  },
  
  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "change:Cal._currentDate", this.render);
    
    $(document).on('keypress', function(event) {
      var tag = event.target.tagName.toLowerCase();
      if (tag != 'input' && tag != 'textarea') 
        that.whichKey(event);
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
      hour: _currentHour,
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
  
  lastWeek: function () {
    var date = Cal._currentDate.setDate(Cal._currentDate.getDate() - 14);
    Cal._currentDate = new Date (date);
    
    this.render();
  },
  
  monthView: function () {
    Cal.router.navigate("", { trigger: true });
  },
  
  nextWeek: function () {
    var date = Cal._currentDate.setDate(Cal._currentDate.getDate());
    Cal._currentDate = new Date (date);
    
    this.render();
  },
  
  newEvent: function () {
    Cal.router.navigate("events/new", { trigger: true });
  },
  
  showEvent: function (event) {
    event.preventDefault();

    var cl = event.currentTarget.className;   
    var cls = cl.split(' ');
    var calendar = Cal.calendars.get(cls[0]);
    var event = calendar.get("events").get(cls[1]);
    
    $("#content").append("<div class='lightbox'>" + JST['events/show']({ calendarId: cls[0], calendar: calendar, eventId: cls[1], event: event }) + "</div>")
  },
  
  toggleCal: function (event) {
    event.preventDefault();
    var calId = $(event.currentTarget).attr("data-id");
    var cal = Cal.calendars.get(calId);
    var el = $(".cal-" + calId);
    
    el.is(":hidden") ? el.show() : el.hide()
  },
  
  weekView: function () {
    Cal.router.navigate("weeks", { trigger: true });
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 106: // j
        this.lastWeek();
        break;
      case 107: // k
        this.nextWeek();
        break;
    }
  }

});
