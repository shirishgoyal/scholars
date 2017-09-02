/**
 * Created by shirish.goyal on 8/28/16.
 */
(function () {
    'use strict';

    angular
        .module('BlurAdmin.services')
        .factory('Slide', Slide);

    Slide.$inject = ['$cookies', '$http', '$q', '$window', 'Auth', 'Upload'];

    function Slide($cookies, $http, $q, $window, Auth, Upload) {

        var Slide = {
            update: update,
            assign: assign,
            release: release,
            approve: approve,
            reject: reject,
            submitFeedback: submitFeedback,
            updateFeedbackStatus: updateFeedbackStatus,

            list: list,
            // get: get,

        };

        return Slide;

        function assign(id, courseId) {
            var data = {
                'course': courseId
            };

            return $http.put('/api/slides/' + id + '/assign/', data);
        }

        function release(id, courseId) {
            var data = {
                'course': courseId
            };

            return $http.put('/api/slides/' + id + '/release/', data);
        }

        function approve(id, courseId) {
            var data = {
                'course': courseId
            };

            return $http.put('/api/slides/' + id + '/approve/', data);
        }

        function reject(id, courseId) {
            var data = {
                'course': courseId
            };

            return $http.put('/api/slides/' + id + '/reject/', data);
        }

        function update(id, courseId, file) {
            var token = Auth.getToken();


            return Upload.upload({
                method: 'PUT',
                url: '/api/slides/' + id + '/',
                headers: {
                    "Content-Disposition": "attachment; filename=" + id + ".mp3",
                    'Content-Type': file.type,
                    'Authorization': 'Token ' + token
                },
                data: {
                    course: courseId,
                    audio: file
                }
            });
        }

        function list() {
            return $http.get('/api/slides/');
        }

        function get(id) {
            return $http.get('/api/slides/' + id + '/');
        }

        function submitFeedback(id, review) {
            return $http.post('/api/slides/' + id + '/review/', review);
        }

        function updateFeedbackStatus(review_id, status) {
            var data = {
                // status: parseInt(status)
            };

            var action = parseInt(status) === 1 ? 'proposed' : 'resolved';

            return $http.put('/api/reviews/' + review_id + '/' + action + '/', data);
        }


    }
})();
