angular.module("routerApp").controller("CharacterStatCtrl", ['CurrentCharacter', 'FormatService','$state', function(CurrentCharacter, FormatService, $state) {
    var self = this;
    
    self.format = FormatService;

    var getCharacter = function() {
        self.character = CurrentCharacter.getCharacter();
        self.cStats = self.character.stats;
    };
    
    (function init() {
        getCharacter();

        if (angular.equals(self.character.getName(), undefined)) {
            $state.go("character.search");
            return;
        }

        if (!self.character.hasStats()){
            CurrentCharacter.requestStats().then(getCharacter);
            console.log('no stats!');
        } else {
            console.log('haz stats!');
        }

    })();

}]);
