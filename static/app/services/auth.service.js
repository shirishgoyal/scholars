/**
 * Created by shirish.goyal on 8/28/16.
 */
(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.auth.services')
        .factory('Auth', Auth);

    Auth.$inject = ['$cookies', '$http', '$q', '$window' , '$auth', '$state'];

    function Auth($cookies, $http, $q, $window, $auth, $state) {

        var Auth = {
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            register: register,
            getToken: getToken,
            getAccount: getAccount,
            unauthenticate: unauthenticate,
            // changePassword: changePassword,
            // forgotPassword: forgotPassword,
            // resetPassword: resetPassword,

            // get: get,
            // set: set,
        };

        return Auth;

        function register(account) {
            return $http.post('/api/users/', account);
        }

        function login(account) {
            return $auth.authenticate('google');

            // return $http.post('/api/auth/login/', account)
            //     .success(function (response, status, headers, config) {
            //         $cookies.put("token", response.token);
            //         $cookies.put("account", JSON.stringify(response.user));
            //     });
        }

        function logout() {
            $auth.logout();
            $state.go('auth.login');
            //     .then(logoutSuccessFn, logoutErrorFn);
            //
            // function logoutSuccessFn(data, status, headers, config) {
            //     Auth.unauthenticate();
            //
            //     // $window.location = '/auth/login';
            //
            //     $state.go('dashboard');
            // }
            //
            // function logoutErrorFn(data, status, headers, config) {
            //     console.error('Epic failure!');
            // }
        }

        function unauthenticate() {
            $auth.logout();
            // $cookies.remove('token');
            // $cookies.remove('account');
        }

        function getToken() {
            return $auth.getToken();
            // if (!$cookies.get('token')) {
            //     return;
            // }
            //
            // return $cookies.get('token');
        }

        function isAuthenticated() {
            return $auth.isAuthenticated();
            // return !!$cookies.get('token');
        }

        function getAccount() {
            return $auth.getPayload()
            // if (!$cookies.get('account')) {
            //     return;
            // }
            //
            // return JSON.parse($cookies.get('account'));
        }

        function setAccount(id) {
            $http.get('/api/user/' + id + '/')
                .success(function (response, status, headers, config) {

                })
                .error(function (response, status, headers, config) {

                });
        }

        function changePassword(oldPassword, newPassword, newPassword2) {
            return $http({
                url: '/api/user/' + getAuthenticatedAccount().username + '/change_password/',
                method: 'POST',
                data: {
                    password: oldPassword,
                    password1: newPassword,
                    password2: newPassword2   //no need to transfer this but for now required
                }
            });
        }

        function activateAccount(activation_key) {
            return $http({
                url: '/api/user/activate_account/',
                method: 'POST',
                data: {
                    activation_key: activation_key
                }
            });
        }

        function forgotPassword(email) {
            return $http({
                url: '/api/user/forgot_password/',
                method: 'POST',
                data: {
                    email: email
                }
            });
        }

        function resetPassword(reset_key, email, password) {
            return $http({
                url: '/api/user/reset_password/',
                method: 'POST',
                data: {
                    reset_key: reset_key,
                    email: email,
                    password: password
                }
            });
        }
    }
})();
