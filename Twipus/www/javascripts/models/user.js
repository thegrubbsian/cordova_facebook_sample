var User = Backbone.Model.extend({
  url: function() {
    return Config.serverAddress + "/api/v" + Config.apiVersion + "/users";
  },
  authenticate: function(auth, callback) {
    var _self = this;
    var route = ServerRoutes.userCreate();
    $.ajax({
      type: route[0],
      url: route[1],
      data: { token: auth.token, secret: auth.secret },
      success: function(data) {
        _self.set(data);
        Storage.set("is_signed_up", true);
        Storage.set("is_signed_in", true);
        Storage.set("user", _self.toJSON());
        callback();
      }
    });
  },
  isSignedUp: function() {
    return Storage.get("is_signed_up") == "true";
  },
  isSignedIn: function() {
    return Storage.get("is_signed_in") == "true";
  },
});
