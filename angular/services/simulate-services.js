/*
 * Intended to be used as a globally available reference to the currently loaded character.
 */
angular.module("routerApp").service("SimcService", ['SimcApi', function (simcApi) {

        var self = this;
        
        self.socket = simcApi.connect();
        
        self.getNewConnection = function() {
            self.socket.close();
            self.socket = simcApi.connect();
        };
        
        console.log(self.socket);

}]);