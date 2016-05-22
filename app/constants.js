(function () {
  'use strict';
  angular
    .module('urban')
    .constant('reddit', {
      ADDRESS: 'https://www.reddit.com',
      TIMES: ['hour', 'day', 'week', 'month', 'year', 'all']
    })
    .constant('twilio', {
      ADDRESS: 'https://api.twilio.com/2010-04-01',
      ACCOUNT_SID: 'AC38e8f428307f959d610e116474094818',
      AUTH_TOKEN: '5846cb21790aac5ff9dfe4ff5970b02c',
      FROM: '+18449060984',
      BODY: 'Check out this jawn'
    });
}());
