/* global CMGLOBALVAR */

angular.module("DogModule").controller("HomeCtrl", function() {
	
});

angular.module("DogModule").controller("CharacterCtrl", function(GetCharacterService) {
	var self = this;
    var thumbnail;

    self.getCharacter = function(server,character) {
        var promise = GetCharacterService.sendCharacterRequest(server, character);

        promise.then(function(response){
        //console.log("success");
        console.log(response);
        console.log(response.data);
        self.data = response.data;
        self.thumbnail="http://render-api-us.worldofwarcraft.com/static-render/us/" + response.data.thumbnail;


        }, function(response){
            console.log("failure");
            console.log(response);
            alert("Not Found");
        });

    };
        
});
