(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursesPublishedPageCtrl', CoursesPublishedPageCtrl);

    /** @ngInject */
    function CoursesPublishedPageCtrl($scope, $state, $log, lodash, Course) {
        var vm = this;

        vm.pageSize = 10;

        Course.listPublished()
            .then(function (response, status) {
                // $log.log(response.data);
                vm.courses = response.data.results;
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
