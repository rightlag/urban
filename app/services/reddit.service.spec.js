(function () {
  'use strict';
  describe('redditService', function() {
    beforeEach(module('urban'));
    var RedditService;
    var $httpBackend;
    var mock = {
      data: {
        data: {
          children: [
            {
              data: {
                title: 'map',
                score: 2247
              }
            },
            {
              data: {
                title: 'filter',
                score: 3443
              }
            },
            {
              data: {
                title: 'reduce',
                score: 2837
              }
            },
            {
              data: {
                title: 'lambda',
                score: 2040
              }
            }
          ]
        }
      }
    };
    beforeEach(inject(function(_redditService_, _$httpBackend_) {
      RedditService = _redditService_;
      $httpBackend = _$httpBackend_;
    }));
    describe('children articles', function() {
      beforeEach(function() {
        $httpBackend.whenGET('https://www.reddit.com/r/python/top.json?t=all')
          .respond(200, mock);
      });
      it('should contain an array of article objects', function() {
        var children = [];
        RedditService.getChildren('python', 'top')
          .then(function(children) {
            children = children;
            expect(children).toBe(mock.data.data.children);
          });
      });
      it('should return article with the highest score', function() {
        var article = RedditService.getArticleByMaxScore(mock.data.data.children);
        // This is the article with the title `filter`.
        expect(article).toBe(mock.data.data.children[1].data);
      });
    });
  });
}());
