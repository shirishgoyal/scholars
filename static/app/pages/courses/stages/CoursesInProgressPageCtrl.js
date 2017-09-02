/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursesInProgressPageCtrl', CoursesInProgressPageCtrl);

    /** @ngInject */
    function CoursesInProgressPageCtrl($scope, $state, $log, lodash, Course) {
        var vm = this;

        vm.pageSize = 10;

        Course.listInProgress()
            .then(function (response, status) {
                // $log.log(response.data);
                vm.courses = response.data.results;
                vm.coursesByPhase = lodash.groupBy(vm.courses, 'phase');
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
