angular.module("routerApp").service("CharacterDao", ['ApiKeyService', 'ApiSearchService', '$resource', '$q', function(ApiKeyService,ApiSearchService,$resource,$q){
    
    var self = this;
    var baseUrl = "https://us.api.battle.net/wow/";
    var apiKey = ApiKeyService.apiKeyCheck();
    self.characterRaceMap = [];
    self.characterClassMap = [];
    
    var getCharacterResource = $resource(baseUrl+"character/:server/:name", { locale: 'en_US', apikey: apiKey });

    self.getCharacter = function(server, name, fields) {

        fields = fields || 'guild,titles';
        var resourceObj = getCharacterResource.get({server: server, name: name, fields: fields});
        return resourceObj.$promise;
    };

    self.getRaceMap = function() {
        var deferred = $q.defer();
        
        if (!angular.equals(self.characterRaceMap, [])) {
            deferred.resolve(self.characterRaceMap);
        } else {

            var urlStub = "data/character/races";
            var getFromApi = ApiSearchService.sendApiRequest(urlStub);

            getFromApi.then(function(response) {
                for (var index in response.data.races) {
                    self.characterRaceMap[response.data.races[index].id] = response.data.races[index].name;
                }
                deferred.resolve(self.characterRaceMap);
            });
        }
        return deferred.promise;
    };
    
    self.getClassMap = function() {
        var deferred = $q.defer();

        if (!angular.equals(self.characterClassMap, [])) {
            deferred.resolve(self.characterClassMap);
        } else {

            var urlStub = "data/character/classes";
            var getFromApi = ApiSearchService.sendApiRequest(urlStub);
            
            // class definitions start at 1
            self.characterClassMap.push(undefined);

            getFromApi.then(function(response) {
                for (var index in response.data.classes) {
                    self.characterClassMap.push(response.data.classes[index].name);
                }
                deferred.resolve(self.characterClassMap);
            });
        }
        return deferred.promise;
    };

        self.getCharacterImage = function(thumbnail,full) {
        var deferred = $q.defer();

        //full image url
        if (full) {
            var stub = thumbnail.split('-avatar')[0];
            var url="https://render-us.worldofwarcraft.com/character/" + stub + "-profilemain.jpg";
        } else {
            var url="https://render-api-us.worldofwarcraft.com/static-render/us/" + thumbnail;
        }

        var tester = new Image();

        tester.onload = function() {
            deferred.resolve(url);
        };
        tester.onerror = function() {
            url = "resources/image-not-found.png";
            deferred.resolve(url);
        };

        tester.src = url;

        return deferred.promise;
    };

}]);

angular.module("routerApp").service("ApiSearchService", ['$http', 'ApiKeyService', function($http, ApiKeyService) {

    var self = this;

    self.sendApiRequest = function(urlStub,params) {
        if (params) params += '&';
        else params = '';
        params = "?" + params + "locale=en_US&apikey=" + ApiKeyService.apiKeyCheck();
        var url = "https://us.api.battle.net/wow/"+urlStub+params;
        console.log(url);
        return $http.get(url);
    };
}]);

angular.module("routerApp").service("ApiKeyService", function() {

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
    
    self.clearApiKey = () => localStorage.removeItem('apiKey');
    
});
