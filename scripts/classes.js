angular.module("routerApp").factory("Character", ['FormatService', function(FormatService) {
    var Character = function() {
        
        var self = this;
        
        self.stats = {
            health: undefined,
            strength: undefined,
            agility: undefined,
            intellect: undefined,
            stamina: undefined,
            crit: undefined,
            critRating: undefined,
            haste: undefined,
            hasteRating: undefined,
            mastery: undefined,
            masteryRating: undefined,
            versatility: undefined,
            versatilityRating: undefined,
        };

        self.talents = [];
        self.gear = {};
        
        self.getName = () => self.name;
        
        self.getRealm = () => self.realm;
        
        self.getLevel = () => self.level;
        
        self.getClass = () => self.class;
        self.setClass = (classStr) => self.class = classStr;
        
        self.getRace = () => self.race;
        self.setRace = (raceStr) => self.race = raceStr;

        self.getFaction = () => self.faction;
        self.setFaction = (factionStr) => self.faction = factionStr;
        
        self.getGuild = () => self.guild;

        self.getThumbUrl = () => self.thumbUrl;
        self.setThumbUrl = (thumbUrl) => self.thumbUrl = thumbUrl;

        self.getStats = () => self.stats;
        self.getTalents = () => self.talents;
        self.getGear = () => self.gear;
        
        self.hasStats = () => !angular.equals(self.stats, {});
        self.hasTalents = () => !angular.equals(self.talents, []);
        self.hasGear = () => !angular.equals(self.gear, {});

        self.setFieldsFromSessionStorage = function(json) {
            var data = JSON.parse(json);
            console.log(data);
            Object.keys(data).forEach(function(key) {
                self[key] = data[key];
            });
        };

        self.setFieldsFromData = function(data) {
            self.name = data.name;
            self.realm = data.realm;
            self.level = data.level;
            if (data.className) self.class = data.className;
            self.classId = data.class;
            if (data.raceName) self.race = data.raceName;
            self.raceId = data.race;
            self.factionId = data.faction;
            if (self.factionId === 0) self.faction = "Alliance";
            else if (self.factionId === 1) self.faction = "Horde";
            if (data.guild) self.guild = "<" + data.guild.name + ">";
            else self.guild = "";
            if (data.thumbUrl) self.thumbUrl = data.thumbUrl;
            console.log(self);
        };

        self.setStatsFromData = function(sData) {
            var s = self.stats;
            s.health = sData.health;
            s.strength = sData.str;
            s.agility = sData.agi;
            s.intellect = sData.int;
            s.stamina = sData.sta;
            s.critRating = sData.critRating;
            s.crit = sData.crit;
            s.hasteRating = sData.hasteRating;
            s.haste = sData.haste;
            s.masteryRating = sData.masteryRating;
            s.mastery = sData.mastery;
            s.versatilityRating = sData.versatility;
            s.versatility = sData.versatilityDamageDoneBonus;
            s.versatilityReduction = sData.versatilityDamageTakenBonus;
            console.log(self);
        };
    };
    
    return Character;
}]);

angular.module("routerApp").factory("Talent", function() {
    var Talent = function() {

    };

    return new Talent;
});
