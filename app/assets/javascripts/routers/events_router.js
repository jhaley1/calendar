Cal.Routers.Events = Backbone.Router.extend({
  routes: {
    "": "index",
    "events/:id": "show",
  },
  
  initialize: function (options) {
    this.$rootEl = options[$rootEl];
  },
  
  index: function () {
    var indexView = new Cal.Views.EventsIndex ({
      collection: Cal.events
    });
    
    this.$rootEl.html(indexView.render().$el);
  },
  
  show: function () {
    
  }
  
});
