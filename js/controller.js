var myApp = angular.module('myApp',[]);

myApp.controller('WorkController', ['$scope', '$http', function ($scope, $http) {
  $http.get('js/lay-des.json').success(function(data) {
    $scope.layout = data;
  });
}]);
