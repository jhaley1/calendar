Cal.Views.CalendarNew = Backbone.View.extend({

  template: JST['calendars/new'],
  
  events: {
    "click button#back-to-cal": "backToCal",
    "click button#discard": "discard",
    "click #save": "save",
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

    this.model.set(attrs);

    if (this.model.isNew()) {
      this.collection.create(this.model, options);
    } else {
      this.model.save({}, options);
    }
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 98:
        Backbone.history.navigate("#/", { trigger: true });
        break;
    }
  }
});
