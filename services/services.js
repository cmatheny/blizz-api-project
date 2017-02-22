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
    
    self.getThumbnailPromise = function() {
        
        var deferred = $q.defer();
        var url="https://render-api-us.worldofwarcraft.com/static-render/us/" + self.charData.thumbnail;
        
        console.log('starting image check');
        
        function testImage() {
            var tester = new Image();
            tester.onload = imageFound;
            tester.onerror = imageNotFound;
            tester.src = url;
            console.log('image object created');
        }

        function imageFound() {
            console.log("image found");
            self.charData.thumbUrl = url;
            deferred.resolve(self.charData.thumbUrl);
        }
        
        function imageNotFound() {
            self.charData.thumbUrl = "resources/image-not-found.png";
            console.log("image not found");
            deferred.resolve(self.charData.thumbUrl);
        }
        
        testImage();
        return deferred.promise;
    };

    self.sendCharacterRequest = function(server, character) {
        var deferred = $q.defer();
        
        $http({
            method:"GET",
            url:"https://us.api.battle.net/wow/character/" + server+"/" + character + "?locale=en_US&apikey="+GetApiKeyService.apiKeyCheck()
        }).then(function(response) {
            self.charData = response.data;
            console.log(self.charData);
            deferred.resolve(self.charData);
            
        },function(){
            alert("Not Found");
            deferred.resolve();
        });
        
        return deferred.promise;
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

