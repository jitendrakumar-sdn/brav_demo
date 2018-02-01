angular
  .module('brav')
  .controller('mediatorController', mediatorController);

mediatorController.$inject = ['$scope', '$location', 'notificationService', 'commonService', 'mainService'];

function mediatorController($scope, $location, notificationService, commonService, mainService) {
  var MDSC = this;

  MDSC.activeVedioCalls;
  MDSC.isCameraOn = true;
  MDSC.isInCall = false;
  MDSC.isMicrophoneOn = true;
  MDSC.isRecordOn = true;
  MDSC.user = commonService.getSessionData();

  MDSC.toggleButtonFn = toggleButtonFn;

  function toggleButtonFn(type) {
    if (type === 'camera') {
      MDSC.isCameraOn = !MDSC.isCameraOn;
      window.localStream.getVideoTracks()[0].enabled = !(window.localStream.getVideoTracks()[0].enabled);
    } else if (type === 'microphone') {
      MDSC.isMicrophoneOn = !MDSC.isMicrophoneOn;
      window.localStream.getAudioTracks()[0].enabled = !(window.localStream.getAudioTracks()[0].enabled);
    } else if (type === 'record') {
      MDSC.isRecordOn = !MDSC.isRecordOn;
    } else if (type === 'phone') {
      endCall();
    }
  }

  var constraints = window.constraints = {
    audio: true,
    video: true
  };

  init();

  function init() {
    if (mainService.peer) {
      navigator
        .mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          window.localStream = stream;
          $('#my-video').prop('src', URL.createObjectURL(stream));
        });
    } else {
      mainService.peer = new Peer(MDSC.user.id, {
        host: '/',
        port: 9000,
        path: '/api'
      });
      init();
    }
  }
}
