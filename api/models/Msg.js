/**
 * Msg.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    msg: {
      type: 'text',
      required: true
    },
    msgid: {
      type: 'text',
      required: true
    },
    to: {
      model: 'user'
    },
    // from: {
    //   model: 'user'
    // },
    seen: {
      type: 'BOOLEAN',
      defaultsTo: false
    },
    read: {
      type: 'BOOLEAN',
      defaultsTo: false
    }
  }
};
