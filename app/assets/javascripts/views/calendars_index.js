Cal.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],
  
  events: {
    "click button#last-month": "lastMonth",
    "click button#next-month": "nextMonth",
    "click button#month-view": "monthView",
    "click button#week-view": "weekView",
    "click button#day-view": "dayView",
    "click a#event-link": "showEvent",
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
    
    this.$el.find( ".draggable-event" ).draggable({ revert: "invalid" });
    this.$el.find( ".calendar-day-drop" ).droppable({
      hoverClass: "drag-over-highlight",
      drop: function( event, ui ) {
        event.preventDefault();
        
        var newDay = $(event.target).find('#day-num').html();
        var sub = ui.draggable.attr('class');
        var stop = sub.indexOf(' ');
        var start2 = sub.indexOf('-') + 1;
        var stop2 = sub.indexOf(' $');

        var thisEventId = sub.slice(0, stop);
        var thisCalId = sub.slice(start2, stop2);
        var thisCal = Cal.calendars.get(thisCalId);
        var theseEvents = thisCal.get('events');
        var thisEvent = theseEvents.get(thisEventId);

        var thisEventStartDate = new Date (thisEvent.get('start_date'));
        var thisEventEndDate = thisEvent.get('endDate');
        var thisEventMonthNum = thisEventStartDate.getMonth();
        var thisEventYear = thisEventStartDate.getFullYear();
        var thisEventStartDay = thisEventStartDate.getUTCDate();
        
        var startUTCstring = (new Date(thisEvent.get('start_date'))).toUTCString();
        var endUTCstring = (new Date(thisEvent.get('end_date'))).toUTCString();
        var newStartDate = startUTCstring.replace(thisEventStartDay, newDay);
        var newEndDate = endUTCstring.replace(thisEventStartDay, newDay);
        
        var resetStartDate = new Date (newStartDate);
        var resetEndDate = new Date (newEndDate);
        				
		    var _calendar = Cal.calendars.get(thisCalId);
		    var _events = _calendar.get('events');
		    var _model = _events.get(thisEventId);
				
		    var options = {
		      success: function (model, response) {
		        Cal.calendars.fetch({
		          success: function () {
		            that.render();
		          }
		        });
		      }
		    };
    
		    _model.set({ 
					start_date: resetStartDate,
					end_date: resetEndDate 
				});

		    _model.save({}, options);
      }
    });
    
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
