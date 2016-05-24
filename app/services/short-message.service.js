(function () {
  'use strict';
  angular
    .module('urban')
    .factory('ShortMessageService', ShortMessageService);
  ShortMessageService.$inject = [
    '$http',
    '$q',
    '$httpParamSerializer',
    'twilio'
  ];
  function ShortMessageService($http, $q, $httpParamSerializer, twilio) {
    // A service for dispatching text messages via Twilio.
    return {
      dispatch: dispatch
    };
    function dispatch(phoneNumber, article) {
      // Dispatch a text message of the posting containing the highest vote
      // count.
      var url = twilio.ADDRESS + '/messages';
      var body = twilio.BODY + ' ' + article.url;
      var data = {
        To: '+1' + phoneNumber,
        Body: body
      };
      if (article.thumbnail !== '')
        data.MediaUrl = article.thumbnail;
      return $http.post(url, data)
        .then(successCallback)
        .catch(errorCallback);
      function successCallback(response) { return response; }
      function errorCallback(response) {
        // If an error occurs, reject the response object.
        return $q.reject(response);
      }
    }
  }
}());
