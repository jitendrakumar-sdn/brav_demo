angular
  .module('brav')
  .factory('userService', userService);

userService.$inject = ['$q', '$http', 'constants', 'commonService'];

function userService($q, $http, constants, commonService) {

  var UserService = {
    getOnlineUser: getOnlineUser,
    getSingleUser: getSingleUser,
    login: login,
    register: register
  };

  return UserService;

  function getOnlineUser(data) {
    return commonService.getAllCall(constants.onlineUser);
  }

  function getSingleUser(data) {
    return commonService.getByIdCall(constants.singleUser, {
      id: data
    });
  }

  function login(data) {
    return commonService.addCall(constants.login, data);
  }

  function register(data) {
    return commonService.addCall(constants.register, data);
  }
}
