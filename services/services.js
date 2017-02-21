/* global CMGLOBALVAR */

angular.module("DogModule").service("GetCharacterService", function($http) {

    var self = this;

    self.sendCharacterRequest = function(server, character) {
        return $http({
            method:"GET",
            url:"https://us.api.battle.net/wow/character/" + server+"/" + character + "?locale=en_US&apikey="+CMGLOBALVAR.apiKey
        });
    };
});