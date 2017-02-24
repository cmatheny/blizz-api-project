angular.module("routerApp").controller("CharacterMainCtrl", function(CharacterLogicService) {
    var self = this;
    self.serverInput="emerald-dream";
    self.nameInput="sarrial";
    self.data={};
    
    /*
     * Sends a call to the CharacterLogic service 
     */
    self.getNewCharacter = function() {
        CharacterLogicService.getNewCharacter(self.serverInput,self.nameInput);
        self.data = CharacterLogicService.getCharacter();
    };

    self.getCharacter = function() {
        self.data = CharacterLogicService.getCharacter();
    };    

    self.getCharacter();

    window.printObj = function() {
        console.log(self.data);
    };

});
