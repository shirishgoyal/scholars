/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursesProposedPageCtrl', CoursesProposedPageCtrl);

    /** @ngInject */
    function CoursesProposedPageCtrl($scope, $state, $log, $filter, lodash, Course) {
        var vm = this;

        vm.pageSize = 10;

        Course.listProposed()
            .then(function (response, status) {
                // $log.log(response.data);
                vm.courses = response.data.results.map(function(course){
                    var line = [];
                    line.push('Published by '+course.publisher);

                    if(course.published_on){
                        line.push( $filter('date')(course.published_on, 'yyyy'))
                    }

                    course.published_by_line = lodash.join(line, ', ');

                    return course;
                });
            }, function (response, status) {
                $log.log(response);
            });

        // vm.watch('pageSize', function (newValue, oldValue) {
        //     Course.list()
        //         .then(function (response, status) {
        //             // $log.log(response.data);
        //             vm.courses = response.data.results;
        //         }, function (response, status) {
        //             $log.log(response);
        //         });
        // });
    }

})();
