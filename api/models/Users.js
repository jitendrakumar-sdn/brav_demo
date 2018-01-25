/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    "id": {
      "type": "integer",
      "size": 24,
      "autoIncrement": true,
      "primaryKey": true,
      "unique": true,
      "required": true,
      "columnName": 'id'
    },
    "firstName": {
      "type": "string",
      "required": true,
      "columnName": 'first_name'
    },
    "lastName": {
      "type": "string",
      "columnName": 'last_name'
    },
    "username": {
      "type": "string",
      "unique": true,
      "required": true,
      "columnName": 'username'
    },
    "password": {
      "type": "string",
      "unique": true,
      "required": true,
      "columnName": 'password'
    },
    "lastName": {
      "type": "string",
      "columnName": 'last_name'
    },
    "status": {
      "type": "int",
      "size": 1,
      "columnName": 'status'
    },
    "createdOn": {
      "type": "datetime",
      "columnName": 'created_on'
    },
    "modifiedOn": {
      "type": "datetime",
      "columnName": 'modified_on'
    },
    "peerId": {
      "type": "string",
      "columnName": 'peer_id'
    }
  }
};
