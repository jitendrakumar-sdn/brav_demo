// angular
//   .module('brav')
//   .controller('mainController', mainController);

// mainController.$inject = ['$scope', '$location', 'commonService', 'mainService', 'notificationService'];

// function mainController($scope, $location, commonService, mainService, notificationService) {
//   var MSC = this;


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
