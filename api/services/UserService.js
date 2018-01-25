module.exports = {
  getUser: function sayHelloService(val) {
    console.log('val', val)
    return Users.findOne({
      "username": val.username,
      "password": val.password
    });
  },
  getClients: function sayHelloService(val) {
    console.log('val', val)
    // return Pet.query('SELECT pet._id FROM pet WHERE pet._id = $1', [ 'dog' ]{ "_id": val });
  }
};
