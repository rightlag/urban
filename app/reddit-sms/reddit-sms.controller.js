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
      function successCallback(children) {
        var article = redditService.getArticleByMaxScore(children);
        vm.article = article;
        smsService.dispatch(vm.phoneNumber, article, vm.time)
          .then(function successCallback() { vm.success = true; })
          .catch(function errorCallback(response) {
            vm.errors.push(response.data.message);
          });
      }
      function errorCallback(response) {
        vm.errors.push('Invalid subreddit ' + vm.subreddit);
      }
    }
  }
}());
