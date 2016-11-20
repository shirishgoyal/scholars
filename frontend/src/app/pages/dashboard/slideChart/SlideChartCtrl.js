/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('SlideChartCtrl', SlideChartCtrl);

    /** @ngInject */
    function SlideChartCtrl($scope, baConfig, colorHelper, lodash, Slide) {

        $scope.transparent = baConfig.theme.blur;
        var dashboardColors = baConfig.colors.gradation;

        Slide.list()
            .then(function (response, status) {
                $scope.total = response.data.count;
                var slides = response.data.results;

                slides = lodash.groupBy(slides, function (slide) {
                    return slide.status_text;
                });

                if (!slides.hasOwnProperty('Draft')) {
                    slides["Draft"] = [];
                }

                if (!slides.hasOwnProperty('In Progress')) {
                    slides["In Progress"] = [];
                }

                if (!slides.hasOwnProperty('Pending Approval')) {
                    slides["Pending Approval"] = [];
                }

                if (!slides.hasOwnProperty('Published')) {
                    slides["Published"] = [];
                }

                $scope.doughnutData = [
                    {
                        value: slides["Draft"].length,
                        color: dashboardColors.lightDark,
                        highlight: colorHelper.shade(dashboardColors.lightest, 15),
                        label: 'Draft',
                        percentage: slides["Draft"].length * 100 / $scope.total,
                        order: 1,
                    }, {
                        value: slides["In Progress"].length,
                        color: dashboardColors.dark,
                        highlight: colorHelper.shade(dashboardColors.lightDark, 15),
                        label: 'In Progress',
                        percentage: slides["In Progress"].length * 100 / $scope.total,
                        order: 2,
                    }, {
                        value: slides["Pending Approval"].length,
                        color: dashboardColors.darker,
                        highlight: colorHelper.shade(dashboardColors.dark, 15),
                        label: 'Pending Approval',
                        percentage: slides["Pending Approval"].length * 100 / $scope.total,
                        order: 3,
                    },{
                        value: slides["Published"].length,
                        color: dashboardColors.darkest,
                        highlight: colorHelper.shade(dashboardColors.darker, 15),
                        label: 'Completed',
                        percentage: slides["Published"].length * 100 / $scope.total,
                        order: 4,
                    }
                ];

                var ctx = document.getElementById('slide-area').getContext('2d');
                window.slides = new Chart(ctx).Doughnut($scope.doughnutData, {
                    segmentShowStroke: false,
                    percentageInnerCutout: 64,
                    responsive: true
                });

            });


    }
})();
