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
  
  backToCal: function () {
    Cal.router.navigate("#/", { trigger: true });
  },
  
  discard: function () {
    
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
  }
});

