window.Cal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    var Cal.events = new Cal.Collections.Events ();
    
    Cal.events.fetch({
      new Cal.Routers.Events ();
      Backbone.history.start();
    });
  }
};

$(function(){
  Cal.initialize();
});
