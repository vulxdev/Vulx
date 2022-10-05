/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const axios = require('axios');
const https = require('https');

const LockFile = require('./lockfile');

class Helper {
	constructor() {
		const vulxAxios = axios.create({
			timeout: 1000,
			headers: {
				common: {
					'User-Agent': 'ShooterGame/8 Windows/10.0.19042.1.768.64bit', 
					'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuNzY4LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
					'X-Riot-ClientVersion': 'release-04.07-shipping-13-697073',
					'Content-Type': 'application/json'
				},
				put: {
					'Content-Type': 'application/json'
				}
			},
			httpsAgent: new https.Agent({  
				rejectUnauthorized: false
			})
		});

		vulxAxios.interceptors.request.use(function(config) {
			config.baseURL = `https://127.0.0.1:${LockFile.port}`;
			config.headers.common['Authorization'] = 'Basic ' + Buffer.from(`riot:${LockFile.password}`).toString('base64');

			return config;
		})

		vulxAxios.interceptors.response.use(function (response) {
			return response;
		  }, function (error) {
			const originalRequest = error.config;
			if (error.response && error.response.status === 401) {
				LockFile._initializeLockFile();
				this._doInitialize();
				return this.axios(originalRequest);
			}

			return Promise.reject(error);
		});

		this.axios = vulxAxios;
	}

	// initialization functions
	async _doInitialize() {
		await this._initializeLockfile();
		await this._initializeChatSession();
    }

    async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeLockfile() {
		await LockFile.getLockfile();
	}

	async _initializeChatSession() {
		const response = await this.axios.get('/chat/v1/session').then(res => res.data).catch(this._initializeChatSession);
		if (response.loaded === true && response.state === 'connected') return true;
		else return this._initializeChatSession();
	}

	async getVulxAxios() {
		await this._initialize();
		return this.axios;
	}
}

module.exports = new Helper();