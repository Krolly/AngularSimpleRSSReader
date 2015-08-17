'use strict';

var rssPlace = angular.module('rssPlace', [
    'ui.bootstrap',
    'ngAnimate',
    'toastr',
    'angularMoment'
]);

rssPlace.constant('angularMomentConfig', {
    preprocess: 'unix'
});

rssPlace.value('version', '0.1');
