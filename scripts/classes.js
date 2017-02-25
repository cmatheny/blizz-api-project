angular.module("routerApp").factory("Character", function() {
    var Character = function() {
        
        var self = this;
        
        self.name;
        self.realm;
        self.level;
        self.class;
        self.classId;
        self.race;
        self.raceId;
        self.guild;
        self.faction;
        self.thumbUrl;
        self.stats = {
            strength: undefined,
            agility: undefined,
            intellect: undefined,
            crit: undefined,
            haste: undefined,
            mastery: undefined
        };
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
        
        self.setFieldsFromData = function(data) {
            self.name = data.name;
            self.realm = data.realm;
            self.level = data.level;
            self.classId = data.class;
            self.raceId = data.race;
            self.factionId = data.faction;
            if (self.factionId === 0) self.faction = "Alliance";
            else if (self.factionId === 1) self.faction = "Horde";
            self.guild = data.guild.name;
            console.log(self);
        };
        
    };
    
    return Character;
    
});
