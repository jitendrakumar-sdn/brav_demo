/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'STRING',
      required: true
    },
    username: {
      type: 'STRING',
      email: true,
      required: true,
      unique: true
    },
    password: {
      type: 'STRING',
      required: true
    },
    online: {
      type: 'BOOLEAN',
      defaultsTo: false
    },
    deleted: {
      type: 'BOOLEAN',
      defaultsTo: false
    },
    dob: {
      type: 'date',
      required: true
    },
    timezone: {
      type: 'STRING',
      required: true
    },
    languages: {
      type: 'STRING',
      required: true
    },
    msgfrom: {
      collection: 'Msg',
      via: 'from'
    },
    msgto: {
      collection: 'Msg',
      via: 'to'
    },
    notes: {
      collection: 'note',
      via: 'userid'
    },
    schedule: {
      collection: 'schedule',
      via: 'userid'
    },
    files: {
      collection: 'Fileupload',
      via: 'userid'
    }
  }
};
