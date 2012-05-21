var Router = Backbone.Router.extend({
  routes: {
    "root": "_root",
    "signin": "_signIn",
    "home": "_home"
  },
  initialize: function() {
    Backbone.history.start();
    this.navigateTo("root");
  },
  navigateTo: function(route) {
    this.navigate(route, { trigger: true });
  },
  _root: function() {
    var action = App.user.isSignedIn() ? "home" : "signin";
    this.navigateTo(action);
  },
  _signIn: function() {
    App.appView.showSignIn();
  },
  _home: function() {
    App.appView.showHome();
  }
});
