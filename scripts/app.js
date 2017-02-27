var app = angular.module("routerApp", ['ui.router','ngResource','ui.bootstrap']);

app.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state('home',{
		url: '/home',
		templateUrl: 'views/home.html'
	});
	
	$stateProvider.state('character',{
		url: '/character',
        abstract: 'true',
        
        views: {
            '':{
                templateUrl: 'views/character.html',
                controller: 'CharacterCtrl as char'},
            'charheader@character':{
                templateUrl: 'views/character/char-header.html',
            },
            'sidenav@character': {
                templateUrl: 'views/character/sidenav.html',
            }
        }
    });
    
    $stateProvider.state('character.search',{
        url:'/',
        templateUrl: 'views/character/search.html',
        controller: 'CharacterSearchCtrl as search'
    });
    
    $stateProvider.state('character.stats',{
        url:'/stats',
        templateUrl: 'views/character/stats.html',
        controller: 'CharacterStatCtrl as stats'
    });

    $stateProvider.state('character.talents',{
        url:'/talents',
        templateUrl: 'views/character/talents.html'
    });

    $stateProvider.state('character.gear',{
        url:'/gear',
        templateUrl: 'views/character/gear.html'
    });

    $stateProvider.state('character.facts',{
        url:'/random-facts',
        templateUrl: 'views/character/facts.html'
    });

    $stateProvider.state('character.editor',{
        url:'/character-editor',
        templateUrl: 'views/character/editor.html'
    });
    
    $stateProvider.state('api',{
		url: '/apiSearch',
		templateUrl: 'views/api.html'
	});

    $stateProvider.state('resetKey',{
		url: '/reset-key',
		templateUrl: 'views/reset-key.html'
	})
    .state('somethingElse',{
        url:'/nothing',
        templateUrl: 'views/something-else.html'
    });
	
	//default routing
	$urlRouterProvider.otherwise('/home');
	
//    //hide # in url
//    $locationProvider.html5Mode({
//        enabled:true,
//        requireBase: false
//    });
}]);
