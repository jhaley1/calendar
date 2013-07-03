Cal.Views.EventsNew = Backbone.View.extend({

  template: JST['events/new'],
  
  render: function () {
    var renderedContent = this.template({
      event: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
  
});