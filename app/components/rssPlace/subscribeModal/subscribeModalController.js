rssPlace.controller('subscribeModalController', function($scope, $modalInstance) {

    $scope.rssAddSubscribe = function (rssFeedForm) {
        if(rssFeedForm.$valid) {
            var result = $scope.subscribeModel;

            $modalInstance.close(result);
        }
    };

    $scope.rssCancelSubscribe = function () {
        $modalInstance.dismiss('cancel');
    };
});