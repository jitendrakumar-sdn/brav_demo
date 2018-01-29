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
  getClients: function (val) {
    console.log('val', val)
    // return Pet.query('SELECT pet._id FROM pet WHERE pet._id = $1', [ 'dog' ]{ "_id": val });
  }
};
