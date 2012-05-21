var Storage = {
  get: function(key) {
    return window.localStorage.getItem(key);
  },
  set: function(key, value) {
    window.localStorage.setItem(key, value);
  }
};
