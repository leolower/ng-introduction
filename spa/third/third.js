angular.module('SpaApp.third', [])

.controller('ThirdCtrl', function($scope, $routeParams) {
    $scope.paramId = $routeParams.id || 'no param';
    $scope.content = 'ThirdCtrl scope content variable';
})