angular
  .module('brav')
  .controller('mediatorController', mediatorController);

mediatorController.$inject = ['$scope', '$location'];

function mediatorController($scope, $location) {
  var MSC = this;

  MSC.isCameraOn = true;
  MSC.isMicrophoneOn = true;
  MSC.isRecordOn = true;

  MSC.toggleButtonFn = toggleButtonFn;

  function toggleButtonFn(type) {
    if (type === 'camera') {
      MSC.isCameraOn = !MSC.isCameraOn;
    } else if (type === 'microphone') {
      MSC.isMicrophoneOn = !MSC.isMicrophoneOn;
    } else if (type === 'phone') {
      MSC.isRecordOn = !MSC.isRecordOn;
    }
  }
}
