angular.module('UserListApp', ['ngResource'])

/**
 * Main table controller
 */
.controller('TableCtrl', function($scope, UserResource, $http) {
    $scope.users = [];

    $scope.tableOptions = {
        filter: '',
        order: {
            col: 'id',
            reverse: false
        }
    };

    /**
     * Request users to the server and adds them to the list
     */
    $scope.addUsers = function() {
        // $scope.users = UserResource.query();

        UserResource.query().$promise.then(function(data) {
            $scope.users = $scope.users.concat(data);
        });
    };

    /**
     * Request users to the server and adds them to the list
     */
    $scope.addUsersHttp = function() {
        $http({
            method: 'GET',
            url: 'users.json'
        }).
        success(function(data, status, headers, config) {
            $scope.users = $scope.users.concat(data);
        }).
        error(function(data, status, headers, config) {
            console.error('ERROR downloading users');
        });

    };

    /**
     * Changes the sorting of the main table
     * @param  {String} col
     */
    $scope.orderBy = function(col) {
        if ($scope.tableOptions.order.col === col) {
            $scope.tableOptions.order.reverse = !$scope.tableOptions.order.reverse;
        } else {
            $scope.tableOptions.order.col = col;
            $scope.tableOptions.order.reverse = false;
        }
    };

    /**
     * Resets the table filter
     */
    $scope.removeFilter = function() {
        $scope.tableOptions.filter = '';
    };

    /**
     * Deletes a user
     * @param  {UserResource} user
     */
    $scope.deleteUser = function(user) {
        user.removeFrom($scope.users);

        user.delete();
    };

    /**
     * Creates an new user with default data
     */
    $scope.createUser = function() {
        data = {
            id: 666,
            name: 'leonardo'
        };

        var user = new UserResource(data);
        $scope.users.push(user);

        user.save();
    };

    window.$scope = $scope;

    /**
     * Resets the pagination when the filter changes
     */
    $scope.$watch('tableOptions.filter', function() {
        $scope.currentPage = 1;
    });
})

/**
 * Manages the Users
 */
.factory('UserResource', function($resource) {
    var resource = $resource('users.json');

    /**
     * Removes the current user fron the collection
     * @param  {Array} collection
     */
    resource.prototype.removeFrom = function(collection) {
        var index = collection.indexOf(this);
        if (index >= 0) {
            collection.splice(index, 1);
        }
    };

    /**
     * Transforms the user in a string
     * @return {String}
     */
    resource.prototype.toString = function() {
        return this.name + ' [' + this.id + ']';
    };

    /**
     * Logs information to the JS console
     * @param  {String} log
     */
    resource.prototype.log = function(log) {
        console.warn(this + ':', log);
    };

    /**
     * Deletes the current user from the server
     */
    resource.prototype.delete = function() {
        this.log('delete');
        this.$delete();
    };

    /**
     * Saves the current user on the server
     */
    resource.prototype.save = function() {
        this.log('save');
        this.$save();
    };


    return resource;
})

/**
 * Filter used for magination
 */
.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})

/**
 * Table pagination
 */
.directive('pagination', function() {
    return {
        restrict: 'E',
        templateUrl: 'pagination.html',
        controller: function($scope) {
            $scope.pageSize = 50;
            $scope.currentPage = 1;

            /**
             * Moves the current page
             * @param  {Integer} number Number of pages to move
             */
            $scope.paginate = function(number) {
                var max_pages = Math.floor($scope.users.length / $scope.pageSize);

                console.log($scope.currentPage + number, max_pages);
                if ($scope.currentPage + number < 1) {
                    $scope.currentPage = 1;
                } else if ($scope.currentPage + number > max_pages) {
                    $scope.currentPage = max_pages || 1;
                } else {
                    $scope.currentPage += number;
                }
            };
        }
    };
})

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