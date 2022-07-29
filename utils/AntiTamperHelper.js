const exec = require('child_process').exec;

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

class AntiTamper {
	constructor() {}

	async _doInitialize() {

	}

	async initialize() {
		if (!this.initializationPromise) {
			this.initializationPromise = this._doInitialize();
		}
		return this.initializationPromise;
	}

	async _initializeHeartBeat() {
		setTimeout(this._check.bind(this), 5000);
	}

	async _check() {
		if (typeof v8debug === 'object' || isRunning('Fiddler.exe') || isRunning()) {
			this._selfDestruct();
		}
	}

	async _selfDestruct() {

	}
}

module.exports = new AntiTamper();