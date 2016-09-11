/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .config(config);

  /** @ngInject */
  function config($httpProvider, $compileProvider, baConfigProvider, colorHelper) {
    $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
    
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';

     $compileProvider.imgSrcSanitizationWhitelist(/^\s*(http|blob|data):/);

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
