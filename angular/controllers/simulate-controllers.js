angular.module("routerApp").controller("SimulateMainCtrl", ['SimcService', function(simc) {
    var self = this;
    self.simc = simc;
    // defaults for faster testing
    self.realmInput="emerald-dream";
    self.nameInput="sarrial";
    self.jobs = simc.jobs;
    self.job_ids=self.simc.job_ids;
    self.current_job = null;
    self.submitSimulation = () => simc.submitArmorySimulation(self.realmInput, self.nameInput);
    self.getJobs = function(index) {
        self.job_ids=self.simc.job_ids;
        return self.jobs[self.simc.job_ids[index]];
    };
    self.update = function() {
        if (self.current_job === null && self.job_ids[0] !== undefined) {
            self.setCurrentJob(self.job_ids[0]);
        }
    };
    self.setCurrentJob = function(job_id) {
        self.current_job = self.jobs[job_id];
        console.log(self.current_job);
    };
    
    self.removeJob = function(job_id) {
        if (self.current_job.job_id === job_id) {
            var update_view = true;
        }
        
        if (self.current_job.status === "Queued" ||
                self.current_job.status === "Running") {
            simc.cancelJob(job_id);
        }
        
        console.log(self.jobs);

        var job_id_index = self.job_ids.indexOf(job_id);
        self.job_ids.splice(job_id_index, 1);
        console.log(simc.jobs);
        
        if (!update_view) {
            return;
        }
        
        if (self.job_ids.length === 0) {
            self.current_job = null;
        } else if (job_id_index < self.job_ids.length) {
            self.setCurrentJob(self.job_ids[job_id_index]);
        } else self.setCurrentJob(self.job_ids[job_id_index-1]);
        console.log(self.job_ids, " ", job_id_index);
    };
    
    self.tabIsSelected = function(job_id) {
        console.log(self.current_job.job_id === job_id);
        return self.current_job.job_id === job_id;
    };
    
    self.getJobs();
    simc.registerCallback(self.update);
}]);
