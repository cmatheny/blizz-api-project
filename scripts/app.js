var CMGLOBALVAR = {
    apiKey: localStorage['apiKey']
};

var app = angular.module("DogModule", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	
	var helloState = {
		name: 'home',
		url: '/',
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	};
	
	var characterState = {
		name: 'character',
		url: '/character',
		templateUrl: 'templates/character.html',
		controller: 'CharacterCtrl'
	};
	
	$stateProvider.state(helloState);
	$stateProvider.state(characterState);
	
	//default routing
	$urlRouterProvider.otherwise('/');
	
});