/* global CMGLOBALVAR */

angular.module("routerApp").controller("CharacterCtrl", function() {
    var self = this;
});

angular.module("routerApp").controller("CharacterMainCtrl", function(GetCharacterService) {
    var self = this;
    self.serverInput="emerald-dream";
    self.nameInput="sarrial";


    self.getCharacterClass = function(){
        GetCharacterService.getCharacterClassPromise().then(function(charClass){
            self.data.charClass = charClass;
        });
    };

    self.getCharacterRace = function(){
        GetCharacterService.getCharacterRacePromise().then(function(charRace){
            self.data.charRace = charRace;
        });
    };
    
    self.getThumbnail = function(){
        GetCharacterService.getThumbnailPromise().then(function(thumbUrl){
            self.data.thumbUrl = thumbUrl;
        });
    };

    self.submitRequest = function() {
        var promise = GetCharacterService.sendCharacterRequest(self.serverInput, self.nameInput);

        promise.then(function() {
            self.getCharacter();
            self.getThumbnail();
            self.getCharacterClass();
            self.getCharacterRace();
        });
    };

    self.getCharacter = function() {
        self.data = GetCharacterService.getCharacter();
    };    
    
});
