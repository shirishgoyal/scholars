/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.auth')
        .controller('LoginPageCtrl', LoginPageCtrl);

    /** @ngInject */
    function LoginPageCtrl($scope, $location, $state, $log, Auth, toastr) {
        var vm = this;

        vm.account = {};
        vm.submitted = false;
        vm.errors = {};
        vm.isAuthenticated = Auth.isAuthenticated();

        vm.signin = signin;


        function signin(isValid) {
            vm.submitted = true;

            // if (isValid) {
                Auth.login().then(function (response) {
                    $state.go('in_progress');
                }, function (error) {

                    toastr.error('Authentication failed!', 'Error');

                }).finally(function () {

                });
            // }
        }

        // vm.has_error = has_error;
        //
        // function has_error(field_name) {
        //     var field = $scope.form[field_name];
        //     return (field.$touched || vm.submitted) && field.$invalid;
        // }
    }

})();
