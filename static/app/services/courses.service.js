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
            listPublished: listPublished,
            listProposed: listProposed,
            listInProgress: listInProgress,
            get: get,
            add: add,
            info: info,
            join: join,
            listCategories:listCategories,
            listLanguages:listLanguages,
            listTimezones:listTimezones,
        };

        return Course;

        function list() {
            return $http.get('/api/courses/');
        }

        function listPublished() {
            return $http.get('/api/courses/published/');
        }

        function listInProgress() {
            return $http.get('/api/courses/in-progress/');
        }

        function listProposed() {
            return $http.get('/api/courses/proposed/');
        }

        function listLanguages() {
            return $http.get('/api/languages/');
        }

        function listTimezones() {
            return $http.get('/api/timezones/');
        }

        function listCategories() {
            return $http.get('/api/categories/');
        }

        function get(id) {
            return $http.get('/api/courses/' + id + '/');
        }

        function add(course) {
            return $http.post('/api/courses/', course);
        }

        function join(id, member) {
            return $http.post('/api/courses/' + id + '/join/', member);
        }

        function info(course) {
            return $http.get('https://api.crossref.org/v1/works/http://dx.doi.org/' + course.doi, {
                headers: {
                    'Access-Control-Request-Headers': undefined
                }
            });
        }
    }
})();
