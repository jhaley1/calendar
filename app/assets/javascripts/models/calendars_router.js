Cal.Routers.Calendars = Backbone.Router.extend({
  routes: {
    "": "index",
    "calendars/:id/edit": "calendarEdit",
    "calendars/new": "calendarNew",
    "calendars/:id": "calendarShow",
    "calendars/:id/events/:id/edit": "eventEdit",
    "weeks": "weeksIndex",
    "days": "daysIndex",
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$sidebarEl = options.$sidebarEl;
  },
  
  index: function () {
    var indexView = new Cal.Views.CalendarsIndex ({
      collection: Cal.calendars
    });

    var sidebarView = new Cal.Views.Sidebar ({
      collection: Cal.calendars
    });
    
    this.$sidebarEl.html(sidebarView.render().$el);
    this._swapView(indexView);
  },
  
  calendarEdit: function (id) {
    var _calendar = Cal.calendars.get(id);
    
    var editView = new Cal.Views.EventsForm ({
      model: _calendar
    });
    
    this._swapView(editView);
  },
  
  calendarNew: function () {
    var _calendar = new Cal.Models.Calendar ();
    
    var newView = new Cal.Views.CalendarNew ({
      collection: Cal.calendars,
      model: _calendar
    });
    
    this._swapView(newView);
  },
  
  daysIndex: function () {
    var daysView = new Cal.Views.DaysIndex ({
      collection: Cal.calendars
    });

    var sidebarView = new Cal.Views.Sidebar ({
      collection: Cal.calendars
    });

    this._swapView(daysView);
  },
  
  eventEdit: function (calId, id) {
    var _calendar = Cal.calendars.get(calId);
    var _event = _calendar.get("events").get(id);
    
    var editView = new Cal.Views.EventsForm ({
      model: _event,
      collection: _calendar
    });
    
    this._swapView(editView);
  },
  
  weeksIndex: function () {
    var weeksView = new Cal.Views.WeeksIndex ({
      collection: Cal.calendars
    });

    var sidebarView = new Cal.Views.Sidebar ({
      collection: Cal.calendars
    });
    
    this._swapView(weeksView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  }
  
});
