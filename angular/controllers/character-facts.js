angular.module("routerApp").controller("CharacterFactsCtrl", ['CurrentCharacter', '$state', function (CurrentCharacter, $state) {
        var self = this;

        self.facts;

        var getCharacter = function () {
            self.character = CurrentCharacter.getCharacter();
            self.facts = self.character.facts;
        };

        /*
         * Returns a 3 element array where fact[0] is the index of the statistic + 1,
         *  fact[1] is the statistic name, and fact[2] is the statistic quantity.
         */
        self.getRandomFact = function () {
            var index = Math.floor(Math.random() * self.facts.length);
            if (index === self.facts.length) {
                index--;
            }
            var fact = [index+1, self.facts[index].name, self.facts[index].answer];
            console.log(fact);
            self.fact = fact;
        };

        (function init() {
            getCharacter();

            if (angular.equals(self.character.getName(), undefined)) {
                $state.go("character.search");
                return;
            }

            if (!self.character.hasFacts()) {
                CurrentCharacter.requestFacts().then(function () {
                    getCharacter();
                    self.getRandomFact();
                });
                console.log('loading facks!');
            } else {
                console.log('haz facks!');
                self.getRandomFact();
            }

        })();

    }]);
