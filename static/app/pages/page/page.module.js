/**
 * @author shirishgoyal
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.page', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('page', {
                url: '/page',
                abstract: true,
                views: {
                    'full_screen': {
                        templateUrl: 'static/app/pages/page/index.html',
                        controller: 'LoginPageCtrl',
                        controllerAs: 'vm',
                    }
                },

                authenticate: false
            })
            .state('page.home', {
                url: '/home',
                templateUrl: 'static/app/pages/page/home.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.join', {
                url: '/join-us',
                templateUrl: 'static/app/pages/page/join.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.talk', {
                url: '/talk/:id/',
                templateUrl: 'static/app/pages/page/detail.html',
                controller: 'CourseDetailCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.rules', {
                url: '/rules',
                templateUrl: 'static/app/pages/page/rules.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.faq', {
                url: '/faq',
                templateUrl: 'static/app/pages/page/faq.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.technical', {
                url: '/technical',
                templateUrl: 'static/app/pages/page/technical.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.contact', {
                url: '/contact',
                templateUrl: 'static/app/pages/page/contact.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
        ;
    }

})();
