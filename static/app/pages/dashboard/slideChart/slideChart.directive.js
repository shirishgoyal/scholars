/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('slideChart', slideChart);

  /** @ngInject */
  function slideChart() {
    return {
      restrict: 'E',
      controller: 'SlideChartCtrl',
      templateUrl: 'static/app/pages/dashboard/slideChart/slideChart.html'
    };
  }
})();
