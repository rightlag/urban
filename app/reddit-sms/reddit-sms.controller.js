(function () {
  'use strict';
  angular
    .module('urban')
    .controller('AppController', AppController);
  AppController.$inject = ['smsService', 'redditService', 'reddit'];
  function AppController(smsService, redditService, reddit) {
    // This is the main controller for the application.
    var vm = this;
    vm.times = reddit.TIMES;
    vm.article = {};
    vm.errors = [];
    vm.success = false;
    vm.dispatch = dispatch;
    function dispatch() {
      redditService.getChildren(vm.subreddit, vm.time)
        .then(successCallback)
        .catch(errorCallback);
      function successCallback(response) {
        // The response object is an array of children (articles).
        var article = redditService.getArticleByMaxScore(response);
        vm.article = article.data;
        smsService.dispatch(vm.phoneNumber, vm.article, vm.time)
          .then(function successCallback() {
            vm.success = true;
          })
          .catch(function errorCallback(response) {
            vm.errors.push(response.data.message);
            return vm.errors;
          });
      }
      function errorCallback(response) {
        /**
         * Reddit automatically redirects the user if the subreddit is not
         * found. The purpose of this error callback is to handle the redirect
         * and inform the user that an incorrect subreddit was entered.
         */
        if (response.status === -1) {
          vm.errors.push('Invalid subreddit ' + vm.subreddit);
          return vm.errors;
        }
      }
    }
  }
}());
