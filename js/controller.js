var myApp = angular.module('myApp',[]);

myApp.controller('WorkController', ['$scope', '$http', function ($scope, $http) {

  //This is a filter for all items/////////////////////////////////
  $http.get('js/all.json').success(function(data) {
    $scope.featured = data;
  });

  $http.get('js/lay-des.json').success(function(data) {
    $scope.layout = data;
  });
  $http.get('js/log-bra.json').success(function(data) {
    $scope.logos = data;
  });
  $http.get('js/illust.json').success(function(data) {
    $scope.illustrations = data;
  });
  $http.get('js/pac-des.json').success(function(data) {
    $scope.package = data;
  });
  $http.get('js/web-dev.json').success(function(data) {
    $scope.web = data;
  });
  $http.get('js/eml-dev.json').success(function(data) {
    $scope.email = data;
  });
  $http.get('js/cre-pho.json').success(function(data) {
    $scope.photo = data;
  });
  $http.get('js/fnt-dev.json').success(function(data) {
    $scope.fonts = data;
  });



}]);
