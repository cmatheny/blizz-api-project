angular.module("routerApp").controller("CharacterMainCtrl", function(GetCharacterService) {
    var self = this;
    self.serverInput="emerald-dream";
    self.nameInput="sarrial";
    self.data={};

    self.getNewCharacter = function() {

        GetCharacterService.getNewCharacter(self.serverInput,self.nameInput).$promise.then(null,function(){
            self.data={};
            self.data.thumbUrl = "resources/char-not-found.png";
        });
        self.data = GetCharacterService.getCharacter();
    };

    self.getCharacter = function() {

        self.data = GetCharacterService.getCharacter();
    };    

    self.getCharacter();

    window.printObj = function() {
        console.log(self.data);
    };

});
