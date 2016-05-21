(function () {
  'use strict';
  angular
    .module('urban')
    .controller('AppController', AppController);
  AppController.$inject = ['$log', 'smsService', 'redditService', 'reddit'];
  function AppController($log, smsService, redditService, reddit) {
    // This is the main controller for the application.
    var vm = this;
    vm.times = reddit.TIMES;
    vm.maxChild = {};
    vm.dispatch = dispatch;
    function dispatch() {
      redditService.getChildren(vm.subreddit, vm.time)
        .then(successCallback)
        .catch(errorCallback);
      function successCallback(response) {
        var maxChild = redditService.getMaxChild(response);
        vm.maxChild = maxChild;
        return maxChild;
      }
      function errorCallback(response) {
        if (response.status === -1)
          $log.error('Unknown subreddit '  + vm.subreddit);
      }
    }
  }
}());
