/**
 * Created by shirish.goyal on 8/28/16.
 */

(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.courses.services')
        .factory('Course', Course);

    Course.$inject = ['$cookies', '$http', '$q', '$window'];

    function Course($cookies, $http, $q, $window) {

        var Course = {
            list: list,
            get: get,
            add: add
        };

        return Course;

        function list() {
            return $http.get('/api/courses/');
        }

        function get(id) {
            return $http.get('/api/courses/' + id + '/');
        }

        function add(course) {
            return $http.post('/api/courses/', course);
        }
    }
})();
