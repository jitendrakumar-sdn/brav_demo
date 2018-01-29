/**
 * Schedule.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    conflictname: {
      type: 'STRING',
      required: true
    },
    month: {
      type: 'INT',
      required: true
    },
    date: {
      type: 'INT',
      required: true
    },
    year: {
      type: 'INT',
      required: true
    },
    hr: {
      type: 'INT',
      required: true
    },
    min: {
      type: 'INT',
      required: true
    },
    availabilty: {
      type: 'string',
      required: true
    },
    description: {
      type: 'text',
      required: true
    }
  }
};

