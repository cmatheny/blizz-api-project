/* global CMGLOBALVAR */

angular.module("routerApp").service("GetCharacterService", function($http,GetApiKeyService,ApiSearchService,$q) {

    var self = this;
    self.data;

    self.getCharacter = function() {
        return self.charData;
    };

    self.setCharacter = function(charData) {
        self.charData = charData;
    };

    self.getCharacterClassPromise = function() {
        var deferred = $q.defer();
        if (self.charData.charClass) {
            deferred.resolve(self.charData.charClass);
        } else {
            self.getClassMapPromise().then(function(){
                self.charData.charClass = self.characterClassMap[self.charData.class];
                deferred.resolve(self.charData.charClass);
            });
        }
        return deferred.promise;
    };

    self.getClassMapPromise = function() {
        var deferred = $q.defer();
        if (self.characterClassMap) {
            deferred.resolve(self.characterClassMap);
        } else {

            var urlStub = "data/character/classes";
            var getFromApi = ApiSearchService.sendApiRequest(urlStub);
            
            // class definitions start at 1
            self.characterClassMap = [undefined];

            getFromApi.then(function(response) {
                console.log(response);
                for (var index in response.data.classes) {
                    self.characterClassMap.push(response.data.classes[index].name);
                }
                deferred.resolve(self.characterClassMap);
            });
        }
        console.log(deferred.promise);
        return deferred.promise;
    };
    
    self.getCharacterRacePromise = function() {
        var deferred = $q.defer();
        if (self.charData.charRace) {
            deferred.resolve(self.charData.charRace);
        } else {
            self.getRaceMapPromise().then(function(){
                self.charData.charRace = self.characterRaceMap[self.charData.race];
                deferred.resolve(self.charData.charRace);
            });
        }
        return deferred.promise;
    };

    self.getRaceMapPromise = function() {
        var deferred = $q.defer();
        if (self.characterRaceMap) {
            deferred.resolve(self.characterRaceMap);
        } else {

            var urlStub = "data/character/races";
            var getFromApi = ApiSearchService.sendApiRequest(urlStub);

            // race definitions start at 1
            self.characterRaceMap = [undefined];

            getFromApi.then(function(response) {
                console.log(response);
                for (var index in response.data.races) {
                    self.characterRaceMap.push(response.data.races[index].name);
                }
                deferred.resolve(self.characterRaceMap);
            });
        }
        console.log(deferred.promise);
        return deferred.promise;
    };


    self.sendCharacterRequest = function(server, character) {
        return $http({
            method:"GET",
            url:"https://us.api.battle.net/wow/character/" + server+"/" + character + "?locale=en_US&apikey="+GetApiKeyService.apiKeyCheck()
        }).then(function(response) {
            self.charData = response.data;
            self.charData.thumbnail="http://render-api-us.worldofwarcraft.com/static-render/us/" + response.data.thumbnail;
            console.log(self.charData);
        },function(){
            alert("Not Found");
        });
    };
});

angular.module("routerApp").service("ApiSearchService", function($http, GetApiKeyService) {

    var self = this;

    self.sendApiRequest = function(urlStub) {
        var url = "https://us.api.battle.net/wow/"+urlStub+"?locale=en_US&apikey="+GetApiKeyService.apiKeyCheck();
        return $http.get(url);
    };
});

angular.module("routerApp").service("GetApiKeyService", function() {

    var self = this;

    self.apiKeyPrompt = function(){
        var input = prompt("Enter API key:");
        console.log(input);
        return input;

    };

    self.apiKeyCheck = function() {
        if (localStorage.apiKey){
            return localStorage.apiKey;
        } else {
            var input = self.apiKeyPrompt();
            if (input) {
                localStorage.apiKey = input;
                return input;
            } else alert('No API key registered. You will not be able to retrieve from the API.');
        }
    };
});

angular.module("routerApp").service("ClearApiKeyService", function() {
    var self = this;

    self.clearApiKey = () => localStorage.removeItem('apiKey');
});

