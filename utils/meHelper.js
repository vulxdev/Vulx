const ConfigHelper = require('./configHelper');
const { createJson } = require('./jsonHelper');
const { vulxAxios } = require('./axiosHelper');
const logger = require('./logger');
const fs = require('fs/promises');

class Helper {
	constructor() {
		this.valorantJson = null;
		this.timer = null;
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
		this.valorantJson = await ConfigHelper.getValConfig();
	}

	async _initializeTimer() {
		await this.emitMeRequest();
		this.timer = setInterval(this.emitMeRequest.bind(this), 30000);
	}

	async _updateConfig(valorantConfig) {
		this.valorantJson = valorantConfig;
		await fs.writeFile("./valorant.json", JSON.stringify(valorantConfig), (err) => console.log(err));
	}

	async emitMeRequest() {
		const json = await createJson(this.valorantJson, false);
		vulxAxios.put("/chat/v2/me", json)
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

	async getValorantJson() {
		return this.valorantJson;
	}
}

module.exports = new Helper();