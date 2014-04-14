describe('UsersListApp', function() {
    beforeEach(module('UserListApp'));

    describe('UserResource', function() {
        var resource;

        // Setup for each test  
        beforeEach(inject(function(UserResource) {
            resource = UserResource;
        }));

        // Tests for the newly constructed resource  
        it('Contains method "toString"', function() {
            var user = new resource();
            expect(user.toString).not.toBeUndefined();
            expect(typeof user.toString).toBe('function');
        });

        // Grouping tests by method  getDefaultItem
        describe('toString', function() {
            it('Returns the user as a String', function() {
                var user = new resource();
                user.name = 'TestUser1';
                user.id = '123';

                expect(user.toString()).toBe('TestUser1 (123)')
                expect(user + '').toBe('TestUser1 (123)')
            });
        });

        // Grouping tests by method  save
        describe('save()', function() {
            it('creates a new object', function() {

                var a = new resource({
                    id: 12334,
                    name: 'TestUser2'
                });

                spyOn(a, '$save');

                a.save();

                expect(a.$save).toHaveBeenCalled();
            });

        });
    });

    describe('TableCtrl', function() {
        var ctrl, scope, resource, ctrl, httpBackend;

        beforeEach(inject(function($controller, $rootScope, UserResource, $httpBackend) {
            resource = UserResource;
            scope = $rootScope.$new();

            ctrl = function() {
                return $controller('TableCtrl', {
                    "$scope": scope,
                    "UserResource": resource
                });
            };

            httpBackend = $httpBackend;
            httpBackend.when('GET', 'users.json').respond(
                [{
                    "id": "1",
                    "name": "Test User 1"
                }, {
                    "id": "2",
                    "name": "Test User 1"
                }]
            );
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        describe('users', function() {
            it('has the list of users', function() {
                var controller = ctrl();

                expect(scope.users).not.toBeUndefined();
                expect(scope.users.length).toBe(0);
            });
        });

        describe('UserResource.query', function() {
            it('loads the list of users', function() {
                httpBackend.expectGET('users.json');

                var controller = ctrl();
                scope.addUsers();

                httpBackend.flush();
            });
        });

    });


});