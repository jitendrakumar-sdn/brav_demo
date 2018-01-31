angular
  .module('brav')
  .controller('headerController', headerController);

headerController.$inject = ['$scope', '$location', 'userService', 'commonService'];

function headerController($scope, $location, userService, commonService) {
  var HSC = this;

  HSC.onlineUser = [];
  HSC.chats = {};
  HSC.isChatPanelOpen = false;
  HSC.isHeaderView = false;
  HSC.isProfilePanelOpen = false;

  HSC.toggleChatpanelFn = toggleChatpanelFn;
  HSC.toggleProfilePanelFn = toggleProfilePanelFn;
  HSC.openChat = openChat;
  HSC.getOnlineUser = getOnlineUser;

  getOnlineUser();

  HSC.user = commonService.getSessionData();

  function getOnlineUser(){
    userService
      .getOnlineUser()
      .then(function(res){
        if (res.success && res.data.length > 0){
          HSC.onlineUser = res.data;
        }
      }, function (err){

      });
  }

  function toggleChatpanelFn(){
    HSC.isChatPanelOpen = !HSC.isChatPanelOpen;
  }

  function openChat(id, name) {
    if (id && name && !HSC.chats.hasOwnProperty(id)){
      HSC.chats[id] = {
        id: id,
        name: name,
        inputmsg: '',
        chats: [],
        isDisplayed: true
      }
      toggleChatpanelFn();
    } else if (HSC.chats.hasOwnProperty(id)){
      HSC.chats[id].isDisplayed = !HSC.chats[id].isDisplayed;
      HSC.isChatPanelOpen = false;
    }
  }

  $scope.$on('$routeChangeStart', function () {
    if ($location.path() == '/' || $location.path() == '/register') {
      deleteSession();
      HSC.isHeaderView = false;
    } else {
      HSC.isHeaderView = true;
    }
  });

  function deleteSession() {
    if (HSC.user) sessionStorage.removeItem('bravUser')
  }
}
