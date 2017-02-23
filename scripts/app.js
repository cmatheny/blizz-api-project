var CMGLOBALVAR = {
    
};

var app = angular.module("routerApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	
    $stateProvider.state('page',{
        url:'/',
        templateUrl: 'page.html'
    });
    
    $stateProvider.state('page.main',{
		url: '/index.html',
		templateUrl: 'views/home.html'
	});
    
    $stateProvider.state('home',{
		url: '/index.html',
		templateUrl: 'views/home.html'
	});
	
	$stateProvider.state('character',{
		url: '/character',
        templateUrl: 'views/character.html',
        controller: 'CharacterCtrl as char',
//        views: {
//            
//        }
    });
    
    $stateProvider.state('character.main',{
        url:'/',
        templateUrl: 'views/character/main.html',
        controller: 'CharacterMainCtrl as charMain'
    });
    
    $stateProvider.state('character.stats',{
        url:'/stats',
        templateUrl: 'views/character/stats.html'
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
	$urlRouterProvider.otherwise('/index.html');
	
});
