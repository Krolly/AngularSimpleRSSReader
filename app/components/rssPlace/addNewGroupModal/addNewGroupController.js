rssPlace.controller('addNewGroupController', function($scope, $modalInstance) {

    $scope.addNewGroup = function (addGroupForm) {
        if(addGroupForm.$valid) {
            var result = $scope.addNewGroupModel;

            $modalInstance.close(result);
        }
    };

    $scope.cancelAddNewGroup = function () {
        $modalInstance.dismiss('cancel');
    };
});