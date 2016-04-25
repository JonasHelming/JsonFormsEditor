/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />
var app;
(function (app) {
    var AppConfig = (function () {
        function AppConfig($stateProvider, $urlRouterProvider, $mdThemingProvider, $compileProvider) {
            $stateProvider
                .state('edit', {
                url: '/edit',
                views: {
                    'headerContainer': {
                        controller: 'HeaderViewController',
                        controllerAs: 'header',
                        templateUrl: 'app/src/components/header/header.html'
                    },
                    'treeContainer': {
                        controller: 'MyTreeController',
                        controllerAs: 'tree',
                        templateUrl: 'app/src/components/tree/tree.html'
                    },
                    'toolboxContainer': {
                        controller: 'ToolboxController',
                        controllerAs: 'toolbox',
                        templateUrl: 'app/src/components/toolbox/toolbox.html'
                    },
                    'layoutsContainer': {
                        controller: 'LayoutsController',
                        controllerAs: 'layouts',
                        templateUrl: 'app/src/components/layouts/layouts.html'
                    },
                    'detailContainer': {
                        controller: 'DetailController',
                        controllerAs: 'detail',
                        templateUrl: 'app/src/components/detail/detail.html'
                    }
                }
            })
                .state('preview', {
                url: '/preview',
                views: {
                    'headerContainer': {
                        controller: 'HeaderViewController',
                        controllerAs: 'header',
                        templateUrl: 'app/src/components/header/header.html'
                    },
                    contentContainer: {
                        controller: 'PreviewController',
                        controllerAs: 'preview',
                        templateUrl: 'app/src/components/preview/preview.html'
                    }
                }
            });
            $urlRouterProvider.otherwise('/edit');
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo', { 'default': '800' })
                .accentPalette('blue', { 'default': '500' })
                .warnPalette('red', { 'default': '600' });
            $mdThemingProvider.theme('error-toast');
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
        }
        AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$compileProvider'];
        return AppConfig;
    })();
    angular.module('app').config(AppConfig);
})(app || (app = {}));
//# sourceMappingURL=app.config.js.map