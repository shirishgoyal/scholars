/**
 * @author shirishgoyal
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.auth', [
        'BlurAdmin.services'
    ])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/auth',
                abstract: true,
                views: {
                    'full_screen': {
                        templateUrl: 'static/app/pages/auth/auth.html'
                    }
                },
                authenticate: false
            })
            // .state('auth.register', {
            //     url: '/register',
            //     templateUrl: 'static/app/pages/auth/register.html',
            //     controller: 'RegisterPageCtrl',
            //     controllerAs: 'vm'
            // })
            // .state('auth.login', {
            //     url: '/login',
            //     templateUrl: 'static/app/pages/auth/login.html',
            //     controller: 'LoginPageCtrl',
            //     controllerAs: 'vm'
            // })
        ;
    }

})();
