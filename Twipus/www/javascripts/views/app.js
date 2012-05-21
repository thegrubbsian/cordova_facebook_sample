var AppView = Backbone.View.extend({
  pageSelector: "#page",
  showSignIn: function() {
    this.signInView = new SignInView({ el: this.pageSelector });
    this.signInView.render();
  },
  showHome: function() {
    this.homeView = new HomeView({ el: this.pageSelector });
    this.homeView.render();
  }
});
