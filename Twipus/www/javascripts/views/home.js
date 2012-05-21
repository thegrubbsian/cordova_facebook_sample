var HomeView = Backbone.View.extend({
  render: function() {
    var html = Templates.render("home");
    this.$el.html(html);
  }
});
