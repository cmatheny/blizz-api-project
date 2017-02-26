/*
 * Intended to be used as a globally available reference to the currently loaded character.
 */
angular.module("routerApp").service("CurrentCharacter", ['CharacterLogicService', '$q', 'Character', function (CharacterLogicService, $q, Character) {

        var self = this;

        var logic = CharacterLogicService;

        // Run on service startup. Basically anonymous function but named for debug log.
        (function init() {
            self.character = new Character();

            // sets from session storage if available
            try {
                self.character.setFieldsFromSessionStorage(sessionStorage.character);
            } catch (e) {
            }
        })();

        self.getCharacter = function () {
            return self.character;
        };

        self.setCharacter = function (server, name) {
            self.character = new Character();
            self.character.thumbUrl = "resources/loading.gif"; // loading
            logic.getNewCharacter(server, name).then(function (promises) {
                if (promises === false) {
                    self.character.thumbUrl = "resources/char-not-found.png";
                } else {
                    // display when everything done loading
                    $q.all(promises).then(function (data) {
                        self.character.setFieldsFromData(data);
                        self.storeCharacter();
                    });

                }
            });
        };

        self.storeCharacter = function () {
            sessionStorage.character = JSON.stringify(self.character);
            console.log(JSON.parse(sessionStorage.character));
            console.log('stored');
        };

        self.setStats = function (statsData) {
            self.character.setStatsFromData(statsData);
            self.storeCharacter();
        };

        self.requestStats = function () {

            var promise = logic.getStats(self.character);
            promise.then(self.setStats);

            return promise;
        };

    }]);

angular.module("routerApp").service("CharacterLogicService", ['$q', 'CharacterDao', 'Character', function ($q, CharacterDao, Character) {

        var self = this;

        self.character = new Character();

        self.getNewCharacter = function (server, name) {

            var deferred = $q.defer();

            self.character = new Character();
            //self.characters.push(self.character);

            CharacterDao.getCharacter(server, name).then(function (request) {
                var promises = [];

                self.character.setFieldsFromData(request);

                promises.push(getCharacterClass(request.class));
                promises.push(getCharacterRace(request.race));
                promises.push(CharacterDao.getCharacterImage(request.thumbnail));
                console.log(request);
                $q.all(promises).then(function (details) {
                    request.className = details[0];
                    request.raceName = details[1];
                    request.thumbUrl = details[2];
                    deferred.resolve(request);
                });
                return promises;
            }, function () {
                deferred.resolve(false);
            });

            return deferred.promise;
        };

        self.getStats = function (character) {
            var deferred = $q.defer();
            CharacterDao.getCharacter(character.realm, character.name, 'stats').then(function (data) {
                deferred.resolve(data.stats);
            });

            return deferred.promise;
        };

        var getCharacterClass = function (classId) {

            var deferred = $q.defer();

            CharacterDao.getClassMap().then(function (classMap) {
                deferred.resolve(classMap[classId]);
            });

            return deferred.promise;
        };

        var getCharacterRace = function (raceId) {

            var deferred = $q.defer();

            CharacterDao.getRaceMap().then(function (raceMap) {
                deferred.resolve(raceMap[raceId]);
            });
            return deferred.promise;
        };

    }]);
