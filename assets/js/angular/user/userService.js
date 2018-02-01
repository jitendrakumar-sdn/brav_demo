angular
  .module('brav')
  .factory('userService', userService);

userService.$inject = ['constants', 'commonService'];

function userService(constants, commonService) {

  var UserService = {
    getOnlineUser: getOnlineUser,
    getSingleUser: getSingleUser,
    login: login,
    logout: logout,
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

  function logout(data) {
    return commonService.editCall(constants.logout, {
      id: data
    });
  }

  function register(data) {
    return commonService.addCall(constants.register, data);
  }
}
