'use strict'

rssReader.factory('rssService', function($http) {
    var resource = './data/rssData.json';
    var googleSeedApiPath = '//ajax.googleapis.com/ajax/services/feed/load';
    var rssVersion = '1.0';
    var rssNum = '-1';
    var rssCallbackType = 'JSON_CALLBACK';

    var fullPathToParse = function(url) {
        var result = googleSeedApiPath;

        result += '?v=' + rssVersion;
        result += '&num=' + rssNum;
        result += '&callback=' + rssCallbackType;
        result += '&q=' + encodeURIComponent(url);

        return result;
    };

    return {
        getFeedsByUserId: function(userId, successHandler) {
            $http({method: 'GET', url: resource}).
                success(function(data, status, headers, config) {
                    successHandler(data);
                }).
                error(function(data, status, headers, config) {
                    alert(data);
                });
        },

        getParsedFeed: function(url) {
            return $http.jsonp(fullPathToParse(url));
        },

        constructNewFeed: function(title, link) {
            var currentTimestamp = new Date().getTime().toString();
            var id = this.getGroupID(currentTimestamp);

            return {
                "id": id,
                "title" : title,
                "link" : link
            };
        },

        constructNewGroup: function(groupName) {
            var id = new Date().getTime().toString();
            return {
                "title": groupName,
                "id": id,
                "feeds": []
            }
        },

        getGroupID: function(groupID) {
           return "feed-" + groupID;
        }
    };
});