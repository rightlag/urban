(function () {
  'use strict';
  describe('smsService', function() {
    beforeEach(module('urban'));
    var ShortMessageService;
    var $httpBackend;
    var $httpParamSerializer;
    var twilio;
    var mock = {
      to: '+16518675309',
      from: '+19402027859'
    };
    beforeEach(inject(function(_smsService_, _$httpBackend_, _$httpParamSerializer_, _twilio_) {
      ShortMessageService = _smsService_;
      $httpBackend = _$httpBackend_;
      $httpParamSerializer = _$httpParamSerializer_;
      twilio = _twilio_;
    }));
    describe('dispatch', function() {
      beforeEach(function() {
        var url = twilio.ADDRESS + '/Accounts/' +
          twilio.ACCOUNT_SID + '/Messages.json';
        var data = $httpParamSerializer({
          To: '+16518675309',
          From: twilio.FROM,
          Body: 'IGNORE THIS MESSAGE'
        });
        var authorization = twilio.ACCOUNT_SID + ':' + twilio.AUTH_TOKEN;
        var headers = {
          'Authorization': 'Basic ' + btoa(authorization),
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        $httpBackend.whenPOST(url, data, headers)
          .respond(201, mock);
      });
      it('should send a text with an article containing the highest score', function() {
        var article = {
          title: 'MERRY CHRISTMAS from Charlie the venus flytrap!!!',
          score: 2247
        };
        ShortMessageService.dispatch('6518675309', article)
          .then(function(response) {
            expect(response.data).toBe(mock);
          });
      });
    });
  });
}());
