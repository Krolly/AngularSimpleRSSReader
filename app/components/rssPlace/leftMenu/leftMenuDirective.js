rssPlace.directive('leftMenu', function() {
    return {
        restrict: 'E',
        templateUrl: './components/rssPlace/leftMenu/leftMenu.html',
        require: '^rssPlace',
        replace: true
    }
});