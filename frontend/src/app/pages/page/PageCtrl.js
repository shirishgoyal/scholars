/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.page')
        .controller('PageCtrl', PageCtrl);

    /** @ngInject */
    function PageCtrl($scope, $state, $log, Auth) {
        var vm = this;

        vm.account = {};
        vm.submitted = false;
        vm.errors = {};

        vm.has_error = has_error;

        function has_error(field_name) {
            var field = $scope.form[field_name];
            return (field.$touched || vm.submitted) && field.$invalid;
        }


    }

})();
