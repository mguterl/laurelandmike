var app = angular.module('app', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('root', {
      url: '',
      abstract: true
    })
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('rsvp', {
      url: '/rsvp',
      templateUrl: 'rsvp.html'
    })
});
