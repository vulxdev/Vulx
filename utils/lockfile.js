/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

var fs = require('fs');
const Logger = require('./Logger')

class Helper {
	constructor() {
		this.port, this.password, this.protocol;
		this.LockfilePath = process.env.LOCALAPPDATA + '\\Riot Games\\Riot Client\\Config\\lockfile';
		this.RetryAmount = 40;
		this.RetryTimeout = 2000;
	}

	async _sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async _getLockfile() {
		if (!fs.existsSync(this.LockfilePath)) return false;

		const lockfile = fs.readFileSync(this.LockfilePath, { encoding:'utf8' })
			.toString()
			.split(":");
		this.port = lockfile[2];
		this.password = lockfile[3];
		this.protocol = lockfile[4];

		return true;
	}

	async _initializeLockFile() {
		for (let i = 0; i < this.RetryAmount; i++) {
			if (await this._getLockfile()) break;
			Logger.debug('Failed to get lockfile, retrying..');
			await this._sleep(this.RetryTimeout);
		}

		if (!this.port || !this.password || !this.protocol) {
			Logger.error('Failed to get lockfile, exiting..');
			process.exit();
		}

		Logger.info('Got lockfile!')

		return true;
	}

	async getLockfile() {
		if (!this.LockfileInitialized) {
			Logger.info('Grabbing lockfile..')
			this.LockfileInitialized = this._initializeLockFile();;
		}

		return this.LockfileInitialized;
	}
}

module.exports = new Helper();