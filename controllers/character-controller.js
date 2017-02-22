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
    
//    self.getCharacterClass = function() {
//        console.log(self.characterClasses);
//        var classId = self.data.class;
//        var begin = function() {
//            if (this.characterClasses !== undefined) {
//                updateClass();
//            } else {
//            var urlStub = "data/character/classes";
//            var getFromApi = ApiSearchService.sendApiRequest(urlStub);
//            self.characterClasses = [undefined];
//
//            getFromApi.then(function(response) {
//                console.log(response);
//                for (var index in response.data.classes) {
//                    self.characterClasses.push(response.data.classes[index].name);
//                }
//                updateClass();
//            });
//            }
//        };
//
//        var updateClass = function() {
//            console.log(self.characterClasses);
//            self.data.charClass=self.characterClasses[classId];
//            console.log(self.data.charClass);
//        };
//
//        begin();
//    };

    self.submitRequest = function() {
        var promise = GetCharacterService.sendCharacterRequest(self.serverInput, self.nameInput);

        promise.then(function() {
            self.getCharacter();
            self.getCharacterClass();
            self.getCharacterRace();
        });
    };

    self.getCharacter = function() {
        self.data = GetCharacterService.getCharacter();
    };    
    
});
