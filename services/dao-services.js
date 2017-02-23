angular.module("routerApp").service("ApiSearchService", function($http, GetApiKeyService) {

    var self = this;

    self.sendApiRequest = function(urlStub) {
        var url = "https://us.api.battle.net/wow/"+urlStub+"?locale=en_US&apikey="+GetApiKeyService.apiKeyCheck();
        return $http.get(url);
    };
});

angular.module("routerApp").service("DaoService", function(GetApiKeyService,$resource){
    
    var self = this;
    var baseUrl = "https://us.api.battle.net/wow/";
    var apiKey = GetApiKeyService.apiKeyCheck();
    console.log("Dao init");
    
    var getCharacterResource = $resource(baseUrl+"character/:server/:name", { locale: 'en_US', apikey: apiKey });
    
    self.getCharacter = function(server, name) {
        var resourceObj = getCharacterResource.get({server: server, name: name},function() {
            console.log("done",self.test);
        });
        return resourceObj;
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
