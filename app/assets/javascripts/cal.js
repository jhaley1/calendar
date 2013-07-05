window.Cal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function () {
    Cal.calendars = new Cal.Collections.Calendars ();
    
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

    Cal.calendars.fetch({
      success: function () {
        Cal.router = new Cal.Routers.Calendars ({
          $rootEl: $("#content")
        });
        
        Cal.eventsRouter = new Cal.Routers.Events ({
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



    // Cal.events = new Cal.Collections.Events ();
    // Cal.events.fetch({
  //     success: function () {
  //       Cal.router = new Cal.Routers.Events ({
  //         $rootEl: $("#content")
  //       });
  // 
  //       Backbone.history.start(); 
  //     }
  //   });