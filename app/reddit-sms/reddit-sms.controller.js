(function () {
  'use strict';
  angular
    .module('urban')
    .controller('AppController', AppController);
  AppController.$inject = [
    'ShortMessageService',
    'RedditService',
    'UtilityService',
    'reddit'
  ];
  function AppController(ShortMessageService, RedditService, UtilityService,
      reddit) {
    // This is the main controller for the application.
    var vm = this;
    vm.times = reddit.TIMES;
    vm.article = {};
    vm.errors = [];
    vm.success = false;
    vm.dispatch = dispatch;
    // `dispatch` receives a subreddit, time, and phone number to use the Twilio
    // HTTP API to send the article with the highest score based on the time
    // that is entered via the user.
    function dispatch() {
      vm.errors = [];
      vm.success = false;
      var phoneNumber = UtilityService.parsePhoneNumber(vm.phoneNumber);
      RedditService.getChildren(vm.subreddit, vm.time)
        .then(successCallback)
        .catch(errorCallback);
      function successCallback(children) {
        // Return the article with the highest score.
        var article = RedditService.getArticleByMaxScore(children);
        vm.article = article;
        // Send the article with the highest score to the phone number provided
        // by the user.
        ShortMessageService.dispatch(phoneNumber, article)
          .then(function() { vm.success = true; })
          .catch(function(response) { vm.errors.push(response.data.message); });
      }
      function errorCallback(response) {
        // The subreddit was not found.
        vm.errors.push(vm.subreddit + ' not found');
      }
    }
  }
}());
