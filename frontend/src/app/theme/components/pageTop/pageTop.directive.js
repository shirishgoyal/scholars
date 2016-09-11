/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            scope: {
                'is_logged_in': '='
            },
            templateUrl: 'app/theme/components/pageTop/pageTop.html',
            controller: function ($scope, $state, Auth) {
                var vm = this;

                vm.is_logged_in = Auth.isAuthenticated();

                vm.logout = function(){
                    Auth.unauthenticate();
                    $state.go('auth.login');
                }
            },
            controllerAs: 'vm'
        };
    }

})();
