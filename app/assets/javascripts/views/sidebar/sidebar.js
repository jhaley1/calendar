Cal.Views.Sidebar = Backbone.View.extend({

  template: JST['calendars/sidebar'],
  
  events: {
    "click button#edit-cal": "editCalendar",
    "click button#new-event": "newEvent",
    "click button#new-calendar": "newCalendar",
    "click button#show-cal": "toggleCal",
    "click .search-submit": "searchCal",
    "click button.logout": "logUserOut",
    "mouseover #keyboard-shortcut-link": "displayKBInfo",
  },
  
  initialize: function () {
    var that = this;
    
    $(document).on('keypress', function(event) {
      var tag = event.target.tagName.toLowerCase();
      if (tag != 'input' && tag != 'textarea') 
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
  
  displayKBInfo: function (event) {
    $("#keyboard-shortcut-link").hover(function () {
        $("#keyboard-shortcut-info").css("visibility", "visible");
      },
      function () {
        $("#keyboard-shortcut-info").css("visibility", "hidden");
    });
  },
  
  editCalendar: function (event) {
    event.preventDefault();
    var calId = $(event.currentTarget).attr("data-id");
    
    Backbone.history.navigate("calendars/" + calId + "/edit", { trigger: true })
  },
  
  logUserOut: function () {
    Cal.router.navigate("session/destroy");
  },
  
  newCalendar: function () {
    Cal.router.navigate("calendars/new", { trigger: true });
  },
  
  newEvent: function () {
    Cal.router.navigate("events/new", { trigger: true })
  },
  
  searchCal: function (event) {
    event.preventDefault();
    
    var ev = $("ul.typeahead.dropdown-menu").find('li.active').data('value');
    var eventObj = eventObjs[ev];
    var id = eventObj.id;
    var calId = eventObj.calendar_id;

    Backbone.history.navigate("calendars/" + calId + "/events/" + id + "/edit",
      { trigger: true });
  },
  
  toggleCal: function (event) {
    event.preventDefault();
    var calId = $(event.currentTarget).attr("data-id");
    var cal = Cal.calendars.get(calId);
    var el = $(".cal-" + calId);
    
    el.is(":hidden") ? el.show() : el.hide();
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 99: // c
        Cal.router.navigate("events/new", { trigger: true })
        break;
    }
  }
  
});
