(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursesInProgressPageCtrl', CoursesInProgressPageCtrl);

    /** @ngInject */
    function CoursesInProgressPageCtrl($scope, $state, $log,$filter, lodash, Course) {
        var vm = this;

        vm.pageSize = 10;

        vm.phases = [
            {index: 1, name: 'Reading', duration: 5, isComplete: false, isCurrent: false, state: 'talk.reading'},
            {index: 2, name: 'Questionnaire', duration: 2, isComplete: false, state: 'talk.questionnaire'},
            {index: 3, name: 'Slides', duration: 7, isComplete: false, state: 'talk.slides'},
            {index: 4, name: 'Peer Review', duration: 3, isComplete: false, state: 'talk.peer_review'},
            {index: 5, name: 'Audio', duration: 2, isComplete: false, state: 'talk.audio'},
            {index: 6, name: 'Refine', duration: 2, isComplete: false, state: 'talk.refine'},
            {index: 7, name: 'Publish', duration: 1, isComplete: false, state: 'talk.pending_approval'}
        ];

        Course.listInProgress()
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

                // vm.coursesByPhase = lodash.groupBy(vm.courses, 'phase_display');
            }, function (response, status) {
                $log.log(response);
            });

        vm.gotoPhase = function (talk) {
            var phase = vm.phases.find(function (phase) {
                return phase.index === talk.phase;
            });
            $state.go(phase.state, {id: talk.id});
        };

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
