Cal.Views.EventsIndex = Backbone.View.extend({

  template: JST['events/index'],
  
  render: function () {
    var monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
    
    var currentDate = Date.now();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getYear();
    var dayOfWeek: currentDate.getDay(currentDate);
    
    var renderedContent = this.template({
      events: this.collection,
      month: monthNames[currentMonth],
      today: currentDate,
      dayOfWeek: dayOfWeek
    })
    
    this.$el.html(renderedContent);
    
    return this;
  }

});
