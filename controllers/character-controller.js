/* global CMGLOBALVAR */

angular.module("routerApp").controller("CharacterCtrl", function() {
    var self = this;
});

angular.module("routerApp").controller("CharacterMainCtrl", function(GetCharacterService,ApiSearchService) {
    var self = this;
    var thumbnail;
    self.serverInput="emerald-dream";
    self.nameInput="sarrial";
    
    self.getCharacterClass = function() {
        console.log(self.characterClasses);
        var classId = self.data.class;
        var begin = function() {
            if (this.characterClasses !== undefined) {
                updateClass();
            } else {
            var urlStub = "data/character/classes";
            var getFromApi = ApiSearchService.sendApiRequest(urlStub);
            self.characterClasses = [undefined];

            getFromApi.then(function(response) {
                console.log(response);
                for (var index in response.data.classes) {
                    self.characterClasses.push(response.data.classes[index].name);
                }
                updateClass();
            });
            }
        };
        
        var updateClass = function() {
            console.log(self.characterClasses);
            self.data.charClass=self.characterClasses[classId];
            console.log(self.data.charClass);
        };

        begin();
    };
    
    self.getCharacter = function() {
        var promise = GetCharacterService.sendCharacterRequest(self.serverInput, self.nameInput);

        promise.then(function(response){
        //console.log("success");
        console.log(response);
        console.log(response.data);
        self.data = response.data;
        self.thumbnail="http://render-api-us.worldofwarcraft.com/static-render/us/" + response.data.thumbnail;
        afterGetCharacter();

        }, function(response){
            console.log("failure");
            console.log(response);
            alert("Not Found");
        });
        
        var afterGetCharacter = function() {
            self.getCharacterClass();
        };

    };
    
});
