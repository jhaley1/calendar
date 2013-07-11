Cal.Models.Calendar = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: "events",
    relatedModel: "Cal.Models.Event",
    collectionType: "Cal.Collections.Events"
  }]

});
