Cal.Views.CalendarNew = Backbone.View.extend({

  template: JST['calendars/new'],
  
  events: {
    "click button#back-to-cal": "backToCal",
    "click button#discard": "discard",
    "click #save": "save",
    "click .friend-search-submit": "shareCal",
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
      },
      error: function (model, response) {
        $(function () {
          $("#content").prepend("<div class='alert alert-error'><a class='close' data-dismiss='alert'>×</a>" + response.responseText + "</div>")
        });
      }
    };

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
