angular.module("routerApp").factory("Character", function() {
    var Character = function() {
        
        var self = this;
        
        self.stats = {};
        self.talents = {};
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
            s.hasteRating = sData.hasteRating;
            s.masteryRating = sData.masteryRating;
            console.log(self);
        };
    };
    
    return Character;
});
