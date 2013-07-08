Cal.Views.EventsForm = Backbone.View.extend({

  template: JST['events/form'],
  
  events: {
    "click button#back-to-cal": "backToCal",
    "click button#discard": "discard",
    "click #save": "save",
    "click .recurring-event": "toggleRecurringField",
  },
  
  initialize: function () {
    var that = this;

    $(document).keydown(function (event) {
      if (event.target.nodeName.toLowerCase().not('input, textarea')) {
        that.whichKey(event);
      }     
    });
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
    var that = this;
    
    var attrs = $(event.target.form).serializeJSON();
    var calendar = Cal.calendars.get(attrs.event.calendar_id);
    
    var options = {
      success: function (model, response) {
        if (_(response).length > 1) {
          _(response).each(function(ev) {
            var eventModel = new Cal.Models.Event(ev);
            calendar.get("events").add(eventModel);
          });
        } else {
          that.model.set(attrs);
        }
        
        Backbone.history.navigate("#/", { trigger: true });
      }
    };

    this.model.set(attrs);

    if (this.model.isNew()) {
      calendar.get("events").add(this.model);
      this.model.save({}, options);
    } else {
      this.model.save({}, options);
    }
  },
  
  toggleRecurringField: function () {
    if ($(".recurring-event").is(":checked")) {
      $("#recurring-event-fields").show();
    } else {
      $("#recurring-event-fields").hide();
    }
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 66:
        Backbone.history.navigate("#/", { trigger: true });
        break;
    }
  }
});

