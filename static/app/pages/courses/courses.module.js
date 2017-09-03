/**
 * @author shirishgoyal
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.courses', [
            'BlurAdmin.services'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        var getCourseState = function(status, phase) {
            // STATUS = Choices(
            //     (0, 'proposed', 'Proposed'),
            //     (1, 'in_progress', 'In Progress'),
            //     (2, 'published', 'Published')
            // )
            //
            // PHASE = Choices(
            //     (0, 'onboarding', 'Onboarding'),
            //     (1, 'reading', 'Reading'),
            //     (2, 'discussion', 'Discussion'),
            //     (3, 'slides', 'Slides'),
            //     (4, 'peer_review', 'Peer Review'),
            //     (5, 'audio', 'Audio'),
            //     (6, 'refine', 'Refinement'),
            //     (7, 'pending_approval', 'Pending Approval'),
            // )

            return function($q, $state, $stateParams, Course) {
                var deferred = $q.defer();
                Course.get($stateParams.id)
                    .then(function(response) {
                        var course = response.data;
                        if (course.status === status && course.phase === phase) {
                            deferred.resolve(course);
                        } else {
                            $state.go('proposed');
                            deferred.reject('talk is not ready yet!');
                        }
                    }, function(response, status) {
                        deferred.reject('failed to fetch talk');
                    });

                return deferred.promise;
            }
        };

        $stateProvider

            .state('talk', {
                url: '/talks',
                abstract: true,
                authenticate: true,
                title: 'Research Talk',
                templateUrl: 'static/app/pages/courses/phases/base.html'
            })
            .state('talk.reading', {
                url: '/:id/reading',
                templateUrl: 'static/app/pages/courses/phases/reading.html',
                controller: 'PhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk',
                resolve: {
                    course: ['$q', '$state', '$stateParams', 'Course', getCourseState(1, 1)]
                }
            })
            .state('talk.questionnaire', {
                url: '/:id/questionnaire',
                templateUrl: 'static/app/pages/courses/phases/questionnaire.html',
                controller: 'PhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk',
                resolve: {
                    course: ['$q', '$state', '$stateParams', 'Course', getCourseState(1, 2)]
                }
            })
            .state('talk.slides', {
                url: '/:id/slides',
                templateUrl: 'static/app/pages/courses/phases/slides.html',
                controller: 'PhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk',
                resolve: {
                    course: ['$q', '$state', '$stateParams', 'Course', getCourseState(1, 3)]
                }
            })
            .state('talk.peer_review', {
                url: '/:id/peer_review',
                templateUrl: 'static/app/pages/courses/phases/peer-review.html',
                controller: 'PhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk',
                resolve: {
                    course: ['$q', '$state', '$stateParams', 'Course', getCourseState(1, 4)]
                }
            })
            .state('talk.audio', {
                url: '/:id/audio',
                templateUrl: 'static/app/pages/courses/phases/audio.html',
                controller: 'PhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk',
                resolve: {
                    course: ['$q', '$state', '$stateParams', 'Course', getCourseState(1, 5)]
                }
            })
            .state('talk.refine', {
                url: '/:id/refine',
                templateUrl: 'static/app/pages/courses/phases/refine.html',
                controller: 'PhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk',
                resolve: {
                    course: ['$q', '$state', '$stateParams', 'Course', getCourseState(1, 6)]
                }
            })
            .state('talk.pending_approval', {
                url: '/:id/pending_approval',
                templateUrl: 'static/app/pages/courses/phases/approval.html',
                controller: 'PhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk',
                resolve: {
                    course: ['$q', '$state', '$stateParams', 'Course', getCourseState(1, 7)]
                }
            })
            .state('in_progress', {
                url: '/talks/in-progress',
                templateUrl: 'static/app/pages/courses/stages/in_progress.html',
                controller: 'CoursesInProgressPageCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Talks in progress',
                sidebarMeta: {
                    icon: 'ion-ios-paper',
                    order: 10
                }
            })
            .state('proposed', {
                url: '/talks/proposed',
                templateUrl: 'static/app/pages/courses/stages/proposed.html',
                controller: 'CoursesProposedPageCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Proposed Talks',
                sidebarMeta: {
                    icon: 'ion-calendar',
                    order: 10
                }
            })
            .state('proposed-join', {
                url: '/talks/proposed/:id/join',
                templateUrl: 'static/app/pages/courses/join/join.html',
                controller: 'CourseJoinCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Join talk'
            })
            // .state('published', {
            //     url: '/talks/published',
            //     templateUrl: 'static/app/pages/courses/stages/published.html',
            //     controller: 'CoursesPublishedPageCtrl',
            //     controllerAs: 'vm',
            //     authenticate: true,
            //     title: 'Published Talks',
            //     sidebarMeta: {
            //         icon: 'ion-ios-book',
            //         order: 10
            //     }
            // })
            .state('talks-add', {
                url: '/talks/add',
                templateUrl: 'static/app/pages/courses/add/add.html',
                controller: 'CoursesAddCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Add Research Talk'
            });
    }

})();