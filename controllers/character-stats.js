angular.module("routerApp").controller("CharacterStatCtrl", function(GetCharacterService) {
    var self = this;

    self.charData = GetCharacterService.getCharacter();
    console.log(self.charData);

});
