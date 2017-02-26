angular.module("routerApp").controller("CharacterStatCtrl", ['CurrentCharacter', '$state', function(CurrentCharacter, $state) {
    var self = this;
    self.character = CurrentCharacter.getCharacter();

    if (angular.equals(self.character.getName(), undefined)) {
        $state.go("character.search");
        return;
    }

    (function init() {
        if (angular.equals(self.character.stats, {})){
            CurrentCharacter.requestStats();
            console.log('no stats!');
        }
        else console.log('haz stats!');
    })();

}]);
