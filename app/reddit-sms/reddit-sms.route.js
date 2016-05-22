(function () {
  'use strict';
  angular
    .module('urban')
    .config(config);
  config.$inject = ['$routeProvider'];
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './reddit-sms/reddit-sms.html',
        controller: 'AppController',
        controllerAs: 'vm'
      });
  }
}());
