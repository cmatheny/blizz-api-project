/*
 * Intended to be used as a globally available reference to the currently loaded character.
 */
angular.module("routerApp").service("CurrentCharacter", ['CharacterLogicService', '$timeout', '$q', 'Character', function(CharacterLogicService, $timeout, $q, Character) {
    
    var self = this;
    
    var logic = CharacterLogicService;
    
    // Run on service startup. Basically anonymous function but named for debug log.
    (function init() {
        
        //self.characters = [];
        self.character = new Character();

        // sets from session storage if available
        try {
            self.character.setFieldsFromSessionStorage(sessionStorage.character);
        } catch(e) {
        }
    })();

    self.getCharacter = function(){
        return self.character;
    };

    self.setCharacter = function(server,name){
        self.character = new Character();
        self.character.thumbUrl = "resources/loading.gif"; // loading
        logic.getNewCharacter(server,name).then(function(promises){
            if (promises === false) {
                console.log('false');
                self.character.thumbUrl = "resources/char-not-found.png";
            }
            else {
                $timeout(function(){
                    console.log('true');
                    // display when everything done loading
                    $q.all(promises).then(function(data){
                        console.log(data);
                        self.character.setFieldsFromData(data);
                    });
                },500);
            }
        });
    };

    self.storeCharacter = function() {
        sessionStorage.character = JSON.stringify(self.character);
        console.log('stored');
    };

    self.setStats = function(statsData) {
        console.log(statsData);
        self.character.setStatsFromData(statsData);
    };

    self.requestStats = function() {
        logic.getStats(self.character).then(self.setStats);
    };

}]);

angular.module("routerApp").service("CharacterLogicService", ['$q', 'DaoService', 'Character', function($q,DaoService,Character) {

    var self = this;

    self.charData = {};
    self.character = new Character();
    
    
    
    self.getCharacter = function() {
        return self.character;
    };

    self.setCharacter = function(character) {
        self.character = character;
    };



    self.getName = function() {
        return self.character.name;
    };

    self.getNewCharacter = function(server,name){
        
        var deferred = $q.defer();

        self.character = new Character();
        //self.characters.push(self.character);

        DaoService.getCharacter(server,name).then(function(request){
            var promises = [];
            
            self.character.setFieldsFromData(request);

            promises.push(self.getCharacterClass(request.class));
            promises.push(self.getCharacterRace(request.race));
            promises.push(DaoService.getCharacterImage(request.thumbnail));
            console.log(request);
            $q.all(promises).then(function(details){
                request.className = details[0];
                request.raceName = details[1];
                request.thumbUrl = details[2];
                deferred.resolve(request);
            });
            return promises;
        },function(){
            deferred.resolve(false);
        });
        
        return deferred.promise;
    };

    self.getStats = function(character) {
        var deferred = $q.defer();
        DaoService.getCharacter(character.realm, character.name, 'stats').then(function(data){
            deferred.resolve(data.stats);
        });

        return deferred.promise;
    };

    self.getCharacterClass = function(classId) {
        
        var deferred = $q.defer();

        DaoService.getClassMap().then(function(classMap){
            deferred.resolve(classMap[classId]);
        });

        return deferred.promise;
    };

    self.getCharacterRace = function(raceId) {

        var deferred = $q.defer();

        DaoService.getRaceMap().then(function(raceMap){
            deferred.resolve(raceMap[raceId]);
        });
        return deferred.promise;
    };

}]);
