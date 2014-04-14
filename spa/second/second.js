angular.module('SpaApp.second', ['SpaApp.third'])

.controller('SecondCtrl', function($scope) {
    $scope.content = 'SecondCtrl scope content variable';
})