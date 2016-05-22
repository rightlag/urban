(function () {
  'use strict';
  angular
    .module('urban')
    .factory('smsService', smsService);
  smsService.$inject = [
    '$http',
    '$q',
    '$httpParamSerializer',
    'redditService',
    'twilio'
  ];
  function smsService($http, $q, $httpParamSerializer, redditService, twilio) {
    // A service for dispatching text messages via Twilio.
    return {
      dispatch: dispatch
    };
    function dispatch(phoneNumber, article) {
      /**
       * Dispatch a text message of the posting containing the highest vote
       * count.
       */
      var url = twilio.ADDRESS + '/Accounts/' +
        twilio.ACCOUNT_SID + '/Messages.json';
      var body = twilio.BODY + ' ' + article.url;
      var data = {
        To: '+1' + phoneNumber,
        From: twilio.FROM,
        Body: body
      };
      if (article.thumbnail !== '')
        data.MediaUrl = article.thumbnail;
      data = $httpParamSerializer(data);
      // This is for HTTP basic authentication.
      var authorization = twilio.ACCOUNT_SID + ':' + twilio.AUTH_TOKEN;
      var config = {
        headers: {
          'Authorization': 'Basic ' + btoa(authorization),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      return $http.post(url, data, config)
        .then(successCallback)
        .catch(errorCallback);
      function successCallback() { }
      function errorCallback(response) {
        return $q.reject(response);
      }
    }
  }
}());
