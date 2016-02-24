var myApp = angular.module('myApp',[]);

myApp.controller('WorkController', ['$scope', '$http', function ($scope, $http) {
  $http.get('js/lay-des.json').success(function(data) {
    $scope.layout = data;
  });
  $http.get('js/log-bra.json').success(function(data) {
    $scope.logos = data;
  });
  $http.get('js/illust.json').success(function(data) {
    $scope.illustrations = data;
  });
}]);
