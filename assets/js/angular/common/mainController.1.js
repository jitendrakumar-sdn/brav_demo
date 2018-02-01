// angular
//   .module('brav')
//   .controller('mainController', mainController);

// mainController.$inject = ['$scope', '$location', 'commonService', 'mainService', 'notificationService'];

// function mainController($scope, $location, commonService, mainService, notificationService) {
//   var MSC = this;

//   MSC.isHeaderView = false;
//   MSC.user;

//   $scope.activeVedioCalls;

//   $scope.placecallFn = placecallFn;
//   $scope.callPeerFn = callPeerFn;
//   $scope.endCallFn = endCallFn;
//   // $scope.sendmsgFn = sendmsgFn;

//   function init() {
//     if (MSC.user) {
//       if (!mainService.peer)
//         mainService.peer = new Peer(MSC.user.id, {
//           host: '/',
//           port: 9000,
//           path: '/api'
//         });

//       // mainService.peer.on('open', function (id) {});

//       // // Await connections from others
//       // mainService.peer.on('connection', connect);

//       // mainService.peer.on('error', function (err) {
//       //   // swal(err);
//       // });
//       // mainService.peer.on('close', function (err) {
//       //   // swal(err + ' closed');
//       // });

//       mainService.peer.on('call', function (call) {
//         swal("Do you want to accept call from " + call.peer, {
//           buttons: {
//             cancel: "Decline",
//             accept: {
//               text: "Accept",
//               value: true
//             }
//           }
//         }).then(function (res) {
//           if (res) {
//             mainService.existingCall = call;
//             call.answer(stream); // Answer the call with an A/V stream.
//             handleCall(call, call.peer);
//           }
//         });
//       });
//     } else {
//       $location.path('/');
//     }
//   }

//   function handleCall(call, id) {
//     placecall(call, id)
//   }

//   function placecallFn(call, index) {
//     if (call && index) {
//       if (!$scope.activeVedioCalls.hasOwnProperty(index)) {
//         call.on('stream', function (remoteStream) {
//           $scope.activeVedioCalls[index] = {
//             id: index,
//             vedio: URL.createObjectURL(remoteStream)
//           }
//           mainService.isInCall = true;
//           mainService.existingCall = call;
//           mainService.existingCallId = index;
//         });
//       }
//     }
//   }

//   function callPeerFn(id) {
//     if (id && !mainService.isInCall && mainService.localStream) {
//       var call = mainService.peer.call(id, mainService.localStream);
//       placecallFn(call, id);
//     } else {
//       if (!mainService.localStream)
//         notificationService.error('Your video stream is not found.. Please make sure camera is connected');
//       else
//         notificationService.info('You are already in a call');
//     }
//   }

//   function endCallFn() {
//     if (mainService.existingCall) {
//       mainService.existingCall.close();
//       mainService.isInCall = false;

//       $('#vedio' + mainService.existingCallId).parent().remove();

//       var c = mainService.peer.connect(mainService.existingCallId, {
//         label: 'drop',
//         serialization: 'none',
//         metadata: {
//           name: MSC.user.firstname + ' ' + MSC.user.lastname
//         }
//       });
//       c.on('open', function () {
//         c.send('Call disconnected');
//       });
//     }
//   }


//   function connect(c) {
//     // Handle a chat connection.
//     console.log('connect in main', c);
//   }

















//   $scope.$on('$routeChangeStart', function () {
//     if ($location.path() == '/' || $location.path() == '/register') {
//       deleteSession();
//       MSC.isHeaderView = false;
//     } else {
//       MSC.isHeaderView = true;
//       if (!MSC.user) {
//         MSC.user = commonService.getSessionData();
//         if (!MSC.user) {
//           notificationService.info('Your session has been expired. Please login')
//           $location.path('/');
//         } else init();
//       }
//     }
//     let routes = $location.path().split('/');
//     if (routes.length > 1) {
//       $scope.isMediatorPage = false;
//       $scope.isNotesPage = false;
//       $scope.isSchedulePage = false;
//       if (routes[1] === 'mediator') {
//         $scope.isMediatorPage = true;
//       } else if (routes[1] === 'schedule') {
//         $scope.isSchedulePage = true;
//       } else if (routes[1] === 'note') {
//         $scope.isNotesPage = true;
//       }
//     }
//   });

//   function deleteSession() {
//     // if (sessionStorage.getItem('bravUser')) sessionStorage.removeItem('bravUser')
//   }
// }
