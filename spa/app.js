angular.module('SpaApp', ['ngRoute', 'SpaApp.common', 'SpaApp.first', 'SpaApp.second'])

.config(function($routeProvider, $locationProvider) {

// $locationProvider
//   .html5Mode(true)
//   .hashPrefix('!');

    $routeProvider.
    when('/first', {
        templateUrl: 'first/first.html',
        controller: 'FirstCtrl'
    }).
    when('/second', {
        templateUrl: 'second/second.html',
        controller: 'SecondCtrl'
    }).
    when('/third/:id?', {
        templateUrl: 'third/third.html',
        controller: 'ThirdCtrl'
    }).
    otherwise({
        redirectTo: '/first'
    });

})
