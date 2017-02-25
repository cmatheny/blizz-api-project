angular.module("routerApp").controller("CharacterStatCtrl", function(CurrentCharacter) {
    var self = this;

    var character = CurrentCharacter.getCharacter;
    
    self.getName = character.getName;
    
    console.log(self.getName);
});
