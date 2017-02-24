angular.module("routerApp").controller("CharacterStatCtrl", function(CharacterLogicService) {
    var self = this;

    self.charData = CharacterLogicService.getCharacter();

});
