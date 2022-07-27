const ConfigHelper = require('./configHelper');
const { createJson } = require('./jsonHelper');
const AxiosHelper = require('./axiosHelper');
const logger = require('./logger');
const fs = require('fs/promises');

class Helper {
	constructor() {
		this.valorantJson = null;
		this.leagueJson = null;
		this.timer = null;
		this.leagueExperiment = false;
	}

	async _doInitialize() {
		await this._initializeConfig();
		await this._initializeTimer();
	}

	async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeConfig() {
		this.valorantJson = await ConfigHelper.getValorantConfig();
		this.leagueJson = await ConfigHelper.getLeagueConfig();
	}

	async _initializeTimer() {
		await this.emitMeRequest();
		this.timer = setInterval(this.emitMeRequest.bind(this), 30000);
	}

	async _updateConfig(valorantConfig) {
		this.valorantJson = valorantConfig;
		await fs.writeFile("./cfg/valorant.json", JSON.stringify(valorantConfig), (err) => console.log(err));
	}

	async _updateConfigLeague(leagueConfig) {
		this.leagueJson = leagueConfig;
		await fs.writeFile("./cfg/league.json", JSON.stringify(leagueConfig), (err) => console.log(err));
	}

	async emitMeRequest() {
		const json = await createJson(this.valorantJson, this.leagueExperiment);
		if (!this.vulxAxios) this.vulxAxios = await AxiosHelper.getVulxAxios();
		this.vulxAxios.put("/chat/v2/me", json)
			.then((res) => {
				if (!res.isAxiosError) {
					logger.debug(`Successfully sent /me request to local Valorant API`)
				}
			})
			.catch(() => logger.debug("Failed sending /me request to local Valorant API, has the game finished initializing?"));
	}

	async updateRequest(valorantConfig) {
		await this._updateConfig(valorantConfig);
		await this.emitMeRequest();
	}

	async updateRequestLeague(leagueConfig) {
		await this._updateConfigLeague(leagueConfig);
		await this.emitMeRequest();
	}

	async getValorantJson() {
		return this.valorantJson;
	}

	async toggleLeagueExperiment() {
		this.leagueExperiment = !this.leagueExperiment;
		await this.emitMeRequest();
	}
}

module.exports = new Helper();