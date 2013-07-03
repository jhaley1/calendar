Cal.Routers.Events = Backbone.Router.extend({
  routes: {
    "": "index",
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
  
  eventNew: function (id) {
    var model = Cal.events.get(id);
    
    var newView = new Cal.Views.EventsNew ({
      model: model
    });
    
    this.$rootEl.html(newView.render().$el);
  },
  
  eventShow: function () {
    
  }
  
});
