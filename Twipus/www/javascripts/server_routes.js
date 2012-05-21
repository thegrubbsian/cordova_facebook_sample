var ServerRoutes = {
  userCreate: function() {
    return ["POST", this._baseUrl() + "/users"];
  },
  _baseUrl: function() {
    return Config.serverAddress + "/api/v" + Config.apiVersion;
  }
};
