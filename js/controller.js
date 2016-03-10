"use strict";

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

// create angular controller
myApp.controller('formController', function($scope) {

	// function to submit the form after all validation has occurred
	$scope.contactForm = function() {

		// check to make sure the form is completely valid
		if ($scope.userForm.$valid) {

		}

	};

});
