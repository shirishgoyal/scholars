(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursesAddCtrl', CoursesAddCtrl);

    /** @ngInject */
    function CoursesAddCtrl($scope, $state, $log, Course) {
        var vm = this;

        vm.course = {};
        vm.submitted = false;
        vm.pending = false;
        vm.errors = {};

        vm.submit = submit;
        vm.has_error = has_error;

        function has_error(field_name) {
            var field = $scope.form[field_name];
            return (field.$touched || vm.submitted) && field.$invalid;

        }

        function submit(isValid) {
            vm.submitted = true;
            vm.pending = true;

            if (isValid) {
                Course.add(vm.course).then(function () {
                    // $mdToast.showSimple('Course is being synced with google presentation...');
                    $state.go('courses');
                }, function (response, status) {

                    console.log(response);

                    if (response.data.hasOwnProperty('non_field_errors')) {
                        $scope.form.$setValidity('form', false);
                        vm.errors['form'] = response.data.non_field_errors.join(', ');
                    }

                    angular.forEach(response.data, function (errors, field_name) {
                        //Field level errors
                        var field = $scope.form[field_name];
                        field.$setValidity('backend', false);
                        field.$dirty = true;
                        vm.errors[field_name] = errors.join(', ');
                    });

                }).finally(function () {
                    vm.pending=false;
                });
            }
        }
    }

})();
