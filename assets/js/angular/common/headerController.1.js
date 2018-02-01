// angular
//   .module('brav')
//   .controller('headerController', headerController);

// headerController.$inject = ['$scope', '$location', 'userService', 'commonService'];

// function headerController($scope, $location, userService, commonService) {
//   var HSC = this;

//   HSC.onlineUser = [];
//   HSC.chats = {};
//   HSC.isChatPanelOpen = false;
//   HSC.isHeaderView = false;
//   HSC.isProfilePanelOpen = false;
//   HSC.isMediatorPage = true;

//   HSC.toggleChatPanelFn = toggleChatPanelFn;
//   HSC.toggleProfilePanelFn = toggleProfilePanelFn;
//   HSC.openChatFn = openChatFn;
//   HSC.getOnlineUserFn = getOnlineUserFn;
//   HSC.logoutFn = logoutFn;
//   HSC.sendMsgFn = sendMsgFn;
//   HSC.connect = connect;

//   getOnlineUserFn();

//   HSC.user = commonService.getSessionData();

//   function getOnlineUserFn() {
//     userService
//       .getOnlineUser()
//       .then(function (res) {
//         if (res.success && res.data.length > 0) {
//           HSC.onlineUser = res.data;
//         }
//       }, function (err) {

//       });
//   }

//   function toggleChatPanelFn() {
//     HSC.isChatPanelOpen = !HSC.isChatPanelOpen;
//   }

//   function toggleProfilePanelFn() {
//     HSC.isProfilePanelOpen = !HSC.isProfilePanelOpen;
//   }

//   function openChatFn(id, name) {
//     if (id && name && !HSC.chats.hasOwnProperty(id)) {
//       HSC.chats[id] = {
//         id: id,
//         name: name,
//         inputmsg: '',
//         chats: [],
//         isDisplayed: true
//       }
//       console.log(HSC.chats)
//       toggleChatPanelFn();
//     } else if (HSC.chats.hasOwnProperty(id)) {
//       HSC.chats[id].isDisplayed = !HSC.chats[id].isDisplayed;
//       HSC.isChatPanelOpen = false;
//     }
//   }

//   function logoutFn() {
//     userService
//       .logout(HSC.user.id)
//       .then(function (res) {
//         if (res.success) {
//           sessionStorage.removeItem('bravUser');
//           $location.path('/')
//         }
//       }, function (err) {

//       });
//   }

//   function sendMsgFn(id, msg, event) {
//     if (HSC.user) {
//       if (msg && id && (event == undefined || event.keyCode == 13)) {
//         console.log(id, msg)
//         var c = mainService.peer.connect(String(id), {
//           label: 'chat',
//           serialization: 'none',
//           metadata: {
//             message: msg,
//             name: HSC.user.name + ' ' + HSC.user.lastname
//           }
//         });
//         console.log('peer', peer)
//         console.log('connecting peer', c)
//         c.on('open', function () {
//           HSC.chats[id].chats.push({
//             from: true,
//             msg: msg
//           })
//           c.send(msg);
//         });
//       }
//     } else {
//       $location.path('/');
//     }
//   }

//   var peer;
//   if (HSC.user) {
//     console.log('HSC.user.id', HSC.user)
//     mainService.peer = new Peer(HSC.user.firstname + HSC.user.id, {
//       host: '/',
//       port: 9000,
//       path: '/api'
//     });
//     console.log(mainService.peer)
//     mainService.peer.on('open', function (id) {
//       console.log(id)
//     });

//     // Await connections from others
//     mainService.peer.on('connection', HSC.connect);

//     mainService.peer.on('error', function (err) {
//       console.log(err);
//     });
//     mainService.peer.on('close', function (err) {
//       console.log(err + ' closed');
//     });

//     mainService.peer.on('call', function (call) {
//       swal("Do you want to accept call from " + call.peer, {
//         buttons: {
//           cancel: "Decline",
//           accept: {
//             text: "Accept",
//             value: true
//           }
//         }
//       }, 'info').then(function (res) {
//         if (res) {
//           mainService.existingCall = call;
//           call.answer(stream); // Answer the call with an A/V stream.
//           handleCall(call, call.peer);
//         }
//       });
//     });
//   }


//   function connect(c) {
//     // Handle a chat connection.
//     console.log('incomming', c)
//     if (c.label === 'chat') {
//       var id = c.peer;
//       var _main = $('#chats');
//       var _li = $('<li></li>');
//       var container;
//       if ($(_main).children().find('#chat-call' + id).length == 0) {
//         container = getChatContainer(id, c.metadata.name);
//         $(_main).append($(_li).append($(container)));
//       }
//       c.on('data', function (data) {
//         var _msg = $('<p class="chat-msg text-right">' + data + '</p>');
//         $('#chat-text' + id).append(_msg)
//       });
//       c.on('close', function () {
//         swal(c.peer + ' has left the chat.');
//         $('#chat-container' + id).remove();
//         delete connectedPeers[c.peer];
//       });
//       connectedPeers[c.peer] = c;
//     }
//   }

// }
