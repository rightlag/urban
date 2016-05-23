(function () {
  'use strict';
  angular
    .module('urban')
    .service('UtilityService', UtilityService);
  function UtilityService() {
    return {
      parsePhoneNumber: parsePhoneNumber
    };
    function parsePhoneNumber(phoneNumber) {
      // Parse a phone number if it includes spaces, hyphens, parenthesis, etc.
      var re = /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/;
      var digits = phoneNumber.replace(/\D/g, '');
      return (digits.match(re)) ? digits : null;
    }
  }
}());
