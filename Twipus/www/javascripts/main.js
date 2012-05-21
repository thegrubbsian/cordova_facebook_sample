function main() {
  document.addEventListener("deviceready", App.initialize, false);
  App.initialize();
}

var App = {
  initialize: function() {
    this._preventDragging();
    this._initTwitterAuth();
    Templates.initialize();
    this.user = new User();
    this.appView = new AppView();
    this.router = new Router();
  },
  _preventDragging: function() {
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    }, false);
  },
  _initTwitterAuth: function() {
    var auth = new TwitterAuth();
    this.twitterAuth = auth.install();
  }
};
