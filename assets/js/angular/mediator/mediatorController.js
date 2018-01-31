angular
  .module('brav')
  .controller('mediatorController', mediatorController);

mediatorController.$inject = ['$scope', '$location', 'notificationService', 'commonService'];

function mediatorController($scope, $location, notificationService, commonService) {
  var MSC = this;

  MSC.activeVedioCalls;
  MSC.isCameraOn = true;
  MSC.isInCall = false;
  MSC.isMicrophoneOn = true;
  MSC.isRecordOn = true;
  MSC.user = commonService.getSessionData();

  MSC.toggleButtonFn = toggleButtonFn;

  function toggleButtonFn(type) {
    if (type === 'camera') {
      MSC.isCameraOn = !MSC.isCameraOn;
      window.localStream.getVideoTracks()[0].enabled = !(window.localStream.getVideoTracks()[0].enabled);
    } else if (type === 'microphone') {
      MSC.isMicrophoneOn = !MSC.isMicrophoneOn;
      window.localStream.getAudioTracks()[0].enabled = !(window.localStream.getAudioTracks()[0].enabled);
    } else if (type === 'record') {
      MSC.isRecordOn = !MSC.isRecordOn;
    } else if (type === 'phone') {
      endCall();
    }
  }

  let peer;

  if(MSC.user){
    peer = new Peer(MSC.user.id, {
      host: '/',
      port: 9000,
      path: '/api'
    });
  }else{
    $location.path('/');    
  }

  function handleCall(call, id) {
    placecall(call, id)
  }


  function placecall(call, index) {
    if(call && index){
      if (!MSC.activeVedioCalls.hasOwnProperty(index)) {
        call.on('stream', function (remoteStream) {
          MSC.activeVedioCalls[index] = {
            id: index,
            vedio: URL.createObjectURL(remoteStream)
          }
          MSC.isInCall = true;
          window.existingCall = call;
          window.existingCallId = index;
        });
      }
    }
  }

  function callPeer(id) {
    var call = peer.call(id, window.localStream);
    placecall(call, id);
  }

  function endCall() {
    if (MSC.user) {
      if (window.existingCall) {
        window.existingCall.close();
        MSC.isInCall = false;
        $('#vedio' + window.existingCallId).parent().remove();
        var c = peer.connect(window.existingCallId, {
          label: 'drop',
          serialization: 'none',
          metadata: {
            name: MSC.user.firstname + ' ' + MSC.user.lastname
          }
        });
        c.on('open', function () {
          c.send('Call disconnected');
        });
      }
    } else {
      notificationService.info('Your session has been expired. Please login')
      window.location = '/';
    }
  }

  var constraints = window.constraints = {
    audio: true,
    video: true
  };

  if (peer){
    navigator
      .mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        window.localStream = stream;
        $('#my-video').prop('src', URL.createObjectURL(stream));
        peer.on('call', function (call) {
          swal("Do you want to accept call from " + call.peer, {
            buttons: {
              cancel: "Decline",
              accept: {
                text: "Accept",
                value: true,
              }
            }
          }).then(function (res) {
            if (res) {
              window.existingCall = call;
              call.answer(stream); // Answer the call with an A/V stream.
              handleCall(call, call.peer);
            }
          });
        });
      });
    }
}
