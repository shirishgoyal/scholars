/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
  'use strict';

  var basic = {
    default: '#ffffff',
    defaultText: '#696969',
    border: '#dddddd',
    borderDark: '#aaaaaa',
  };

  // main functional color scheme
  var colorScheme = {
    primary: '#8c1515',
    info: '#2dacd1',
    success: '#90b900',
    warning: '#dfb81c',
    danger: '#e85656',
  };

  // dashboard colors for charts
  // var dashboardColors = {
  //   blueStone: '#005562',
  //   surfieGreen: '#0e8174',
  //   silverTree: '#6eba8c',
  //   gossip: '#b9f2a1',
  //   white: '#10c4b5',
  // };

  var dashboardColors = {
    darkest: '#3C0000',
    darker: '#640000',
    dark: '#AF3333',
    lightDark: '#D55F5F',
    lightest: '#FF9898',
  };

  angular.module('BlurAdmin.theme')
    .provider('baConfig', configProvider);

  /** @ngInject */
  function configProvider(colorHelper) {
    var conf = {
      theme: {
        blur: false,
      },
      colors: {
        default: basic.default,
        defaultText: basic.defaultText,
        border: basic.border,
        borderDark: basic.borderDark,

        primary: colorScheme.primary,
        info: colorScheme.info,
        success: colorScheme.success,
        warning: colorScheme.warning,
        danger: colorScheme.danger,

        primaryLight: colorHelper.tint(colorScheme.primary, 30),
        infoLight: colorHelper.tint(colorScheme.info, 30),
        successLight: colorHelper.tint(colorScheme.success, 30),
        warningLight: colorHelper.tint(colorScheme.warning, 30),
        dangerLight: colorHelper.tint(colorScheme.danger, 30),

        primaryDark: colorHelper.shade(colorScheme.primary, 15),
        infoDark: colorHelper.shade(colorScheme.info, 15),
        successDark: colorHelper.shade(colorScheme.success, 15),
        warningDark: colorHelper.shade(colorScheme.warning, 15),
        dangerDark: colorHelper.shade(colorScheme.danger, 15),

        dashboard: {
          blueStone: dashboardColors.darkest,
          surfieGreen: dashboardColors.darker,
          silverTree: dashboardColors.dark,
          gossip: dashboardColors.lightDark,
          white: dashboardColors.lightest,
        },

        gradation:{
          darkest: dashboardColors.darkest,
          darker: dashboardColors.darker,
          dark: dashboardColors.dark,
          lightDark: dashboardColors.lightDark,
          lightest: dashboardColors.lightest,
        }
      }
    };

    conf.changeTheme = function(theme) {
      angular.merge(conf.theme, theme)
    };

    conf.changeColors = function(colors) {
      angular.merge(conf.colors, colors)
    };

    conf.$get = function () {
      delete conf.$get;
      return conf;
    };
    return conf;
  }
})();
