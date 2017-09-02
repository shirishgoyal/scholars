/**
 * @author shirishgoyal
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.courses', [
        'BlurAdmin.pages.courses.services'
    ])
        .config(routeConfig);

    angular.module('BlurAdmin.pages.courses.services', []);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider

            .state('talk', {
                url: '/talks',
                abstract: true,
                authenticate: true,
                title: 'Research Talk',
                templateUrl:'static/app/pages/courses/phases/base.html'
            })
            .state('talk.reading', {
                url: '/:id/reading',
                templateUrl: 'static/app/pages/courses/phases/reading.html',
                controller: 'ReadingPhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk: Reading Phase'
            })
            .state('talk.questionnaire', {
                url: '/:id/questionnaire',
                templateUrl: 'static/app/pages/courses/phases/questionnaire.html',
                controller: 'ReadingPhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk: Questionnaire'
            })
            .state('talk.slides', {
                url: '/:id/slides',
                templateUrl: 'static/app/pages/courses/phases/slides.html',
                controller: 'ReadingPhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk: Presentation'
            })
            .state('talk.peer_review', {
                url: '/:id/peer_review',
                templateUrl: 'static/app/pages/courses/phases/peer-review.html',
                controller: 'ReadingPhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk: Peer Review'
            })
            .state('talk.audio', {
                url: '/:id/audio',
                templateUrl: 'static/app/pages/courses/phases/audio.html',
                controller: 'ReadingPhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk: Audio'
            })
            .state('talk.refine', {
                url: '/:id/refine',
                templateUrl: 'static/app/pages/courses/phases/refine.html',
                controller: 'ReadingPhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk: Refinement'
            })
            .state('talk.pending_approval', {
                url: '/:id/pending_approval',
                templateUrl: 'static/app/pages/courses/phases/approval.html',
                controller: 'ReadingPhaseCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Research Talk: Awaiting Publish'
            })
            .state('in_progress', {
                url: '/talks/in-progress',
                templateUrl: 'static/app/pages/courses/stages/in_progress.html',
                controller: 'CoursesInProgressPageCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Talks in progress',
                sidebarMeta: {
                    icon: 'ion-ios-book',
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
                    icon: 'ion-ios-book',
                    order: 10
                }
            })
            .state('proposed-join', {
                url: '/talks/proposed/:id/join',
                templateUrl: 'static/app/pages/courses/join/join.html',
                controller: 'CourseJoinCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Join a proposed talk'
            })
            .state('published', {
                url: '/talks/published',
                templateUrl: 'static/app/pages/courses/stages/published.html',
                controller: 'CoursesPublishedPageCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Published Talks',
                sidebarMeta: {
                    icon: 'ion-ios-book',
                    order: 10
                }
            })
            .state('talks-add', {
                url: '/talks/add',
                templateUrl: 'static/app/pages/courses/add/add.html',
                controller: 'CoursesAddCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Add Research Talk'
            })
        ;
    }

})();
