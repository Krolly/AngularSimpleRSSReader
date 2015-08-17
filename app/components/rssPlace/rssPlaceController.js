rssPlace.controller('rssPlaceController', function($scope, $modal, $compile, $filter, rssService, toastr) {

    //Sorting groups by name
    $scope.sortGroupsReverce = false;

    //Sorting news by tile
    $scope.sortByTimeReverse = true;
    $scope.sortByTimePredicate = 'publishedDate';

    //Initial data inicialization
    rssService.getFeedsByUserId(123, function(data) {
         $scope.feedGroups = data;
    });

    //Pagination
    $scope.totalItems = $scope.parsedFeeds ? $scope.parsedFeeds.length : 0;
    $scope.itemsPerPage = 9;
    $scope.currentPage = 1;

    //Flag is full news is shown on central panel
    $scope.fullNewShowed = false;

    //Search news by name
    $scope.searchWord = "";

    $scope.updateTotalItems = function() {
        var filteredFeeds = $filter('filterNewsByName')($scope.parsedFeeds, $scope.searchWord);

        $scope.totalItems = filteredFeeds ? filteredFeeds.length : 0;
        $scope.currentPage = 1;
    };

    $scope.loadRssByUrl = function($event, url) {
        //angular.element($event.target).addClass('selected-feed');

        rssService.getParsedFeed(url).then(
            function(responce) {
                if(responce.data.responseData != null) {
                    $scope.parsedFeeds = responce.data.responseData.feed.entries;
                    rssDataReset();
                } else {
                    toastr.error('Error', 'Feed could not be loaded');
                }
            },
            function(responce) {
                alert(responce);
            });
    };

    $scope.openSubscribeModal = function (size) {
        var modalInstance = $modal.open({
            templateUrl: './components/rssPlace/subscribeModal/subscribeModal.html',
            controller: 'subscribeModalController',
            size: size,
            scope: $scope
        });

        modalInstance.result.then(function(result) {
            addNewRssFeed(result);
        }, function () {
            console.log('dismissed');
        });
    };

    $scope.sortNewsByTime = function() {

        $scope.sortByTimeReverse = !$scope.sortByTimeReverse;
    };

    $scope.openFullNews = function(feed) {
        var el = angular.element(document.getElementById("fullNews"));
        var content = getFullNewsTemplate(feed);
        content = $compile(content)($scope);

        el.empty();
        el.append(content);

        $scope.fullNewShowed = true;
    };

    $scope.openAddNewGroupModal = function (size) {
        var modalInstance = $modal.open({
            templateUrl: './components/rssPlace/addNewGroupModal/addNewGroup.html',
            controller: 'addNewGroupController',
            size: size,
            scope: $scope
        });

        modalInstance.result.then(function(result) {
            addNewGroup(result);
        }, function () {
            console.log('add new group dismissed');
        });
    };

    $scope.removeFeed = function(groupID, feedID) {
        var groups = $filter('filterById')($scope.feedGroups.groups, groupID);

        if(groups.length == 1) {
            var group = groups[0];

            for(var i = group.feeds.length; i--;) {
                if(group.feeds[i].id === feedID) {
                    group.feeds.splice(i, 1);
                }
            }
        }

        $scope.parsedFeeds = [];
        rssDataReset();
    };

    $scope.sortGroupsByName = function() {
        $scope.feedGroups.groups = $filter('orderBy')($scope.feedGroups.groups, 'title', $scope.sortGroupsReverce);
        $scope.sortGroupsReverce = !$scope.sortGroupsReverce;
    };

    $scope.backToNewsList = function() {
        $scope.fullNewShowed = false;
    };

    $scope.formatCreationDate = function(timestamp) {
        var date = new Date(timestamp * 1000);
        var dateString = date.toUTCString();

        return dateString;
    };

    $scope.getSortInputArrow = function(isReverce) {
        var content = isReverce ? "↓" : "↑";

        return content;
    };


    //=============== Util Functions ====================
    var getFullNewsTemplate = function(feed) {
        var template = "";

        template += '<a href="#" ng-click="backToNewsList()" onclick="return false;"><<< Back</a>';

        template +="<br/><br/>";
        template += feed.content;

        template +="<br/><br/>";
        template += '<a href="' + feed.link + '" target="_blank">Link to the original site</a>';

        return template;
    };

    var addNewGroup = function(addNewGroupData) {
        var newGroup = rssService.constructNewGroup(addNewGroupData.newGroupName);

        $scope.feedGroups.groups.push(newGroup);
    };

    var addNewRssFeed = function(subscribeData) {
        var newFeedEntity = rssService.constructNewFeed(subscribeData.newFeedTitle, subscribeData.newFeedPath);

        var filteredResult = $filter('filterById')($scope.feedGroups.groups, subscribeData.newFeedGroupID);

        if(filteredResult.length == 1) {
            var targetGroup = filteredResult[0];
            var targetGroupFeeds = targetGroup.feeds;

            targetGroupFeeds.push(newFeedEntity);
            targetGroup.feeds = targetGroupFeeds;
        }
    };

    var rssDataReset = function() {
        $scope.fullNewShowed = false;
        $scope.totalItems = $scope.parsedFeeds ? $scope.parsedFeeds.length : 0;
        $scope.currentPage = 1;
        $scope.searchWord = "";
    };

    var htmlToPlainText = function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
    }


});