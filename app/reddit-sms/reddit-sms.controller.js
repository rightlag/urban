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
    // `dispatch` receives a subreddit, time, and phone number to use the Twilio
    // HTTP/2 API to send the article with the highest score based on the time
    // that is entered via the user.
    function dispatch() {
      redditService.getChildren(vm.subreddit, vm.time)
        .then(successCallback)
        .catch(errorCallback);
      function successCallback(children) {
        var article = redditService.getArticleByMaxScore(children);
        vm.article = article;
        smsService.dispatch(vm.phoneNumber, article)
          .then(function() { vm.success = true; })
          .catch(function(response) { vm.errors.push(response.data.message); });
      }
      function errorCallback(response) {
        vm.errors.push(vm.subreddit + ' not found');
      }
    }
  }
}());
