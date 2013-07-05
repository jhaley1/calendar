Cal.Routers.Events = Backbone.Router.extend({
  routes: {
    "events": "index",
    "events/:id/edit": "eventEdit",
    "events/new": "eventNew",
    "events/:id": "eventShow",
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  index: function () {
    var indexView = new Cal.Views.EventsIndex ({
      collection: Cal.events
    });

    this.$rootEl.html(indexView.render().$el);
  },
  
  eventEdit: function (id) {
    var _event = Cal.events.get(id);
    
    var editView = new Cal.Views.EventsForm ({
      model: _event
    });
    
    this.$rootEl.html(editView.render().$el);
  },
  
  eventNew: function () {
    var _event = new Cal.Models.Event ();
    
    var newView = new Cal.Views.EventsForm ({
      collection: Cal.calendars,
      model: _event
    });
    
    this.$rootEl.html(newView.render().$el);
  },
  
  eventShow: function (id) {
    
  }
  
});



