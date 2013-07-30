Cal.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],
  
  events: {
    "click button#last-month": "lastMonth",
    "click button#next-month": "nextMonth",
    "click button#month-view": "monthView",
    "click button#week-view": "weekView",
    "click button#day-view": "dayView",
    "click a#event-link": "showEvent",
    "click #dragged-event-update-button": "save",
  },
  
  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "change:Cal._currentDate", this.render);
    this.listenTo(this.collection, "all", this.render);
    
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
    Backbone.history.navigate("", { trigger: true });
  },
  
  nextMonth: function () {
    Cal._currentDate.setMonth(Cal._currentDate.getMonth() + 1);
    this.render();
  },
  
  save: function (event) {
    event.preventDefault();
    
    var _calId = $('.dragged-cal-id').html();
    var _eventId = $('.dragged-event-id').html();
    
    var _calendar = Cal.calendars.get(_calId);
    var _events = _calendar.get('events');
    var _model = _events.get(_eventId);
    
    var attrs = $(".dragged-event-updater").serializeJSON();
    var options = {
      success: function (model, response) {
        if (_(response).length > 1) {
          _(response).each(function(ev) {
            var eventModel = new Cal.Models.Event(ev);
            _calendar.get("events").add(eventModel);
            
            Cal.calendars.fetch({
              success: function () {
                Backbone.history.navigate("#/", { trigger: true });
              }
            });
          });
        } else {
          _model.set(attrs);
          
          Cal.calendars.fetch({
            success: function () {
              Backbone.history.navigate("#/", { trigger: true });
            }
          });
        }
      }
    };
    
    _calendar.get("events").add(_model);
    _model.save({}, options);


    _model.set(attrs);
    
    _model.save({}, options);
  },

  
  showEvent: function (event) {
    event.preventDefault();

    var cl = event.currentTarget.className;   
    var cls = cl.split(' ');
    var calendar = Cal.calendars.get(cls[0]);
    var event = calendar.get("events").get(cls[1]);
    
    $("#content").append("<div class='lightbox'>" + JST['events/show']({ calendarId: cls[0], calendar: calendar, eventId: cls[1], event: event }) + "</div>");
  },

  weekView: function () {
    Backbone.history.navigate("weeks", { trigger: true });
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 106: // j
        this.lastMonth();
        break;
      case 107: // k
        this.nextMonth();
        break;
    }
  }

});
