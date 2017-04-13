angular.module("routerApp").service("SimcService", ['SimcApi', '$timeout', function (simcApi, $timeout) {

        var self = this;
        
        self.socket = simcApi.getSocket();
        self.jobs = [];
        self.job_ids = [];

        var Job = function(job_id, status) {
            this.job_id = job_id;
            this.status = status;
            this.output = [];
            return this;
        };

        var socketMethods = {

            output(data) {
                if (data.message==='') {
                    data.message = ' ';
                }
                self.jobs[data.job_id].output.push(data.message);
            },
            
            error(data) {
                throw "WebSocket Error: " + data.data;
            },

            message(data) {
                console.log(data);
            },

            result(data) {
                console.log(data);
            },
            
            status(data) {
                console.log(data);
                if (self.jobs[data.job_id] === undefined) {
                    self.jobs[data.job_id] = new Job(data.job_id, data.status);
                    self.job_ids.push(data.job_id);
                } else {
                    self.jobs[data.job_id].status = data.status;
                }
            }
        };

        self.socket.onmessage = function(evt) {
            var message = JSON.parse(evt.data);
            try {
                socketMethods[message.method](message.data);
                $timeout(self.callback,0);
            } catch (TypeError) {
                console.log(TypeError);
                TypeError.message = "Method '" + message.method + "' not implemented";
                throw TypeError;
            }
        };

        self.submitArmorySimulation = function(realm, name) {
            self.socket.send(JSON.stringify(
                {
                    "method": "simulate",
                    "data": {
                        "realm": realm,
                        "name" : name
                    }
                }
            ));
        };

        self.registerCallback = function(callback) {
            self.callback = callback;
        };

}]);
