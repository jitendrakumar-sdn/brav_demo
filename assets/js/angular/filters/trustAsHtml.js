angular.module('brav')
  .filter('trustAsHtml', function ($sce) {
    return function (html) {
      return $sce.trustAsHtml(html)
    }
  })
