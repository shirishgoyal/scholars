/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.auth')
        .controller('LoginPageCtrl', LoginPageCtrl);

    /** @ngInject */
    function LoginPageCtrl($scope, $state, $log, Auth) {
        var vm = this;

        vm.account = {};
        vm.submitted = false;
        vm.errors = {};

        vm.signin = signin;
        vm.has_error = has_error;

        function has_error(field_name) {
            var field = $scope.form[field_name];
            return (field.$touched || vm.submitted) && field.$invalid;
        }

        function signin(isValid) {
            vm.submitted = true;

            if (isValid) {
                Auth.login(vm.account).then(function () {
                    // $mdToast.showSimple('Email with an activation link has been sent.');
                    $state.go('dashboard');
                }, function (response, status) {

                    if (response.data.hasOwnProperty('non_field_errors')) {
                        $scope.form.$setValidity('form', false);
                        vm.errors['form'] = response.data.non_field_errors.join(', ');
                    }

                    angular.forEach(response.data.errors, function (errors, field_name) {
                        //Field level errors
                        var field = $scope.form[field_name];
                        field.$setValidity('backend', false);
                        field.$dirty = true;
                        vm.errors[field_name] = errors.join(', ');
                    });

                }).finally(function () {

                });
            }
        }
    }

})();
