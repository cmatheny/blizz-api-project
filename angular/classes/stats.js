angular.module("routerApp").factory("Stats", function () {
    var Stats = function () {
        var self = this;

        self.health;
        self.strength;
        self.agility;
        self.intellect;
        self.stamina;
        self.crit;
        self.critRating;
        self.haste;
        self.hasteRating;
        self.mastery;
        self.masteryRating;
        self.versatility;
        self.versatilityRating;
        self.armor;
        self.block;
        self.dodge;
        self.parry;

        self.setFieldsFromSessionStorage = function (json) {
            var data = JSON.parse(json);
            console.log(data);
            Object.keys(data).forEach(function (key) {
                self[key] = data[key];
            });
        };

        self.setFieldsFromData = function (sData) {

            // Primary
            self.health = sData.health;
            self.strength = sData.str;
            self.agility = sData.agi;
            self.intellect = sData.int;
            self.stamina = sData.sta;

            // Secondary
            self.critRating = sData.critRating;
            self.crit = sData.crit;
            self.hasteRating = sData.hasteRating;
            self.haste = sData.haste;
            self.masteryRating = sData.masteryRating;
            self.mastery = sData.mastery;
            self.versatilityRating = sData.versatility;
            self.versatility = sData.versatilityDamageDoneBonus;
            self.versatilityReduction = sData.versatilityDamageTakenBonus;

            // Tertiary - not correct on API currently
            self.leech = sData.leech;
            self.leechRating = sData.leechRating;
            self.speed = sData.speedRatingBonus;
            self.speedRating = sData.speed;

            // Defensive
            self.armor = sData.armor;
            self.block = sData.block;
            self.dodge = sData.dodge;
            self.parry = sData.parry;
        };
    };

    return Stats;
});
