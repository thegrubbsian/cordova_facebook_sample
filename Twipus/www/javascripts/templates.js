var Templates = {
  compiled: {},
  initialize: function() {
    var _self = this;
    var templates = $("script[type='text/template']");
    _.each(templates, function(tmpl) {
      var text = $(tmpl).html();
      var name = $(tmpl).attr("id");
      _self.compiled[name] = function(data) { return _.template(text, data); };
    });
  },
  render: function(name, obj) {
    return this.compiled[name + "_template"](obj);
  }
};
