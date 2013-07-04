Cal.Collections.Events = Backbone.Collection.extend({

  model: Cal.Models.Event,

  initialize: function (options) {
    this.calendar = options.calendar;
  },

  url: function () {
    return this.calendar.url() + "/files"
  }

});
