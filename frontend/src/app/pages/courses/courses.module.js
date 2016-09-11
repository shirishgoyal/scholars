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
            .state('courses', {
                url: '/courses',
                templateUrl: 'app/pages/courses/courses.html',
                controller: 'CoursesPageCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Courses',
                sidebarMeta: {
                    icon: 'ion-ios-book',
                    order: 10
                },
            })
            .state('course', {
                url: '/course/:id/',
                templateUrl: 'app/pages/courses/course.html',
                controller: 'CoursePageCtrl',
                controllerAs: 'vm',
                authenticate: true,
                title: 'Course'
            })
        ;
    }

})();
