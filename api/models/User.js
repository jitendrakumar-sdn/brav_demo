/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstname : {
      type: 'STRING',
      required: true
    },
    middlename : {
      type: 'STRING'
    },
    lastname : {
      type: 'STRING'
    },
    username : {
      type: 'STRING',
      email: true,
      required: true,
      unique: true
    },
    password : {
      type: 'STRING',
      required: true
    },
    online : {
      type: 'BOOLEAN',
      default: false
    }
  }
};

