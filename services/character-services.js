/*
 * Intended to be used as a globally available reference to the currently loaded character.
 */
angular.module("routerApp").service("CurrentCharacter", function(CharacterLogicService,$timeout,$q) {
    
    var self = this;
    
    var logic = CharacterLogicService;
    self.character = logic.getCharacter();
    
    self.getCharacter = function(){
        console.log(self.character);
        return self.character;
    };
    
    var syncCharacter = function() {
        self.character = logic.getCharacter();
    };
    
    self.setCharacter = function(server,name){
        logic.getNewCharacter(server,name).then(function(promises){
            $timeout(function(){
                syncCharacter();
                $q.all(promises).then(syncCharacter);
            },100);
        });
        
        syncCharacter();
    };
    
});

angular.module("routerApp").service("CharacterLogicService", function($q,DaoService,Character) {

    var self = this;
    self.charData = {};
    
    self.characters = [];
    self.character = new Character();
    
    /*
     * Remove all non-inherited fields from charData object without re-instantiating the object.
     * This allows the controller to keep the same reference to the service object
     * when clearing the service object.
     */
    var clearCharacter = function() {
        for (var field in self.charData){
            if (self.charData.hasOwnProperty(field)){
                delete self.charData[field];
            }
        }
    };
    
    self.getCharacter = function() {
        return self.character;
    };
    
    /*
     * Set fields of character without reassigning a new object to the variable,
     * so other references to it are not lost.
     */
    self.setCharacter = function(charData) {
        clearCharacter();
        Object.keys(charData).forEach(function(key) {
            self.charData[key] = charData[key];
          });
    };
    
    self.getName = function() {
        return self.charData.name;
    };

    self.getNewCharacter = function(server,name){
        
        clearCharacter();
        self.character = new Character();
        var request = DaoService.getCharacter(server,name);
        
        request.$promise.then(function(){
            var promises = [];
            
            self.character.setFieldsFromData(request);
            self.setCharacter(request);
            promises.push(self.setCharacterClass());
            promises.push(self.setCharacterRace());
            promises.push(self.setCharacterThumbnail());
            return promises;
        },function(){
            self.character.thumbUrl = "resources/char-not-found.png";
        });
        
        self.character.thumbUrl = "resources/loading.gif"; // loading
        
        return request.$promise;
    };

    self.setCharacterClass = function() {
        var promise = DaoService.getClassMap();
        promise.then(function(classMap){
            self.character.class = classMap[self.charData.class];
        });
        return promise;
    };

    self.setCharacterRace = function() {
        var promise = DaoService.getRaceMap();
        promise.then(function(raceMap){
            self.character.race = raceMap[self.charData.race];
        });
        return promise;
    };

    self.setCharacterThumbnail = function() {
        var deferred = $q.defer();

            //full image url
//        var url="https://render-us.worldofwarcraft.com/character/emerald-dream/58/47318074-profilemain.jpg"
        var url="https://render-api-us.worldofwarcraft.com/static-render/us/" + self.charData.thumbnail;

        var tester = new Image();

        tester.onload = function() {
            deferred.resolve();
        };
        tester.onerror = function() {
            url = "resources/image-not-found.png";
            deferred.resolve();
        };

        tester.src = url;

        deferred.promise.then(function(){
            self.charData.thumbUrl = url;
            self.character.setThumbUrl(url);
        });
        return deferred.promise;
    };
});
