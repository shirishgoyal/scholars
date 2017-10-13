/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .config(config);

    /** @ngInject */
    function config($httpProvider, $compileProvider, $locationProvider, baConfigProvider, colorHelper, $authProvider, toastrConfig, $disqusProvider, $opbeatProvider) {
        $locationProvider.hashPrefix('!');

        $httpProvider.interceptors.push('AuthHttpResponseInterceptor');

        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|slack):/);

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);

        $authProvider.baseUrl = '/';
        $authProvider.loginUrl = '/';
        $authProvider.signupUrl = '/';
        // $authProvider.unlinkUrl = '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'scholars';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage';

        $authProvider.google({
            clientId: '986490356220-qlef4cg2t9ru83cj3bq83qmflrfshvde.apps.googleusercontent.com',
            url: '/api/auth/google/',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: {width: 400, height: 400}
        });

        angular.extend(toastrConfig, {
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            }
        });

        $disqusProvider.setShortname('stanfordscholar');

        $opbeatProvider.config({
            orgId: 'dd3b73bcb11544bf85764ffcd34f8ad8',
            appId: '592bbc667c'
        })

        //baConfigProvider.changeTheme({blur: true});

        // baConfigProvider.changeColors({
        //  default: 'rgba(#000000, 0.2)',
        //  defaultText: '#ffffff',
        //  dashboard: {
        //    white: '#ffffff',
        //  },
        // });
    }
})();
