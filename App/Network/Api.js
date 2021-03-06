'use strict';

var AppData = require('../AppData');

var BALANCING = function () {
    //var secondDomain = ['as', 'f', 't'];
    //return [Math.floor(Math.random() * 10), secondDomain[Math.floor(Math.random() * 3)]];
    return ['as'];
};

var BAOZ_TEXT_URL = 'http://i.named.cn/rest/object/';
var BAOZ_SORT_URL = 'http://i.named.cn/rest/';
var BAOZ_SEARCH_URL = 'http://name.hirube.com/search/do';
var BAOZ_IMAGE_URL = function () {
    var balancing = BALANCING();
    /** 那么社区 api 变动 **/
    return "http://" + balancing[0] + '.named.cn/f/';
    //return "http://" + balancing[0] + '.' + balancing[1] + '.' + 'baoz.cn/f/';
};

function api(api) {
    return BAOZ_TEXT_URL + encodeURIComponent(api);
};

function sortapi(api) {
    return BAOZ_SORT_URL + encodeURIComponent(api);
};

function searchapi(api) {
    return BAOZ_SEARCH_URL + api;
}

function getImageURL(source, options) {
    options || (options = {});
    options.type || (options['type'] = 'png');
    var t = options.t ? '.t' + options.t.width + 'x' + options.t.height : '';
    return BAOZ_IMAGE_URL() + source + t + '.' + options.type;
};

function getGroupClubs(groupName) {
    return api(AppData.Groups.getURL(groupName));
};

function getClubsInfo(clubName) {
    return api(AppData.Clubs.getBlockURL(clubName));
};

function getClubsBBS(clubName, start) {
    if (typeof clubName == 'string' || start <= 0) {
        return api(AppData.Clubs.getbbsURL(clubName));
    } else if (typeof clubName == 'number') {
        return sortapi(AppData.Clubs.getbbsSortURL(clubName, start)).replace(/%2F/g, '/');
    }
};

function getCommentsList(topicID, start) {
    if (start == 0) {
        return api(AppData.Comments.getCommentURL(topicID, 0));
    }
    return sortapi(AppData.Comments.getCommentURL(topicID, start)).replace(/%2F/g, '/');
};

function getSearch(query) {
    var queryString = '?';
    for (var q in query) {
        queryString += q + '=' + encodeURIComponent(query[q]) + '&';
    }
    return searchapi(queryString);
};

module.exports = {
    getGroupClubs: getGroupClubs,
    getImageURL: getImageURL,
    getClubsInfo: getClubsInfo,
    getClubsBBS: getClubsBBS,
    getCommentsList: getCommentsList,
    getSearch: getSearch
};
