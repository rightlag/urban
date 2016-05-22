(function () {
  'use strict';
  angular
    .module('urban')
    .factory('redditService', redditService);
  redditService.$inject = ['$http', '$q', 'reddit'];
  function redditService($http, $q, reddit) {
    // Functions to retrieve postings from Reddit.
    return {
      getChildren: getChildren,
      getArticleByMaxScore: getArticleByMaxScore
    };
    function getChildren(subreddit, time) {
      // Get Reddit postings via time.
      var url = reddit.ADDRESS + '/r/' + subreddit + '/top.json';
      // `t` represents the time: (hour, day, week, month, year, all).
      var config = {
        params: {
          t: time
        }
      };
      return $http.get(url, config)
        .then(successCallback)
        .catch(errorCallback);
      function successCallback(response) {
        // Return the children of the response.
        return response.data.data.children;
      }
      function errorCallback(response) {
        return $q.reject(response);
      }
    }
    function getArticleByMaxScore(children) {
      /**
       * Given an array of postings, return the posting containing the highest
       * vote count.
       */
      var hasChildren = children.length > 0;
      if (!hasChildren)
        return {};
      var child = {
        max: 0,
        index: -1
      };
      children.forEach(function(element, index) {
        var score = element.data.score;
        if (score > child.max) {
          child.max = score;
          child.index = index;
        }
      });
      return children[child.index].data;
    }
  }
}());
