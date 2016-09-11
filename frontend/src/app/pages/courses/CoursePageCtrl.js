/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursePageCtrl', CoursePageCtrl);

    /** @ngInject */
    function CoursePageCtrl($scope, $state, $stateParams, $log, lodash, Auth, Course, Slide) {
        var vm = this;

        vm.user = Auth.getAccount();

        $scope.$watch(function ($scope) {
            return vm.course!=null? vm.activeSlideIndex: null;
        }, function (newVal, oldVal) {
            $log.log(newVal);

            if (newVal!=null && newVal != oldVal && vm.course!=null && vm.course.hasOwnProperty('slides') && vm.course.slides) {
                vm.activeSlide = vm.course.slides[newVal];
                vm.activeSlide.notes = vm.activeSlide.notes.split("\n").join("<br>");
            }
        });

        Course.get($stateParams.id)
            .then(function (response, status) {
                vm.course = response.data;
                vm.activeSlideIndex = 0;
            }, function (response, status) {
                $log.log(response);
            });

        vm.back = function (position) {
            vm.activeSlideIndex -= position;
        };

        vm.forward = function (position) {
            vm.activeSlideIndex += position;
        };

        vm.assign = function () {
            Slide.assign(vm.activeSlide.id, vm.course.id)
                .then(function (response) {
                    vm.activeSlide = response.data;
                    vm.course.slides[vm.activeSlideIndex] = response.data;
                });
        };

        vm.release = function () {
            Slide.release(vm.activeSlide.id, vm.course.id)
                .then(function (response) {
                    vm.activeSlide = response.data;
                    vm.course.slides[vm.activeSlideIndex] = response.data;
                });
        };

        vm.upload = function (file) {
            Slide.update(vm.activeSlide.id, vm.course.id, file)
                .then(function (response) {
                    vm.activeSlide = response.data;
                    vm.course.slides[vm.activeSlideIndex] = response.data;
                });

        };


        // vm.account = {};
        // vm.submitted = false;
        // vm.errors = {};
        //
        // vm.signin = signin;
        // vm.has_error = has_error;
        //
        // function has_error(field_name) {
        //     var field = $scope.form[field_name];
        //     return (field.$touched || vm.submitted) && field.$invalid;
        // }

        // function signin(isValid) {
        //     vm.submitted = true;
        //
        //     if (isValid) {
        //         Auth.login(vm.account).then(function () {
        //             // $mdToast.showSimple('Email with an activation link has been sent.');
        //             $state.go('dashboard');
        //         }, function (response, status) {
        //
        //             if (response.data.hasOwnProperty('non_field_errors')) {
        //                 $scope.form.$setValidity('form', false);
        //                 vm.errors['form'] = response.data.non_field_errors.join(', ');
        //             }
        //
        //             angular.forEach(response.data.errors, function (errors, field_name) {
        //                 //Field level errors
        //                 var field = $scope.form[field_name];
        //                 field.$setValidity('backend', false);
        //                 field.$dirty = true;
        //                 vm.errors[field_name] = errors.join(', ');
        //             });
        //
        //         }).finally(function () {
        //
        //         });
        //     }
        // }
    }

})();
