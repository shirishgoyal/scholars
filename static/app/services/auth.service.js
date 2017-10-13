/**
 * Created by shirish.goyal on 8/28/16.
 */
(function () {
    'use strict';

    angular
        .module('BlurAdmin.services')
        .factory('Auth', Auth);

    Auth.$inject = ['$cookies', '$http', '$q', '$window', '$auth', '$state'];

    function Auth($cookies, $http, $q, $window, $auth, $state) {

        var Auth = {
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            // register: register,
            getToken: getToken,
            getAccount: getAccount,
            unauthenticate: unauthenticate,
            // changePassword: changePassword,
            // forgotPassword: forgotPassword,
            // resetPassword: resetPassword,
        };

        return Auth;

        // function register(account) {
        //     return $http.post('/api/users/', account);
        // }

        function login() {
            return $auth.authenticate('google');
        }

        function logout() {
            $auth.logout();
            $state.go('page.home');
        }

        function unauthenticate() {
            $auth.logout();
        }

        function getToken() {
            return $auth.getToken();
        }

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        function getAccount() {
            var payload = $auth.getPayload();

            return $q(function (resolve, reject) {
                if (payload && payload.hasOwnProperty('user_id')) {
                    return $http.get('/api/users/' + payload['user_id'] + '/').then(function(response){
                        resolve(response);
                    }, function(err){
                        reject(err);
                    });
                } else {
                    reject()
                }
            });


        }

        // function setAccount(id) {
        //     $http.get('/api/user/' + id + '/')
        //         .success(function (response, status, headers, config) {
        //
        //         })
        //         .error(function (response, status, headers, config) {
        //
        //         });
        // }

        // function changePassword(oldPassword, newPassword, newPassword2) {
        //     return $http({
        //         url: '/api/user/' + getAuthenticatedAccount().username + '/change_password/',
        //         method: 'POST',
        //         data: {
        //             password: oldPassword,
        //             password1: newPassword,
        //             password2: newPassword2   //no need to transfer this but for now required
        //         }
        //     });
        // }
        //
        // function activateAccount(activation_key) {
        //     return $http({
        //         url: '/api/user/activate_account/',
        //         method: 'POST',
        //         data: {
        //             activation_key: activation_key
        //         }
        //     });
        // }
        //
        // function forgotPassword(email) {
        //     return $http({
        //         url: '/api/user/forgot_password/',
        //         method: 'POST',
        //         data: {
        //             email: email
        //         }
        //     });
        // }
        //
        // function resetPassword(reset_key, email, password) {
        //     return $http({
        //         url: '/api/user/reset_password/',
        //         method: 'POST',
        //         data: {
        //             reset_key: reset_key,
        //             email: email,
        //             password: password
        //         }
        //     });
        // }
    }
})();
