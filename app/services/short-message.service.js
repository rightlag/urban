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
      // Since the MIME type of the POST request is
      // `application/x-www-form-urlencoded`, the `data` needs to be serialized
      // using the `httpParamSerializer`.
      data = $httpParamSerializer(data);
      // This is for HTTP basic authentication `btoa` base64 encodes the
      // username/password combination.
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
      function successCallback(response) { return response; }
      function errorCallback(response) {
        // If an error occurs, reject the response object.
        return $q.reject(response);
      }
    }
  }
}());
