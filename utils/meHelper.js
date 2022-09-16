/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const ConfigHelper = require('./ConfigHelper');
const { createJson } = require('./jsonHelper');
const AxiosHelper = require('./AxiosHelper');
const Logger = require('./Logger');

class Helper {
	constructor() {
		this.timer = null;
		this.leagueExperiment = false;
	}

	async _doInitialize() {
		await this._initializeTimer();
	}

	async init() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeTimer() {
		await this.emitMeRequest();
		this.timer = setInterval(this.emitMeRequest.bind(this), 30000);
	}

	async _updateConfig(valorantConfig) {
		ConfigHelper.valorantConfig = valorantConfig;
		await ConfigHelper.saveConfig();
	}

	async _updateConfigLeague(leagueConfig) {
		ConfigHelper.leagueConfig = leagueConfig;
		await ConfigHelper.saveConfig();
	}

	async emitMeRequest() {
		const json = await createJson(await ConfigHelper.getValorantConfig(), this.leagueExperiment);
		if (!this.vulxAxios) this.vulxAxios = await AxiosHelper.getVulxAxios();
		this.vulxAxios.put("/chat/v2/me", json)
			.then((res) => {
				if (!res.isAxiosError) {
					Logger.debug(`Successfully sent /me request to local Valorant API`)
				}
			})
			.catch(() => Logger.info("Failed sending /me request to local Valorant API, has the game finished initializing?"));
	}

	async updateRequest(valorantConfig) {
		await this._updateConfig(valorantConfig);
		await this.emitMeRequest();
	}

	async updateRequestLeague(leagueConfig) {
		await this._updateConfigLeague(leagueConfig);
		await this.emitMeRequest();
	}

	async toggleLeagueExperiment() {
		this.leagueExperiment = !this.leagueExperiment;
		await this.emitMeRequest();
	}
}

module.exports = new Helper();