window.Cal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function () {
    Cal.events = new Cal.Collections.Events ();
    
    Cal.events.fetch({
      success: function () {
        new Cal.Routers.Events ({
          $rootEl: $("#content")
        });
        Backbone.history.start (); 
      }
    });
  }
};

$(function (){
  Cal.initialize();
});
