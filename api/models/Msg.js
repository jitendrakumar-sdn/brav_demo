/**
 * Msg.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    msg: {
      type: 'LONGTEXT',
      required: true
    },
    msgid: {
      type: 'TEXT',
      required: true
    },
    to: {
      model: 'User',
      required: true
    },
    from: {
      model: 'User',
      required: true
    },
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
