var CMGLOBALVAR = {
    
};

var app = angular.module("routerApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	
    $stateProvider.state('home',{
		url: '/index.html',
		templateUrl: 'views/home.html'
	});
	
	$stateProvider.state('character',{
		url: '/character',
        templateUrl: 'views/character.html'
    });
    
    $stateProvider.state('character.main',{
        url:'/',
        templateUrl: 'views/character/main.html'
    });
    
    $stateProvider.state('character.stats',{
        url:'/stats',
        templateUrl: 'views/character/stats.html'
    });
    
    $stateProvider.state('api',{
		url: '/apiSearch',
		templateUrl: 'views/api.html'
	});
	
	//default routing
	$urlRouterProvider.otherwise('/index.html');
	
    //setup api-key
    var self = this;

    self.apiKeyPrompt = function(){
        console.log("get key");
        var input = prompt("Enter API key:");
        console.log(input);
        return input;
        
    };
    
    apiKeyCheck = function() {
        if (localStorage.apiKey){
            CMGLOBALVAR.apiKey = localStorage.apiKey;
        } else {
            var input = self.apiKeyPrompt();
            if (input) {
                localStorage.apiKey = input;
                CMGLOBALVAR.apiKey = input;
            }
        }
    };
    
    apiKeyCheck();
});
