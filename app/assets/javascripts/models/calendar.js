Cal.Models.Calendar = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: "events",
    relatedModel: "Cal.Models.Event",
    collectionType: "Cal.Collections.Events"
  }]

});


// parse: function (json) {
//   json = json.calendar;
//   if (!this.events) {
//     this.events = new Cal.Collections.Events({
//       event: this
//     });
//   }
// 
//   this.events.set(json.events);
//   delete json.events;
// 
//   return json;
// },
// 
// 
// toJSON: function (options) {
//   var json = Backbone.Model.prototype.toJSON.call(this, options);
// 
//   json.gist.gist_files_attributes = this.gistFiles.toJSON();
//   delete json.gist.favorited;
// 
//   return json;
// }