angular.module('SpaApp.common', [])

/**
 * Displays indented and syntax highlighted code
 */
.directive('prettyprint', [

    function() {
        return {
            restrict: 'C',
            link: function(scope, iElement, iAttrs) {
                prettyPrint();
            }
        };
    }
])

/**
 * Sidebar navigation
 */
.directive('sidebar',
    function($location) {
        return {
            restrict: 'E',
            templateUrl: 'common/sidebar.html',
            controller: function($scope, $location) {
                $scope.isActive = function(path) {
                    if ($location.path() === path) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        };
    }
)

/**
 * Top navigation
 */
.controller('TopNavCtrl',
    function($scope, $location) {
        $scope.isActive = function(path) {
            if ($location.absUrl().match(path)) {
                return true;
            } else {
                return false;
            }
        };
    }
)