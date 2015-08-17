'use strict';

var rssReaderHome = angular.module('rssReaderHome', ['ngRoute']);

rssReaderHome.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './views/home/home.html',
    controller: 'HomeCtrl'
  });
});

rssReaderHome.controller('HomeCtrl', function($scope) {
});