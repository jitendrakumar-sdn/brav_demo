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
      type: 'STRING',
      required: true
    },
    date: {
      type: 'STRING',
      required: true
    },
    year: {
      type: 'STRING',
      required: true
    },
    hr: {
      type: 'STRING',
      required: true
    },
    min: {
      type: 'STRING',
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

