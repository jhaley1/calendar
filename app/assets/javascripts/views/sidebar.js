Cal.Views.Sidebar = Backbone.View.extend({

  template: JST['calendars/sidebar'],
  
  events: {
    "click button#new-event": "newEvent",
    "click button#new-calendar": "newCalendar",
    "click button#show-cal": "toggleCal",
    "click button#search-submit": "searchCal",
    "mouseover #keyboard-shortcut-link": "displayKBInfo",
  },
  
  initialize: function () {
    var that = this;
    
    $(document).keydown(function (event) {
      if (event.target.nodeName.toLowerCase() != ('input')) {
        that.whichKey(event);
      }
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
  
  displayKBInfo: function (event) {
    $("#keyboard-shortcut-link").hover(function () {
        $("#keyboard-shortcut-info").css("visibility", "visible");
      },
      function () {
        $("#keyboard-shortcut-info").css("visibility", "hidden");
    });
  },
  
  newCalendar: function () {
    Cal.router.navigate("calendars/new", { trigger: true });
  },
  
  newEvent: function () {
    Cal.router.navigate("events/new", { trigger: true })
  },
  
  searchCal: function (event) {
    var attrs = $(event.target.form).serializeJSON();
    console.log(attrs);
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
      console.log(event.keyCode)
        Cal.router.navigate("events/new", { trigger: true })
        break;
    }
  }
  
});
