Cal.Views.CalendarEdit = Backbone.View.extend({

  template: JST['calendars/edit'],
  
  events: {
    "click button#back-to-cal": "backToCal",
    "click button#discard": "discard",
    "click #save": "save",
    "click .friend-search-submit": "shareCal",
  },
  
  initialize: function () {
    var that = this;
    
    $(document).keypress(function (event) {
      if (event.target.nodeName.toLowerCase() !== 'input') {
        that.whichKey(event);
      }     
    });
  },
  
  render: function () {
    var renderedContent = this.template({
      calendar: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  backToCal: function (event) {
    event.preventDefault();
    
    Cal.router.navigate("#/", { trigger: true });
  },
  
  discard: function (event) {
    event.preventDefault();

    var options = {
      success: function () {
        Backbone.history.navigate("#/", { trigger: true });
      }
    };

    this.model.destroy(options);
  },
  
  save: function (event) {
    event.preventDefault();
    
    var attrs = $(event.target.form).serializeJSON();
    var options = {
      success: function () {
        Backbone.history.navigate("#/", { trigger: true });
      }
    };
    
    console.log(event.target.form);

    console.log(attrs);
    this.model.set(attrs);

    if (this.model.isNew()) {
      this.collection.create(this.model, options);
    } else {
      this.model.save({}, options);
    }
  },
  
  shareCal: function (event) {
    event.preventDefault();
    
    var ev = $("ul.typeahead.dropdown-menu").find('li.active').data('value');
    var userObj = userObjs[ev];
    var id = userObj.id;
    var email = userObj.email;
    
    $(function () {
      $(".calendar-form").append(
        "<input type='hidden' name='calendar[friend_ids][]' value='" + id + "'>"
      );
    
      $(".shared-users ul").append(
        "<li><span class='friends-shared'><h5>" + email + "</h5></span></li>"
      );
      
      $("#search-friends").val("");
    });

    
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 98:
        Backbone.history.navigate("#/", { trigger: true });
        break;
    }
  }
});
