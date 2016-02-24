var myApp = angular.module('myApp',[]);

myApp.controller('WorkController', function WorkController($scope, $http) {
  $http.get('js/lay-des.json').success(function(data) {
    $scope.layout = data;
  });
});
