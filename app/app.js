'use strict';

var rssReader = angular.module('rssReader', [
  'ngRoute',
  'rssReaderHome',
  'rssReaderHeader',
  'rssPlace'
]);

rssReader.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
      redirectTo: '/'
  });
}]);
