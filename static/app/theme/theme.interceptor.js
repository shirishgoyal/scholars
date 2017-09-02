angular
    .module('BlurAdmin.theme')
    .factory('AuthHttpResponseInterceptor', function ($q, $location, $log, $injector) {
        return {

            request: function (config) {
                var Auth = $injector.get('Auth');
                var token = Auth.getToken();

                if (token !== null) {
                    if(config.url.indexOf('crossref.org') > -1){
                        delete config.headers['Authorization'];
                    }else {
                        config.headers['Authorization'] = 'JWT ' + token;
                    }
                }

                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 && rejection.hasOwnProperty('data') && rejection.data && rejection.data.hasOwnProperty('detail') && rejection.data.detail.indexOf('Signature has expired') > -1) {
                    var $http = $injector.get('$http');
                    var $state = $injector.get('$state');
                    var Auth = $injector.get('Auth');

                    Auth.logout();

                    var config = rejection.config;
                    delete config.headers['Authorization'];

                    return $http(config);
                }

                return $q.reject(rejection);
            }
        }
    });
