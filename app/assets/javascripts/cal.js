window.Cal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function () {
    Cal.events = new Cal.Collections.Events ();
    
    Cal._monthNames = [ 
      "January", "February", "March", 
      "April", "May", "June",
      "July", "August", "September", 
      "October", "November", "December" 
      ];
    Cal._dayNames = [ 
      "Sunday", "Monday", "Tuesday", 
      "Wednesday", "Thursday",
      "Friday", "Saturday" 
      ];
    Cal._currentDate = new Date ();

    Cal.events.fetch({
      success: function () {
        new Cal.Routers.Events ({
          $rootEl: $("#content")
        });

        Backbone.history.start(); 
      }
    });
  }
};

$(function (){
  Cal.initialize();
});
