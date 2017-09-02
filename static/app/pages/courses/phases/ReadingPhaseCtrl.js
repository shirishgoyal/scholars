(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('ReadingPhaseCtrl', ReadingPhaseCtrl);

    /** @ngInject */
    function ReadingPhaseCtrl($scope, $state, $stateParams, $log, $sce, lodash, gTemplates, Auth, Course, Slide) {
        var vm = this;

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        vm.phases = [
            {name: 'Reading', duration: 5, isComplete: false, isCurrent: false, state: 'talk.reading'},
            {name: 'Questionnaire', duration: 2, isComplete: false, state: 'talk.questionnaire'},
            {name: 'Slides', duration: 7, isComplete: false, state: 'talk.slides'},
            {name: 'Peer Review', duration: 3, isComplete: false, state: 'talk.peer_review'},
            {name: 'Audio', duration: 2, isComplete: false, state: 'talk.audio'},
            {name: 'Refine', duration: 2, isComplete: false, state: 'talk.refine'},
            {name: 'Publish', duration: 1, isComplete: false, state: 'talk.pending_approval'}
        ];

        var currentPhase = lodash
            .find(vm.phases, function(phase){
            return phase.state === $state.current.name;
        });
        if(currentPhase) currentPhase.isCurrent = true;

        vm.user = Auth.getAccount();

        Course.get($stateParams.id)
            .then(function (response, status) {
                vm.course = response.data;

                vm.course.pdf_url = 'https://docs.google.com/gview?url=' + vm.course.pdf + '&embedded=true';
                vm.course.questionnaire_url = 'https://drive.google.com/file/d/' + vm.course.qid + '/preview?embedded=true';
                vm.course.best_practices_url = 'https://drive.google.com/open?id='+gTemplates.BEST_PRACTICES_TEMPLATE;
                vm.course.getting_started_url = 'https://drive.google.com/open?id='+gTemplates.WORKFLOW_TEMPLATE;
                vm.course.slack_url = 'slack://channel?id=<CHANNEL-ID>&team=<TEAM-ID>';

                vm.activeSlideIndex = 0;

                // $scope.$watch(function ($scope) {
                //     return vm.course != null ? vm.activeSlideIndex : null;
                // }, function (newVal, oldVal) {
                //     if (newVal != null && newVal != oldVal && vm.course != null && vm.course.hasOwnProperty('slides') && vm.course.slides) {
                //         vm.activeSlide = vm.course.slides[newVal];
                //
                //         if (vm.activeSlide.hasOwnProperty('notes') && vm.activeSlide.notes) {
                //             vm.activeSlide.notes = vm.activeSlide.notes.split("\n").join("<br \>");
                //         }
                //     }
                // });

            }, function (response, status) {
                $log.log(response);
            });



        vm.back = function (position) {
            if ((vm.activeSlideIndex - position) <= 0) {
                vm.activeSlideIndex = 0;
            } else {
                vm.activeSlideIndex -= position;
            }
        };

        vm.forward = function (position) {
            if ((vm.activeSlideIndex + position) >= (vm.course.slides.length - 1)) {
                vm.activeSlideIndex = vm.course.slides.length - 1;
            } else {
                vm.activeSlideIndex += position;
            }
        };

        vm.assign = function () {
            Slide.assign(vm.activeSlide.id, vm.course.id)
                .then(function (response) {
                    updateSlide(response);
                });
        };

        vm.release = function () {
            Slide.release(vm.activeSlide.id, vm.course.id)
                .then(function (response) {
                    updateSlide(response);
                });
        };

        vm.approve = function () {
            Slide.approve(vm.activeSlide.id, vm.course.id)
                .then(function (response) {
                    updateSlide(response);
                });
        };

        vm.reject = function () {
            Slide.reject(vm.activeSlide.id, vm.course.id)
                .then(function (response) {
                    updateSlide(response);
                });
        };

        function blobToFile(blob, fileName) {
            //A Blob() is almost a File() - it's just missing the two properties below which we will add
            blob.lastModifiedDate = new Date();
            blob.name = fileName;
            return blob;
        }

        vm.updateAudio = function (recorder) {
            vm.audio = blobToFile(recorder.audioModel, vm.activeSlideIndex + ".mp3");
        };

        vm.submit = function () {
            vm.upload(vm.audio);
        };

        vm.upload = function (file) {
            Slide.update(vm.activeSlide.id, vm.course.id, file)
                .then(function (response) {
                    updateSlide(response);
                });

        };

        function updateSlide(response) {
            vm.activeSlide = response.data;
            if (vm.activeSlide.hasOwnProperty('notes') && vm.activeSlide.notes) {
                vm.activeSlide.notes = vm.activeSlide.notes.split("\n").join("<br \>");
            }
            vm.course.slides[vm.activeSlideIndex] = response.data;
        }
    }

})();
