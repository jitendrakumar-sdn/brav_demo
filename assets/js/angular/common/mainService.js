angular
  .module('brav')
  .factory('mainService', mainService);

mainService.$inject = [];

function mainService() {
  let MainService = {
    peer: undefined,
    existingCall: undefined,
    isInCall: false,
    existingCallId: undefined,
    localStream: undefined
  }

  return MainService;
}
