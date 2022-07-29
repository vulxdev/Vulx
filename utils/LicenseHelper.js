const axios = require('axios');
const ValorantAPI = require('./ValorantAPI');
const os = require('node:os')
const crypto = require('crypto');

class Client {
    constructor() {
        this.axios = axios.create();
		this.puuid = null;
		this.region = null;
		this.license = null;
		this.licenseServer = 'https://license.aquaplays.xyz';
		this.isDev = false;
		this.hwid = crypto.createHash('sha256').update(os.hostname() + os.arch() + os.EOL + os.cpus() + os.homedir() + os.platform()).digest('base64')
    }
    
    // initialization functions
    async _doInitialize() {
		await this._initializeValorantAPI();
    }

    async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeValorantAPI() {
		this.puuid = await ValorantAPI.getPUUID();
		this.region = await ValorantAPI.getRegion();
	}

	async checkLicense() {
		await this._initialize()

		return await this.axios.get(this.licenseServer + '/check-license', {
			data: {
				puuid: this.puuid,
				region: this.region,
				license: this.license,
				hwid: this.hwid
			}
		}).then(res => {
			return res.status === 200
		}).catch(err => {
			return err.status === 200
		})
	}

	async checkDev() {
		await this._initialize()

		return await this.axios.get(this.licenseServer + '/isDev', {
			data: {
				puuid: this.puuid,
				region: this.region,
				license: this.license,
				hwid: this.hwid
			}
		}).then(res => {
			this.isDev = res.status === 200;
			return res.status === 200;
		}).catch(err => {
			this.isDev = err.status === 200;
			return err.status === 200;
		})
	}
}

module.exports = new Client();