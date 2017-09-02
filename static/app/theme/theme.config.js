/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .config(config);

    /** @ngInject */
    function config($httpProvider, $compileProvider, baConfigProvider, colorHelper, $authProvider) {
        $httpProvider.interceptors.push('AuthHttpResponseInterceptor');

        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);

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
