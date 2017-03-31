var app = angular.module("routerApp", ['ui.router', 'ngResource', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'angular/views/home.html'
        });

        $stateProvider.state('character', {
            url: '/character',
            abstract: 'true',

            views: {
                '': {
                    templateUrl: 'angular/views/character.html',
                    controller: 'CharacterCtrl as char'},
                'charheader@character': {
                    templateUrl: 'angular/views/character/char-header.html'
                },
                'sidenav@character': {
                    templateUrl: 'angular/views/character/sidenav.html'
                }
            }
        });

        $stateProvider.state('character.search', {
            url: '/',
            templateUrl: 'angular/views/character/search.html',
            controller: 'CharacterSearchCtrl as search'
        });

        $stateProvider.state('character.stats', {
            url: '/stats',
            templateUrl: 'angular/views/character/stats.html',
            controller: 'CharacterStatCtrl as stats'
        });

        $stateProvider.state('character.talents', {
            url: '/talents',
            templateUrl: 'angular/views/character/talents.html'
        });

        $stateProvider.state('character.gear', {
            url: '/gear',
            templateUrl: 'angular/views/character/gear.html'
        });

        $stateProvider.state('character.facts', {
            url: '/random-facts',
            templateUrl: 'angular/views/character/facts.html',
            controller: 'CharacterFactsCtrl as facts'
        });

        $stateProvider.state('character.editor', {
            url: '/character-editor',
            templateUrl: 'angular/views/character/editor.html'
        });

        $stateProvider.state('api', {
            url: '/apiSearch',
            templateUrl: 'angular/views/api.html'
        });

        $stateProvider.state('resetKey', {
            url: '/reset-key',
            templateUrl: 'angular/views/reset-key.html'
        })
            .state('somethingElse', {
                url: '/nothing',
                templateUrl: 'angular/views/something-else.html'
            });

        //default routing
        $urlRouterProvider.otherwise('/');

    }]);
