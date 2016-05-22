(function () {
  'use strict';
  describe('AppController', function() {
    beforeEach(module('urban'));
    var $controller;
    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));
    describe('$scope.dispatch', function() {
      var $scope, controller;
      beforeEach(function() {
        // Set the $scope and the controller before each test to prevent repetition.
        $scope = {};
        controller = $controller('AppController', { $scope: $scope });
      });
      it('should contain more than 0 elements if invalid subreddit', function() {
        $scope.subreddit = 'spameggs';
        $scope.time = 'all';
        $scope.phoneNumber = '5555555';
        $scope.dispatch();
        expect($scope.errors.length).toBeGreaterThan(0);
      });
      /*
      it('should contain more than 0 elements if invalid phone number', function() {
        $scope.phoneNumber = '5555555';
        $scope.dispatch();
        expect($scope.errors.length).toBeGreaterThan(0);
      });
      */
    });
  });
}());
