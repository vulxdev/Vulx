const axios = require('axios');

class User {
    constructor(puuid, name, teamID, accountLevel, character, playerCard, playerTitle, skins) {
        this.puuid = puuid;
        this.name = name;
        this.teamID = teamID;
        this.accountLevel = accountLevel;
        this.character = character;
        this.playerCard = playerCard;
        this.playerTitle = playerTitle;
        this.skins = skins;
    }
}

class lookup {
    constructor() {
        this.weaponSkins = null;
        this.agents = null;
    }

    // initialization functions
    async _doInitialize() {
        await this._initializeWeaponSkins();
        await this._initializeAgents();
    }

    async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

    async _initializeWeaponSkins() {
        this.weaponSkins = await axios.get('https://valorant-api.com/v1/weapons/skins').then(res => res.data.data);
    }

    async _initializeAgents() {
        this.agents = await axios.get('https://valorant-api.com/v1/agents').then(res => res.data.data);
    }

    // public functions
    async getWeaponSkins() {
        await this._initialize();
        return this.weaponSkins;
    }

    async getAgents() {
        await this._initialize();
        return this.agents;
    }
}

module.exports = new lookup();