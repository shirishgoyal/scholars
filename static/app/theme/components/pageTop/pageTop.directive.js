/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function() {
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
            templateUrl: 'static/app/theme/components/pageTop/pageTop.html',
            controller: function($scope, $state, Auth) {
                var vm = this;

                vm.is_logged_in = Auth.isAuthenticated();
                Auth.getAccount().then(function(response) {
                    vm.account = response.data;
                    if (vm.account.hasOwnProperty('avatar') && vm.account.avatar) {
                        vm.account.avatar = vm.account.avatar.replace('https:', '').replace('http:', '');
                    }
                });

                vm.logout = function() {
                    Auth.logout();
                    $state.go('auth.login');
                }
            },
            controllerAs: 'vm'
        };
    }

})();