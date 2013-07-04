Cal.Routers.Calendars = Backbone.Router.extend({
  routes: {
    "": "index",
    "calendars/:id/edit": "calendarEdit",
    "calendars/new": "calendarNew",
    "calendars/:id": "calendarShow",
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  index: function () {
    var indexView = new Cal.Views.CalendarsIndex ({
      collection: Cal.calendars
    });

    this.$rootEl.html(indexView.render().$el);
  },
  
  calendarEdit: function (id) {
    var _calendar = Cal.calendars.get(id);
    
    var editView = new Cal.Views.EventsForm ({
      model: _calendar
    });
    
    this.$rootEl.html(editView.render().$el);
  },
  
  calendarNew: function () {
    var _calendar = new Cal.Models.Event ();
    
    var newView = new Cal.Views.EventsForm ({
      collection: Cal.calendars,
      model: _calendar
    });
    
    this.$rootEl.html(newView.render().$el);
  },
  
  calendarShow: function (id) {
    
  }
  
});
