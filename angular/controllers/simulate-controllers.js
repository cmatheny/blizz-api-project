angular.module("routerApp").controller("SimulateMainCtrl", ['SimcService', function(simc) {
    var self = this;

    // defaults for faster testing
    self.realmInput="emerald-dream";
    self.nameInput="sarrial";
    console.log(simc.socket);
    self.submitSimulation = () => simc.socket.submitSimulation(self.realmInput, self.nameInput);
}]);

