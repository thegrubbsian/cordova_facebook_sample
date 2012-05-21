var SignInView = Backbone.View.extend({
  events: {
    "touchstart #sign_in_button": "_handleSignIn"
  },
  render: function() {
    var html = Templates.render("sign_in");
    this.$el.html(html);
    this.delegateEvents();
  },
  _handleSignIn: function(e) {
    e.preventDefault();
    App.twitterAuth.authorize({
      oauthCallbackUrl: "http://twip.us",
      callback: function(auth) {
        App.user.authenticate(auth, function() {
          App.router.navigateTo("home");
        });
      }
    });
  }
});
