(function () {
  'use strict';
  describe('AppController', function() {
    beforeEach(module('urban'));
    var $scope;
    var $httpBackend;
    var AppController;
    var ShortMessageService;
    var RedditService;
    var reddit;
    beforeEach(inject(function($rootScope, _$httpBackend_, $controller,
        _ShortMessageService_, _RedditService_, _reddit_) {
      $scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      ShortMessageService = _ShortMessageService_;
      RedditService = _RedditService_;
      reddit = _reddit_;
      AppController = $controller('AppController', {
        $scope: $scope,
        ShortMessageService: ShortMessageService,
        RedditService: RedditService,
        reddit: reddit
      });
    }));
    describe('after dispatch', function() {
      beforeEach(function() {
        AppController.subreddit = 'python';
        AppController.time = 'all';
        AppController.phoneNumber = '16518675309';
        $httpBackend.whenGET('https://www.reddit.com/r/python/top.json?t=all')
          .respond(200);
      });
      it('should expect length of errors array to be 0', function() {
        AppController.dispatch();
        $scope.$digest();
        expect(AppController.errors.length).toBe(0);
      });
      it('should expect success to be false', function() {
        AppController.dispatch();
        $scope.$digest();
        expect(AppController.success).toBe(false);
      });
    });
  });
}());
