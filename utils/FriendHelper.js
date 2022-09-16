const ConfigHelper = require('./ConfigHelper');
const { createJson } = require('./jsonHelper');
const AxiosHelper = require('./AxiosHelper');
const logger = require('./logger');
const fs = require('fs/promises');

class FHelper {
	constructor() {
		this.friends, this.presences, this.vulxAxios;
	}

	async _initialize() {
		if (!this.initializePromise) {
			this.initializePromise = await this._doInitialize();
		}

		return this.initializePromise;
	}

	async _doInitialize() {
		await this._initializeVulxAxios();
	}

	async _initializeVulxAxios() {
		this.vulxAxios = await AxiosHelper.getVulxAxios();
	}

	async getFriends() {
		await this._initialize();

		const friends = await this.vulxAxios.get(`/chat/v4/friends`).then(res => res.data.friends);
		this.friends = friends;
		return friends;
	}

	async getPresences() {
		await this._initialize();

		const presences = await this.vulxAxios.get(`/chat/v4/presences`).then(res => res.data.presences);
		this.presences = presences;
		return presences;
	}
}

module.exports = new FHelper();