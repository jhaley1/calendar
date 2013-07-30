Cal.Views.EventsForm = Backbone.View.extend({
  
  events: {
    "click a.back-to-cal": "backToCal",
  },
  
  initialize: function () {
    var that = this;
    
    $(document).on('keypress', function(event) {
      var tag = event.target.tagName.toLowerCase();
      if (tag != 'input' && tag != 'textarea') 
        that.whichKey(event);
    });
  },
  
  backToCal: function (event) {
    event.preventDefault();
    
    console.log('hi');
  },
  
  whichKey: function (event) {
    switch (event.keyCode) {
      case 27:
        console.log('hi')
        $('lightbox').remove();
        break;
    }
  }
  
})