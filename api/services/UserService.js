module.exports = {
  getUser: function (val) {
    return User.findOne({
      "username": val.username,
      "password": val.password
    });
  },
  getOnlineUser: function (val) {
    return User.find({
      "online": true
    });
  },
  checkLogin: function (val) {
    return User.find({
      "id": val,
      "online": true
    });
  }
};
