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
    console.log(typeof this.model)
    
    Cal.Models.Event.findOrCreate(attrs, {create: true} );
    
    // if (this.model.isNew()) {
//       this.collection.create(this.model, options);
//     } else {
//       this.model.save({}, options);
//     }
  }
});

