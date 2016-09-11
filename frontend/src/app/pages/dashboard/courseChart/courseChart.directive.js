/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('courseChart', courseChart);

  /** @ngInject */
  function courseChart() {
    return {
      restrict: 'E',
      controller: 'CourseChartCtrl',
      templateUrl: 'app/pages/dashboard/courseChart/courseChart.html'
    };
  }
})();
