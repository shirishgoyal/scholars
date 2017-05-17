(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses')
        .controller('CoursePageCtrl', CoursePageCtrl);

    /** @ngInject */
    function CoursePageCtrl($scope, $state, $stateParams, $log, $sce, lodash, Auth, Course, Slide) {
        var vm = this;

        vm.user = Auth.getAccount();

        $scope.$watch(function ($scope) {
            return vm.course != null ? vm.activeSlideIndex : null;
        }, function (newVal, oldVal) {
            if (newVal != null && newVal != oldVal && vm.course != null && vm.course.hasOwnProperty('slides') && vm.course.slides) {
                vm.activeSlide = vm.course.slides[newVal];
                vm.activeSlide.notes = vm.activeSlide.notes.split("\n").join("<br \>");
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

        function updateSlide(response){
            vm.activeSlide = response.data;
            vm.activeSlide.notes = vm.activeSlide.notes.split("\n").join("<br \>");
            vm.course.slides[vm.activeSlideIndex] = response.data;
        }
    }

})();
