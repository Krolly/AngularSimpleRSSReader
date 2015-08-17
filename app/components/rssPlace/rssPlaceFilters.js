rssPlace.filter('filterById', function() {
    return function(items, id) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.id === id) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});

rssPlace.filter('paginationFilter', function() {
    return function(items, start, itemsPerPage) {
        var filtered = [];

        if(items) {
            var startPosition = (start - 1) * itemsPerPage;

            for(var i = startPosition; i < startPosition + itemsPerPage; i++) {
                if (i > items.length - 1) {
                    break;
                } else {
                    filtered.push(items[i]);
                }
            }
        }

        return filtered;
    };
});

rssPlace.filter('parseDateToUnix', function() {
    return function(items) {
        var filtered = [];

        if(items) {
            for(var i = 0; i < items.length; i++) {
                var currentItem = items[i];

                if(typeof currentItem.publishedDate != 'number') {
                    var unixTime = moment(currentItem.publishedDate).unix();
                    currentItem['publishedDate'] = unixTime;
                }

                filtered.push(currentItem);
            }
        }

        return items;
    }
});

rssPlace.filter('filterNewsByName', function() {
    return function(items, searchWord) {
        var filtered = [];

        if(items && searchWord != "") {
            for(var i = 0; i < items.length; i++) {
                var currentItem = items[i];
                var title = String(currentItem.title).replace(/<[^>]+>/gm, '').toLowerCase();
                var content = String(currentItem.content).replace(/<[^>]+>/gm, '').toLowerCase();
                searchWord = searchWord.toLowerCase();

                if(title.search(searchWord) != -1 || content.search(searchWord) != -1) {
                    filtered.push(currentItem);
                }
            }
        } else {
            filtered = items;
        }

        return filtered;
    }
});