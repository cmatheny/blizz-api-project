/* global CMGLOBALVAR */

angular.module("routerApp").service("GetCharacterService", function($http) {

    var self = this;

    self.sendCharacterRequest = function(server, character) {
        return $http({
            method:"GET",
            url:"https://us.api.battle.net/wow/character/" + server+"/" + character + "?locale=en_US&apikey="+CMGLOBALVAR.apiKey
        });
    };
});

angular.module("routerApp").service("ApiSearchService", function($http) {

    var self = this;

    self.sendApiRequest = function(urlStub) {
        return $http({
            method:"GET",
            url:"https://us.api.battle.net/wow/"+urlStub+"?locale=en_US&apikey="+CMGLOBALVAR.apiKey
        });
    };
});

