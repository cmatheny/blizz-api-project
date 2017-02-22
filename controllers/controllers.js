angular.module("routerApp").controller("ApiCtrl", function(ApiSearchService) {
    var self = this;

    self.sendRequest = function(urlStub) {
        var promise = ApiSearchService.sendApiRequest(urlStub);

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

angular.module("routerApp").controller("ResetKeyCtrl", function(ClearApiKeyService) {
    var self = this;
    self.resetKey = ClearApiKeyService.clearApiKey;
});