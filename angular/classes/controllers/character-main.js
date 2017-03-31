angular.module("routerApp").controller("CharacterSearchCtrl", ['CurrentCharacter', function(CurrentCharacter) {
    var self = this;

    // defaults for faster testing
    self.serverInput="emerald-dream";
    self.nameInput="sarrial";
    
    /*
     * Sends a call to the CharacterLogic service 
     */
    self.getNewCharacter = () => CurrentCharacter.setCharacter(self.serverInput,self.nameInput);

}]);

