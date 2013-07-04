Cal.Views.EventEdit = Backbone.View.extend({

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
    
    var _form = $(event.currentTarget);
    var _event = $(".event-form").serializeJSON();

    Cal.events.create(_event, {
      success: function () {
        Cal.router.navigate("#/", { trigger: true });
      }
    });
  }
  
});
