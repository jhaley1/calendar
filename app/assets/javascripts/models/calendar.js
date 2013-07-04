Cal.Models.Calendar = Backbone.Model.extend({

  parse: function (json) {
      if (!this.events) {
        this.events = new Cal.Collections.Events({
          event: this
        });
      }

      this.events.set(json.events);
      delete json.events;

      return json;
    },

    toJSON: function (options) {
      var json = Backbone.Model.prototype.toJSON.call(this, options);

      json.gist.gist_files_attributes = this.gistFiles.toJSON();
      delete json.gist.favorited;

      return json;
    }

});
