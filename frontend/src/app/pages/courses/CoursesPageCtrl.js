/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursesPageCtrl', CoursesPageCtrl);

    /** @ngInject */
    function CoursesPageCtrl($scope, $state, $log, lodash, Course) {
        var vm = this;
        
        vm.pageSize = 10;

        Course.list()
            .then(function(response, status){
                $log.log(response.data);
                vm.courses = response.data.results;
            }, function(response, status){
                $log.log(response);
            });
    }

})();
