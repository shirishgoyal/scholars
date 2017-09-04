(function() {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CourseJoinCtrl', CourseJoinCtrl);

    /** @ngInject */
    function CourseJoinCtrl($scope, $state, $stateParams, $log, lodash, toastr, Course) {
        var vm = this;

        vm.course = {

        };
        vm.member = {
            presentation: true,
            graphics: true,
            scripting: true,
            audio: true,
            dri: true,
            been_dri: false,
            expertise: 1,
            time_commitment: 0
        };
        vm.submitted = false;
        vm.pending = false;
        vm.errors = {};

        // vm.search= {
        //   submitted:false,
        //   found:false
        // };

        vm.submit = submit;
        vm.has_error = has_error;

        function getTimezones() {
            Course
                .listTimezones()
                .then(function(response, status) {
                    vm.timezones = response.data;
                    // vm.member.timezone = vm.timezones[0];
                }, function(response, status) {});
        }

        getTimezones();

        Course.get($stateParams.id)
            .then(function(response, status) {
                vm.course = response.data;

            }, function(response, status) {
                $log.log(response);
            });


        function has_error(field_name) {
            if ($scope.form && $scope.form.hasOwnProperty(field_name)) {
                var field = $scope.form[field_name];
                return field && (field.$touched || vm.submitted) && field.$invalid;
            } else {
                return false;
            }
        }

        function submit(isValid) {
            vm.submitted = true;
            vm.pending = true;

            if (!(vm.member.presentation || vm.member.graphics || vm.member.scripting || vm.member.audio)) {
                isValid = false;
                vm.pending = false;

                $scope.form.role.$setValidity("required", false);
            } else {
                $scope.form.role.$setValidity("required", true);
            }

            if (isValid) {
                Course.join(vm.course.id, vm.member).then(function() {
                    // go to state based on state of course
                    $state.go('proposed');
                }, function(response, status) {
                    if (response.data.hasOwnProperty('non_field_errors')) {
                        $scope.form.$setValidity('form', false);
                        vm.errors['form'] = response.data.non_field_errors.join(', ');
                        toastr.error(vm.errors['form'], 'Failed');

                    }

                    angular.forEach(response.data, function(errors, field_name) {
                        //Field level errors
                        // console.log(field_name);

                        var field = $scope.form[field_name];

                        if (field) {
                            field.$setValidity('backend', false);
                            field.$dirty = true;
                        }

                        vm.errors[field_name] = errors.join(', ');
                    });

                }).finally(function() {
                    vm.pending = false;
                });
            }
        }
    }

})();