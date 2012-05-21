function TwitterAuth() {
  if(window.ChildBrowser == null) {
    ChildBrowser.install();
  }
}

TwitterAuth.prototype.install = function() {
  if(!window.plugins) {
    window.plugins = {};
  }
  window.plugins.twitterAuth = new TwitterAuth();
  return window.plugins.twitterAuth;
};

TwitterAuth.prototype.authorize = function(opts) {
  accessor = {
    consumerKey: Config.twitter.consumerKey,
    consumerSecret: Config.twitter.consumerSecret,
    oauthCallbackUrl: Config.twitter.callbackUrl,
    finalCallback: opts.callback,
    serviceProvider: {
      signatureMethod: "HMAC-SHA1",
      requestTokenURL: "http://api.twitter.com/oauth/request_token",
      userAuthorizationURL: "https://api.twitter.com/oauth/authorize",
      accessTokenURL: "https://api.twitter.com/oauth/access_token",
      echoURL: "http://localhost/oauth-provider/echo"
    }
  };

  var message = {
    method: "post", action: accessor.serviceProvider.requestTokenURL,
    parameters: [["scope", "http://www.google.com/m8/feeds/"]]
  };

  var requestBody = OAuth.formEncode(message.parameters);
  OAuth.completeRequest(message, accessor);

  var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
  var requestToken = new XMLHttpRequest();
  requestToken.onreadystatechange = function receiveRequestToken() {
    if (requestToken.readyState == 4) {
      var results = OAuth.decodeForm(requestToken.responseText);
      var oauth_token = OAuth.getParameter(results, "oauth_token");
      var authorize_url = "http://api.twitter.com/oauth/authorize?oauth_token="+oauth_token;
      client_browser = ChildBrowser.install();
      client_browser.onLocationChange = function(loc){
         window.plugins.twitterAuth.twitterLocChanged(loc, requestToken, accessor);
      };
      if (client_browser != null) {
        window.plugins.childBrowser.showWebPage(authorize_url);
      }
    }
  };
  requestToken.open(message.method, message.action, true);
  requestToken.setRequestHeader("Authorization", authorizationHeader);
  requestToken.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  requestToken.send(requestBody);
};

TwitterAuth.prototype.twitterLocChanged = function(loc, requestToken, accessor) {
  if (loc.indexOf(accessor.oauthCallbackUrl) > -1) {
    client_browser.close();
    var results = OAuth.decodeForm(requestToken.responseText);
    message = {
      method: "post",
      action: accessor.serviceProvider.accessTokenURL
    };
    OAuth.completeRequest(message,{
      consumerKey : accessor.consumerKey,
      consumerSecret: accessor.consumerSecret,
      token : OAuth.getParameter(results, "oauth_token"),
      tokenSecret : OAuth.getParameter(results, "oauth_token_secret")
    });

    var requestAccess = new XMLHttpRequest();
    requestAccess.onreadystatechange = function receiveAccessToken() {
      if (requestAccess.readyState == 4) {
        var params = window.plugins.twitterAuth.get_url_vars_from_string(requestAccess.responseText);
        accessor.finalCallback({
          token: params["oauth_token"],
          secret: params["oauth_token_secret"],
          username: params["screen_name"],
          id: params["user_id"]
        });
      }
    };
    requestAccess.open(message.method, message.action, true);
    requestAccess.setRequestHeader("Authorization", OAuth.getAuthorizationHeader("", message.parameters));
    requestAccess.send();
  }
};

TwitterAuth.prototype.get_url_vars_from_string = function(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};
