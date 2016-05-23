(function () {
  'use strict';
  describe('UtilityService', function() {
    beforeEach(module('urban'));
    var UtilityService;
    beforeEach(inject(function(_UtilityService_) {
      UtilityService = _UtilityService_;
    }));
    describe('parse', function() {
      it('should return a string without delimiters or whitespace', function() {
        var expected = '6518675309';
        var phoneNumbers = [
          '6518675309',
          '(651) 867-5309',
          '651-867-5309'
        ];
        phoneNumbers.forEach(function(element) {
          var phoneNumber = UtilityService.parsePhoneNumber(element);
          expect(phoneNumber).toBe(expected);
        });
      });
    });
  });
}());
