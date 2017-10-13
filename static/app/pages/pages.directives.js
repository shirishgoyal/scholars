(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.directives', [])
        .directive('backendValidity', backendValidity)
        .directive('compareTo', compareTo)
        .directive('hoverClass', hoverClass)
        .directive('autoFocus', autoFocus)
        .filter('screenshot', screenshot)
        .directive('phaseHeader', phaseHeader)
        .directive('phaseActions', phaseActions)
        .directive("ngTextTruncate", ["$compile", "ValidationServices", "CharBasedTruncation", "WordBasedTruncation",
            function ($compile, ValidationServices, CharBasedTruncation, WordBasedTruncation) {
                return {
                    restrict: "A",
                    scope: {
                        text: "=ngTextTruncate",
                        charsThreshold: "@ngTtCharsThreshold",
                        wordsThreshold: "@ngTtWordsThreshold",
                        customMoreLabel: "@ngTtMoreLabel",
                        customLessLabel: "@ngTtLessLabel"
                    },
                    controller: function ($scope, $element, $attrs) {
                        $scope.toggleShow = function () {
                            $scope.open = !$scope.open;
                        };

                        $scope.useToggling = $attrs.ngTtNoToggling === undefined;
                    },
                    link: function ($scope, $element, $attrs) {
                        $scope.open = false;

                        ValidationServices.failIfWrongThresholdConfig($scope.charsThreshold, $scope.wordsThreshold);

                        var CHARS_THRESHOLD = parseInt($scope.charsThreshold);
                        var WORDS_THRESHOLD = parseInt($scope.wordsThreshold);

                        $scope.$watch("text", function () {
                            $element.empty();

                            if (CHARS_THRESHOLD) {
                                if ($scope.text && CharBasedTruncation.truncationApplies($scope, CHARS_THRESHOLD)) {
                                    CharBasedTruncation.applyTruncation(CHARS_THRESHOLD, $scope, $element);

                                } else {
                                    $element.append($scope.text);
                                }

                            } else {

                                if ($scope.text && WordBasedTruncation.truncationApplies($scope, WORDS_THRESHOLD)) {
                                    WordBasedTruncation.applyTruncation(WORDS_THRESHOLD, $scope, $element);

                                } else {
                                    $element.append($scope.text);
                                }

                            }
                        });
                    }
                };
            }])


        .factory("ValidationServices", function () {
            return {
                failIfWrongThresholdConfig: function (firstThreshold, secondThreshold) {
                    if ((!firstThreshold && !secondThreshold) || (firstThreshold && secondThreshold)) {
                        throw "You must specify one, and only one, type of threshold (chars or words)";
                    }
                }
            };
        })

        .factory("CharBasedTruncation", ["$compile", function ($compile) {
            return {
                truncationApplies: function ($scope, threshold) {
                    return $scope.text.length > threshold;
                },

                applyTruncation: function (threshold, $scope, $element) {
                    if ($scope.useToggling) {
                        var el = angular.element("<span>" +
                            $scope.text.substr(0, threshold) +
                            "<span ng-show='!open'>...</span>" +
                            "<span class='btn-link ngTruncateToggleText' " +
                            "ng-click='toggleShow()'" +
                            "ng-show='!open'>" +
                            ($scope.customMoreLabel ? $scope.customMoreLabel : "more") +
                            "</span>" +
                            "<span ng-show='open'>" +
                            $scope.text.substring(threshold) +
                            "<span class='btn-link ngTruncateToggleText'" +
                            "ng-click='toggleShow()'>" +
                            " " + ($scope.customLessLabel ? $scope.customLessLabel : "(less)") +
                            "</span>" +
                            "</span>" +
                            "</span>");
                        $compile(el)($scope);
                        $element.append(el);

                    } else {
                        $element.append($scope.text.substr(0, threshold) + "...");

                    }
                }
            };
        }])

        .factory("WordBasedTruncation", ["$compile", function ($compile) {
            return {
                truncationApplies: function ($scope, threshold) {
                    return $scope.text.split(" ").length > threshold;
                },

                applyTruncation: function (threshold, $scope, $element) {
                    var splitText = $scope.text.split(" ");
                    if ($scope.useToggling) {
                        var el = angular.element("<span>" +
                            splitText.slice(0, threshold).join(" ") + " " +
                            "<span ng-show='!open'>...</span>" +
                            "<span class='btn-link ngTruncateToggleText' " +
                            "ng-click='toggleShow()'" +
                            "ng-show='!open'>" +
                            ($scope.customMoreLabel ? $scope.customMoreLabel : "more") +
                            "</span>" +
                            "<span ng-show='open'>" +
                            splitText.slice(threshold, splitText.length).join(" ") +
                            "<span class='btn-link ngTruncateToggleText'" +
                            "ng-click='toggleShow()'>" +
                            " " + ($scope.customLessLabel ? $scope.customLessLabel : "(less)") +
                            "</span>" +
                            "</span>" +
                            "</span>");
                        $compile(el)($scope);
                        $element.append(el);

                    } else {
                        $element.append(splitText.slice(0, threshold).join(" ") + "...");
                    }
                }
            };
        }]);

    /**
     * @name backendError
     * @desc Clear backend error if input value has been modified.
     *       This helps in ensuring field is re-validated from backend
     */
    function backendValidity() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ctrl) {
                return element.on('change', function () {
                    return scope.$apply(function () {
                        return ctrl.$setValidity('backend', true);
                    });
                });
            }
        };
    }

    /**
     * @name compareTo
     * @desc Show error if two values are not same
     */
    function compareTo() {
        return {
            require: "ngModel",
            restrict: 'A',
            scope: {
                compareTo: '='
            },
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) {
                    console && console.warn('Match validation requires ngModel to be on the element');
                    return;
                }

                scope.$watch(function () {
                    var modelValue = angular.isUndefined(ctrl.$modelValue) ? ctrl.$$invalidModelValue : ctrl.$modelValue;
                    return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.compareTo === modelValue;
                }, function (currentValue) {
                    ctrl.$setValidity('compareTo', currentValue);
                });
            }
        };
    }

    function hoverClass() {
        return {
            restrict: 'A',
            scope: {
                hoverClass: '@'
            },
            link: function (scope, element) {
                element.on('mouseenter', function () {
                    element.addClass(scope.hoverClass);
                });
                element.on('mouseleave', function () {
                    element.removeClass(scope.hoverClass);
                });
            }
        }
    }

    function autoFocus($timeout) {
        return {
            restrict: 'AC',
            link: function (scope, element) {
                $timeout(function () {
                    element[0].focus();
                }, 0);
            }
        };
    }

    function screenshot() {
        return function (input) {
            return 'http://i.ytimg.com/vi/' + input.replace('https://www.youtube.com/embed/', '') + '/hqdefault.jpg';
        }
    }

    function phaseHeader() {
        return {
            restrict: 'E',
            scope: {
                'items': '='
            },
            templateUrl: 'static/app/pages/courses/phases/header.html',
            controller: function ($scope, $state, $stateParams) {
                $scope.goto = function (item) {
                    $state.go(item.state, {id: $stateParams.id});
                }
            }
        };
    }

    function phaseActions() {
        return {
            restrict: 'E',
            scope: {
                'items': '=',
                'currentPhase': '=',
                'course': '=',
                'canPrevious': '=',
                'canNext': '=',
                'isDri': '=',
                'movePrevious': '&',
                'moveNext': '&'
            },
            templateUrl: 'static/app/pages/courses/phases/actions.html',

            controller: function ($scope, $state, $stateParams,$sce) {
                $scope.trustSrc = function (src) {
                    return $sce.trustAsResourceUrl(src);
                };
            }
        };
    }


})();
