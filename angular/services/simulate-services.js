angular.module("routerApp").service("SimcService", ['SimcApi', '$timeout', function (simcApi, $timeout) {

        var self = this;
        
        self.socket = simcApi.getSocket();
        self.jobs = [];

        var Job = function(job_id, status) {
            this.job_id = job_id;
            this.status = status;
            this.output = [];
            return this;
        };

        self.jobs.push(new Job(0, "Running"));

        var socketMethods = {

            output(data) {
//                var job_index = self.jobs.indexOf(data.job_id);
//                self.jobs[job_index].output.push(data.message);
                if (data.message==='') {
                    data.message = ' ';
                }
                console.log(data.message);
                self.jobs[0].output.push(data.message);
                // console.log(data);
            },

            message(data) {
                console.log(data);
            },

            result(data) {
                console.log(data);
                console.log(typeof(self.jobs[0].output[5]));
            },

            job_cancelled(data) {
                var job_index = self.jobs.indexOf(data.job_id);
                self.jobs[job_index].status = "Cancelled";
            },
            
            job_completed(data) {
                var job_index = self.jobs.indexOf(data.job_id);
                self.jobs[job_index].status = "Completed";
            },

            job_failed(data) {
                var job_index = self.jobs.indexOf(data.job_id);
                self.jobs[job_index].status = "Failed";
            },

            job_queued(data) {
                self.jobs.push(new Job(data.job_id, "Queued"));
            },

            job_started(data) {
                var job_index = self.jobs.indexOf(data.job_id);
                if (job_index === -1) {
                    self.jobs.push(new Job(data.job_id, "Running"));
                } else {
                    self.jobs[job_index].status = "Running";
                }
            }
        };

        self.socket.onmessage = function(evt) {
            var message = JSON.parse(evt.data);
            var method = message[0];
            var data = message[1];
            try {
                socketMethods[method](data);
//                self.callback();
                $timeout(angular.noop);
            } catch (TypeError) {
                console.log(message);
                TypeError.message = "Method '" + method + "' not implemented";
                throw TypeError;
            }
        };

        self.submitArmorySimulation = function(realm, name) {
            self.socket.send(JSON.stringify(
                [
                    "simulate",
                    {
                        "realm": realm,
                        "name" : name
                    }
                ]
            ));
        };

        self.registerCallback = function(callback) {
            self.callback = callback;
        };

}]);
