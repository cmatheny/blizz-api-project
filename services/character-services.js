angular.module("routerApp").service("CharacterLogicService", function(ApiSearchService,$q,DaoService) {

    var self = this;
    self.charData = {};
    
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
        return self.charData;
    };

    self.setCharacter = function(charData) {
        self.charData = charData;
    };
    
    self.getNewCharacter = function(server,name){
        clearCharacter();
        self.setCharacter(DaoService.getCharacter(server,name));
        self.charData.$promise.then(function(){
            self.setCharacterClass();
            self.setCharacterRace();
            self.setCharacterThumbnail();
        },function(){
            console.log('nupe');
            self.charData.thumbUrl = "resources/char-not-found.png";
        });
        
        self.charData.thumbUrl = "resources/loading.gif"; // loading
        return self.charData;
    };

    self.setCharacterClass = function() {

        if (self.characterClassMap) {
            self.charData.charClass = self.characterClassMap[self.charData.class];
        } else {
            self.getClassMapPromise().then(function(){
                console.log("class update done");
                self.setCharacterClass();
            });
        }
    };

    self.setCharacterRace = function() {

        if (self.characterRaceMap) {
            self.charData.charRace = self.characterRaceMap[self.charData.race];
        } else {
            self.getRaceMapPromise().then(function(){
                console.log("race update done");
                self.setCharacterRace();
            });
        }
    };

    self.setCharacterThumbnail = function() {

        var deferred = $q.defer();

        var url="https://render-api-us.worldofwarcraft.com/static-render/us/" + self.charData.thumbnail;

        console.log('starting image check');


        var tester = new Image();

        tester.onload = function() {
            console.log("image update done");
            deferred.resolve();
        };
        tester.onerror = function() {
            url = "resources/image-not-found.png";
            deferred.resolve();
        };

        tester.src = url;

        deferred.promise.then(function(){
            self.charData.thumbUrl = url;
        });

    };

    // TODO: move to DAO and refactor as $resource
    self.getClassMapPromise = function() {
        var deferred = $q.defer();
        if (self.characterClassMap) {
            deferred.resolve(self.characterClassMap);
        } else {

            var urlStub = "data/character/classes";
            var getFromApi = ApiSearchService.sendApiRequest(urlStub);
            
            // class definitions start at 1
            self.characterClassMap = [undefined];

            getFromApi.then(function(response) {
                console.log(response);
                for (var index in response.data.classes) {
                    self.characterClassMap.push(response.data.classes[index].name);
                }
                deferred.resolve(self.characterClassMap);
            });
        }
        console.log(deferred.promise);
        return deferred.promise;
    };
    
    // TODO: move to DAO and refactor as $resource
    self.getRaceMapPromise = function() {
        var deferred = $q.defer();
        if (self.characterRaceMap) {
            deferred.resolve(self.characterRaceMap);
        } else {

            var urlStub = "data/character/races";
            var getFromApi = ApiSearchService.sendApiRequest(urlStub);

            // race definitions start at 1
            self.characterRaceMap = [undefined];

            getFromApi.then(function(response) {
                console.log(response);
                for (var index in response.data.races) {
                    self.characterRaceMap.push(response.data.races[index].name);
                }
                deferred.resolve(self.characterRaceMap);
            });
        }
        console.log(deferred.promise);
        return deferred.promise;
    };
});
