Cal.Views.Sidebar = Backbone.View.extend({

  template: JST['calendars/sidebar'],
  
  events: {
    "click button#new-event": "newEvent",
    "click button#show-cal": "toggleCal",
  },
  
  initialize: function () {
    var that = this;
    
    $(document).keydown(function (event) {
      that.whichKey(event);
    });
  },
  
  render: function () {
    var _currentMonth = Cal._currentDate.getMonth();
    
    var renderedContent = this.template({
      calendars: this.collection,
      month: Cal._monthNames[_currentMonth]
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  newEvent: function () {
    Cal.router.navigate("events/new", { trigger: true })
  },
  
  toggleCal: function (event) {
    event.preventDefault();
    var calId = $(event.currentTarget).attr("data-id");
    var cal = Cal.calendars.get(calId);
    var el = $(".cal-" + calId);
    
    el.is(":hidden") ? el.show() : el.hide()
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 67: // c
        Cal.router.navigate("events/new", { trigger: true })
        break;
    }
  }
  
});