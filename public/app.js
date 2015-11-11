angular
  .module('liveGoodies', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/main.html',
        controller: 'mainController',
        controllerAs: 'vm'
      });
    });