(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .directive('errSrc', errSrc);

    /** @ngInject */
    // adapted from https://stackoverflow.com/questions/16310298/if-a-ngsrc-path-resolves-to-a-404-is-there-a-way-to-fallback-to-a-default
    function errSrc($timeout, $parse) {
        return {
            link: function (scope, element, attrs) {
                attrs.$observe('ngSrc', function (value) {
                    if (!value && attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });

                element.bind('error', function () {
                    if (attrs.errSrc && attrs.src !== attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    }

})();
