(function () {
  'use strict';
  angular
    .module('urban')
    .constant('reddit', {
      ADDRESS: 'https://www.reddit.com',
      TIMES: ['hour', 'day', 'week', 'month', 'year', 'all']
    });
}());
