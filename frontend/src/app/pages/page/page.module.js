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
                        templateUrl: 'app/pages/page/index.html'
                    }
                },
                authenticate: false
            })
            .state('page.home', {
                url: '/home',
                templateUrl: 'app/pages/page/home.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.rules', {
                url: '/rules',
                templateUrl: 'app/pages/page/rules.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.faq', {
                url: '/faq',
                templateUrl: 'app/pages/page/faq.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.technical', {
                url: '/technical',
                templateUrl: 'app/pages/page/technical.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
            .state('page.contact', {
                url: '/contact',
                templateUrl: 'app/pages/page/contact.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
                authenticate: false
            })
        ;
    }

})();
