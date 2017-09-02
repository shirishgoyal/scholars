(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',

        'BlurAdmin.pages.directives',

        'BlurAdmin.pages.auth',
        'BlurAdmin.pages.dashboard',
        // 'BlurAdmin.pages.profile',
        'BlurAdmin.pages.courses',
        'BlurAdmin.pages.page'
    ])
        .config(routeConfig)
        .constant('gTemplates', {
            WORKFLOW_TEMPLATE: '1DBM-v8bieVlUlnDZihCM4MlTZCLGCuw8ezVlF5Re0wc',
            BEST_PRACTICES_TEMPLATE: '1sQS_OZ9A9HLoQcJGlVjRXKiPJvt62oafW7CyKFELwaM',

            SLACK_TEAM_ID: 'T268ARDCG',
        });

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/page/home');
    }

})();
