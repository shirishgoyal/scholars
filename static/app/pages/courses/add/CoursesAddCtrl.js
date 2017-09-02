(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursesAddCtrl', CoursesAddCtrl);

    /** @ngInject */
    function CoursesAddCtrl($scope, $state, $log, $filter, lodash, Course) {
        var vm = this;

        vm.course = {};
        vm.submitted = false;
        vm.pending = false;
        vm.errors = {};

        vm.search = {
            submitted: false,
            found: false
        };

        vm.submit = submit;
        vm.hasError = hasError;

        vm.initialize = function () {
            configureCalendar();
            getCategories();
            getLanguages();
            watchDOI();
        };

        vm.initialize();

        function configureCalendar() {
            $scope.datepicker = {
                opened: false,
                format: 'yyyy-MM-dd',
                options: {
                    // formatYear: 'yyyy',
                    startingDay: 1,
                    showWeeks: false
                }
            };

            $scope.open = function () {
                $scope.datepicker.opened = true;
            };
        }

        function watchDOI() {
            $scope.$watch(function () {
                return vm.course !== null && vm.course.doi !== null ? vm.course.doi : null;
            }, function (newVal, oldVal) {
                if (newVal !== null && newVal !== oldVal
                    && vm.course !== null
                    && vm.course.hasOwnProperty('doi') && vm.course.doi) {
                    onDOI();
                }
            });
        }

        function getLanguages() {
            Course
                .listLanguages()
                .then(function (response, status) {
                    vm.languages = response.data;
                }, function (response, status) {
                    console.log(response);
                });
        }

        function getCategories() {
            Course
                .listCategories()
                .then(function (response, status) {
                    vm.categories = response.data.results;
                }, function (response, status) {
                    console.log(response);
                });
        }

        function onDOI() {
            vm.search.submitted = true;

            Course.info(vm.course).then(function (response, status) {
                var info = response.data.message;
                vm.search.found = true;

                vm.course.name = info.title.join(' ');//info.subtitle.join(' ');
                vm.course.url = info['URL'];
                vm.course.publisher = info['container-title'].join(' ');
                vm.course.type = info['type'];
                vm.course.authors = lodash.map(info['author'], function (author) {
                    return author['given'] + ' ' + author['family'];
                }).join(', ');
                // vm.course.published_on = info['published-online']['date-parts'][0][0] + '-' +  info['published-online']['date-parts'][0][1] + '-' + info['published-online']['date-parts'][0][2];
                vm.course.pages = info['page'];

            }, function (response, status) {
                // console.log(response);
                vm.search.found = false;

            }).finally(function () {

            });
        }

        function hasError(field_name) {
            var field = $scope.form[field_name];
            return field && (field.$touched || vm.submitted) && field.$invalid;

        }

        function submit(isValid) {
            vm.submitted = true;
            vm.pending = true;

            var course = angular.copy(vm.course);

            if (course.published_on) {
                course.published_on = $filter('date')(vm.course.published_on, 'yyyy-MM-dd');
            }

            if (isValid) {
                Course.add(course).then(function (response, status) {
                    // $mdToast.showSimple('Course is being synced with google presentation...');
                    var courseId = response.data.id;
                    $state.go('proposed-join', {id: courseId});
                }, function (response, status) {

                    // console.log(response);

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
