(function () {
  'use strict';
  angular
    .module('urban')
    .service('smsService', smsService);
  smsService.$inject = ['redditService'];
  function smsService(redditService) {
    // Dispatch SMS messages.
    this.dispatch = function(phoneNumber, maxChild) {
      // Dispatch a text message containing the Reddit post with the highest
      // votes.
    };
  }
}());
