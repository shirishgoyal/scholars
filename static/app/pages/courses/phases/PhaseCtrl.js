(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('PhaseCtrl', PhaseCtrl);

    /** @ngInject */
    function PhaseCtrl($scope, $state, $stateParams, $log, $sce, lodash, gTemplates, Auth, Course, Slide, course) {
        var vm = this;

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        vm.phases = [
            {
                index: 1,
                name: 'Reading',
                duration: 5,
                cumDuration: 5,
                isComplete: false,
                isCurrent: false,
                state: 'talk.reading',
                prevCompletionDate: 'in_progress_at',
                currCompletionDate: 'reading_at'
            },
            {
                index: 2,
                name: 'Questionnaire',
                duration: 2,
                cumDuration: 7,
                isComplete: false,
                state: 'talk.questionnaire',
                prevCompletionDate: 'reading_at',
                currCompletionDate: 'discussion_at'
            },
            {
                index: 3,
                name: 'Slides',
                duration: 7,
                cumDuration: 14,
                isComplete: false,
                state: 'talk.slides',
                prevCompletionDate: 'discussion_at',
                currCompletionDate: 'slides_at'
            },
            {
                index: 4,
                name: 'Peer Review',
                duration: 3,
                cumDuration: 17,
                isComplete: false,
                state: 'talk.peer_review',
                prevCompletionDate: 'slides_at',
                currCompletionDate: 'peer_review_at',
                reviewStage:1
            },
            {
                index: 5,
                name: 'Audio',
                duration: 2,
                cumDuration: 19,
                isComplete: false,
                state: 'talk.audio',
                prevCompletionDate: 'peer_review_at',
                currCompletionDate: 'audio_at'
            },
            {
                index: 6,
                name: 'Refine',
                duration: 2,
                cumDuration: 21,
                isComplete: false,
                state: 'talk.refine',
                prevCompletionDate: 'audio_at',
                currCompletionDate: 'refine_at',
                reviewStage:2
            },
            {
                index: 7,
                name: 'Publish',
                duration: 1,
                cumDuration: 22,
                isComplete: false,
                state: 'talk.pending_approval',
                prevCompletionDate: 'refine_at',
                currCompletionDate: 'pending_approval_at'
            }
        ];

        var currentPhase = lodash
            .find(vm.phases, function (phase) {
                return phase.state === $state.current.name;
            });
        if (currentPhase) currentPhase.isCurrent = true;
        vm.currentPhase = currentPhase;

        vm.course = course;

        vm.course.pdf_url = 'https://docs.google.com/gview?url=' + vm.course.pdf + '&embedded=true';
        vm.course.questionnaire_url = 'http://docs.google.com/document/d/' + vm.course.qid + '/edit?embedded=true';
        vm.course.best_practices_url = 'https://drive.google.com/open?id=' + gTemplates.BEST_PRACTICES_TEMPLATE;
        vm.course.getting_started_url = 'https://drive.google.com/open?id=' + gTemplates.WORKFLOW_TEMPLATE;
        vm.course.presentation_url = 'https://docs.google.com/presentation/d/' + vm.course.gid + '/preview?start=false&loop=false';
        vm.course.slack_url = 'slack://channel?id=' + vm.course.cid + '&team=' + gTemplates.SLACK_TEAM_ID;

        vm.review = {
            feedback: null,
            stage:vm.currentPhase.reviewStage
        };


        // calculate time deadlines
        lodash.map(vm.phases, function (phase) {
            var expectedPhaseAt = moment(vm.course['in_progress_at']).days(phase['cumDuration']);

            if (vm.course[phase['currCompletionDate']]) {
                phase.status = "completed " + moment().from(vm.course[phase['prevCompletionDate']]);
                phase.class = "text-success";
            } else {
                phase.status = "due " + moment(expectedPhaseAt).fromNow();
                if (moment(expectedPhaseAt).diff(moment()) > 0) {
                    phase.class = "text-warning";
                } else {
                    phase.class = "text-danger";
                }
            }
        });

        vm.canPrevious = currentPhase.name !== 'Reading';
        vm.canNext = currentPhase.name !== 'Publish';

        $scope.$watch(function ($scope) {
            return vm.course !== null ? vm.activeSlideIndex : null;
        }, function (newVal, oldVal) {
            if (newVal !== null && newVal !== oldVal && vm.course !== null && vm.course.hasOwnProperty('slides') && vm.course.slides) {
                vm.activeSlide = vm.course.slides[newVal];
                vm.activeSlide.notes = vm.activeSlide.notes.split("\n").join("<br \>");
            }
        });

        vm.activeSlideIndex = 0;
        vm.activeSlide = vm.course.slides[vm.activeSlideIndex];
        vm.activeSlide.notes = vm.activeSlide.notes.split("\n").join("<br \>");

        Auth.getAccount().then(function (response) {
            vm.user = response.data;

            vm.is_dri = lodash.filter(vm.course.members, function (member) {
                return member.member === vm.user.id && member.is_dri;
            }).length > 0;

        });

        vm.gotoPhase = function (talk) {
            var phase = vm.phases.find(function (phase) {
                return phase.index === talk.phase;
            });
            $state.go(phase.state, {id: talk.id});
        };

        vm.movePrevious = function () {
            Course.rejectPhase(vm.course.id, vm.course.phase)
                .then(function (response) {
                    vm.gotoPhase(response.data)
                });
        };

        vm.moveNext = function () {
            Course.approvePhase(vm.course.id, vm.course.phase)
                .then(function (response) {
                    vm.gotoPhase(response.data)
                });
        };


        // ============================================================================================================
        // audio interface functions
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

        vm.submitFeedback = function () {
            Slide.submitFeedback(vm.activeSlide.id, vm.review)
                .then(function (response) {
                    vm.activeSlide.reviews.push(response.data)
                });
        };

        vm.toggleFeedback = function(review){
            Slide.updateFeedbackStatus(review.id, review.status)
                .then(function (response) {

                });
        }
    }

})();
