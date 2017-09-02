(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CourseJoinCtrl', CourseJoinCtrl);

    /** @ngInject */
    function CourseJoinCtrl($scope, $state, $stateParams, $log, lodash, Course) {
        var vm = this;

        vm.course = {};
        vm.submitted = false;
        vm.pending = false;
        vm.errors = {};

        // vm.search= {
        //   submitted:false,
        //   found:false
        // };

        vm.submit = submit;
        vm.has_error = has_error;

        Course.get($stateParams.id)
            .then(function (response, status) {
                vm.course = response.data;

            }, function (response, status) {
                $log.log(response);
            });

        // $scope.$watch(function ($scope) {
        //     return vm.course !== null && vm.course.doi !== null ? vm.course.doi : null;
        // }, function (newVal, oldVal) {
        //     if (newVal !== null && newVal !== oldVal && vm.course !== null && vm.course.hasOwnProperty('doi') && vm.course.doi) {
        //         vm.search.submitted=true;
        //         Course.info(vm.course).then(function (response, status) {
        //             var info = response.data.message;
        //             vm.search.found = true;
        //
        //             vm.course.name = info.title.join(' ') + info.subtitle.join(' ');
        //             vm.course.url = info['URL'];
        //             vm.course.publisher = info['container-title'].join(' ');
        //             vm.course.type = info['type'];
        //             vm.course.authors = lodash.map(info['author'], function (author) {
        //                 return author['given'] + ' ' + author['family'];
        //             }).join(', ');
        //             vm.course.published_on = new Date(info['published-online']['date-parts'][0][0], info['published-online']['date-parts'][0][1], info['published-online']['date-parts'][0][2]);
        //             vm.course.pages = info['page'];
        //
        //         }, function (response, status) {
        //             console.log(response);
        //             vm.search.found=false;
        //
        //         }).finally(function () {
        //
        //         });
        //     }
        // });

        function has_error(field_name) {
            var field = $scope.form[field_name];
            return field && (field.$touched || vm.submitted) && field.$invalid;

        }

        function submit(isValid) {
            vm.submitted = true;
            vm.pending = true;

            if (isValid) {
                Course.add(vm.course).then(function () {
                    // $mdToast.showSimple('Course is being synced with google presentation...');
                    $state.go('courses');
                }, function (response, status) {

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
                    vm.pending = false;
                });
            }
        }
    }

})();
