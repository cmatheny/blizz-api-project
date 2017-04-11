angular.module("routerApp").controller("SimulateMainCtrl", ['SimcService', '$timeout', function(simc, $timeout) {
    var self = this;
    self.simc = simc;
    // defaults for faster testing
    self.realmInput="emerald-dream";
    self.nameInput="sarrial";
    self.jobs = simc.jobs;
    self.submitSimulation = () => simc.submitArmorySimulation(self.realmInput, self.nameInput);
    self.getJobs = function() {
        console.log("update");
        console.log(self.jobs);
        return simc.jobs;
    };
    self.update = function() {
//        $timeout(function() {self.jobs = simc.jobs;},10);
    };
    simc.registerCallback(self.update);
}]);
