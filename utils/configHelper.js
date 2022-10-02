/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const fs = require('fs');
const { homedir } = require('os');

const vulxConfigPath = `${homedir()}/AppData/Local/Vulx/config/`;

class Helper {
	constructor() {
		this.valorantConfig;
		this.leagueConfig;
		this.vulxConfig;
		this.experimentsConfig;
	}

	// initialization functions
	async _doInitialize() {
		await this._initializeDirectory();
		await this._initializeConfig();
    }

    async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeConfig() {
		this.valorantConfig = await this._getAndCreateIfNotExistsValorantConfig();
		this.leagueConfig = await this._getAndCreateIfNotExistsLeagueConfig();
		this.vulxConfig = await this._getAndCreateIfNotExistsVulxConfig();
		this.experimentsConfig = await this._getAndCreateIfNotExistsExperimentsConfig();
	}

	async _initializeDirectory() {
		if (!fs.existsSync(vulxConfigPath)) {
			fs.mkdirSync(vulxConfigPath, { recursive: true });
		}
	}

	async _getAndCreateIfNotExistsValorantConfig() {
		if (!fs.existsSync(vulxConfigPath + 'valorant.json')) {
			await this._createValorantConfig();
		} else {
			await this._getValorantConfig();
		}

		return this.valorantConfig;
	}

	async _getAndCreateIfNotExistsLeagueConfig() {
		if (!fs.existsSync(vulxConfigPath + 'league.json')) {
			await this._createLeagueConfig();
		} else {
			await this._getLeagueConfig();
		}

		return this.leagueConfig;
	}

	async _getAndCreateIfNotExistsVulxConfig() {
		if (!fs.existsSync(vulxConfigPath + 'vulx.json')) {
			await this._createVulxConfig();
		} else {
			await this._getVulxConfig();
		}

		return this.vulxConfig;
	}

	async _getAndCreateIfNotExistsExperimentsConfig() {
		if (!fs.existsSync(vulxConfigPath + 'experiments.json')) {
			await this._createExperimentsConfig();
		} else {
			await this._getExperimentsConfig();
		}

		return this.experimentsConfig;
	}

	async _createValorantConfig() {
		const config = {
			isValid:true,
			sessionLoopState:'INGAME',
			partyOwnerSessionLoopState:'INGAME',
			customGameName:'',
			customGameTeam:'',
			partyOwnerMatchMap:'',
			partyOwnerMatchCurrentTeam:'',
			partyOwnerMatchScoreAllyTeam:0,
			partyOwnerMatchScoreEnemyTeam:0,
			partyOwnerProvisioningFlow:'Invalid',
			provisioningFlow:'Invalid',
			matchMap:'',
			partyId:'727',
			isPartyOwner:true,
			partyState:'DEFAULT',
			maxPartySize:5,
			queueId:'Vulx - Valorant Profile Editor',
			partyLFM:false,
			partySize:1,
			tournamentId:'',
			rosterId:'',
			partyVersion:1650719279092,
			queueEntryTime:'0001.01.01-00.00.00',
			playerCardId:'30b64514-440d-1261-f863-6bbb180263f9',
			playerTitleId:'00d4d326-4edc-3229-7c28-129d3374e3ad',
			preferredLevelBorderId:'',
			accountLevel:727,
			competitiveTier:23,
			leaderboardPosition:0,
			isIdle:true
		}
	
		await fs.writeFileSync(vulxConfigPath + "valorant.json", JSON.stringify(config));
		this.valorantConfig = config;
	}

	async _createLeagueConfig() {
		const config = {
			"championId":"25",
			"companionId":"15008",
			"damageSkinId":"1",
			"gameId":"5840315011",
			"gameMode":"CLASSIC",
			"gameQueueType":"NORMAL",
			"gameStatus":"inGame",
			"iconOverride":"",
			"isObservable":"ALL",
			"level":"167",
			"mapId":"11",
			"mapSkinId":"55",
			"masteryScore":"357",
			"profileIcon":"1",
			"puuid":"a8e43daa-f78c-516b-871c-565503dd9b5e",
			"queueId":"Hiii!!!",
			"rankedLeagueDivision":"III",
			"rankedLeagueQueue":"RANKED_SOL0_5x5",
			"rankedLeagueTier":"SILVER",
			"rankedLosses'":"O",
			"rankedPrevSeasonDivision":"IV",
			"rankedPrevSeasonTier":"SILVER",
			"rankedSplitRewardLever":"0",
			"rankedWins":"38",
			"skinVariant":"91000",
			"skinname":"Talon",
			"timeStamp":"1646014091142"
		}
	
		await fs.writeFileSync(vulxConfigPath + "league.json", JSON.stringify(config));
		this.leagueConfig = config;
	}

	async _createVulxConfig() {
		const config = {
			port: 80,
			discordRpc: false,
			experimental: false,
			firstLaunch: true,
			webTooltips: true
		}
	
		await fs.writeFileSync(vulxConfigPath + "vulx.json", JSON.stringify(config));
		this.vulxConfig = config;
	}

	async _createExperimentsConfig() {
		const config = {
			league: false
		}
	
		await fs.writeFileSync(vulxConfigPath + "experiments.json", JSON.stringify(config));
		this.experimentsConfig = config;
	}

	async _getValorantConfig() {
		const config = JSON.parse(fs.readFileSync(vulxConfigPath + "valorant.json"));
		this.valorantConfig = config;
		return config;
	}

	async _getLeagueConfig() {
		const config = JSON.parse(fs.readFileSync(vulxConfigPath + "league.json"));
		this.leagueConfig = config;
		return config;
	}

	async _getVulxConfig() {
		const config = JSON.parse(fs.readFileSync(vulxConfigPath + "vulx.json"));
		this.vulxConfig = config;
		return config;
	}

	async _getExperimentsConfig() {
		const config = JSON.parse(fs.readFileSync(vulxConfigPath + "experiments.json"));
		this.experimentsConfig = config;
		return config;
	}

	async getValorantConfig() {
		await this._initialize();

		return await this._getValorantConfig();
	}

	async getLeagueConfig() {
		await this._initialize();

		return this.leagueConfig;
	}

	async getVulxConfig() {
		await this._initialize();

		return await this._getVulxConfig();
	}

	async getExperimentsConfig() {
		await this._initialize();

		return this.experimentsConfig;
	}

	async resetConfig() {
		await this._createValorantConfig();
		await this._createLeagueConfig();
		await this._createVulxConfig();
		await this._createExperimentsConfig();
	}

	async saveConfig() {
		await fs.writeFileSync(vulxConfigPath + "valorant.json", JSON.stringify(this.valorantConfig));
		await fs.writeFileSync(vulxConfigPath + "league.json", JSON.stringify(this.leagueConfig));
		await fs.writeFileSync(vulxConfigPath + "vulx.json", JSON.stringify(this.vulxConfig));
		await fs.writeFileSync(vulxConfigPath + "experiments.json", JSON.stringify(this.experimentsConfig));
	}
}

module.exports = new Helper();