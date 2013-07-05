Cal.Views.EventsForm = Backbone.View.extend({

  template: JST['events/form'],
  
  events: {
    "click button#back-to-cal": "backToCal",
    "click button#discard": "discard",
    "click #save": "save",
  },
  
  render: function () {
    var renderedContent = this.template({
      event: this.model
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

    var calendar = Cal.calendars.get(attrs.event.calendar_id);
    this.model.set(attrs);

    if (this.model.isNew()) {
      calendar.get("events").add(this.model);
      this.model.save({}, options);
    } else {
      this.model.save({}, options);
    }
  }
});

