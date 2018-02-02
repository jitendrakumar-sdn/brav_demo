/**
 * Schedule.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'LONGTEXT',
      required: true
    },
    start: {
      type: 'STRING',
      required: true
    },
    end: {
      type: 'STRING',
      required: true
    },
    time: {
      type: 'STRING',
      required: true
    },
    availabilty: {
      type: 'STRING',
      required: true
    },
    description: {
      type: 'LONGTEXT',
      required: true
    },
    userid: {
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
