(function () {
  'use strict';

  var appUrl = "http://localhost:1337/";
  //   var appUrl = "http://localhost:3000/"; //live

  var apiRoutesUrl = {
    appUrl: appUrl,

    // user
    login: appUrl + 'user/login',
    logout: appUrl + 'user/logout',
    register: appUrl + 'user/register',
    singleUser: appUrl + 'user/single',
    onlineUser: appUrl + 'user/online',
    // note
    createNote: appUrl + 'note/createnew',
    getNotes: appUrl + 'note/notes'
  };

  angular.module('brav').constant('constants', apiRoutesUrl);

})();
