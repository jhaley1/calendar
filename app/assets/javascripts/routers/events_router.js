Cal.Routers.Events = Backbone.Router.extend({
  routes: {
    "events": "index",
    // "events/new": "even// tNew",
//     "events/:id": "eventShow",
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  eventNew: function () {
    var _event = new Cal.Models.Event ();
    
    var newView = new Cal.Views.EventsForm ({
      model: _event
    });
    
    this.$rootEl.html(newView.render().$el);
  },
  
  eventShow: function (id) {
    
  }
  
});



