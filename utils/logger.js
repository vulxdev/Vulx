function log(logtype, str, projectType="Vulx") {
	const date_ob = new Date();
	const date = ('0' + date_ob.getDate()).slice(-2);
	const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
	const year = date_ob.getFullYear();
	const hours = date_ob.getHours();
	const minutes = date_ob.getMinutes();
	const seconds = date_ob.getSeconds();

	console.log(`\u001b[31m[\u001b[36m${year}-${month}-${date} \u001b[35m${hours}:${minutes}:${seconds}\u001b[31m] \u001b[0m${logtype} - \u001b[35m${projectType} \u001b[31m<3 \u001b[34m: \u001b[0m${typeof str === 'string' || str instanceof String ? str : JSON.stringify(str)}`);
}

exports.debugMode = false;

exports.info = (str) => {
	const logtype = '\u001b[34mINFO\u001b[0m';
	log(logtype, str);
};

exports.discord = (str) => {
	const logtype = '\u001b[34mRPC\u001b[0m';
	log(logtype, str, "Discord");
};

exports.error = (str) => {
	const logtype = '\u001b[31mERROR\u001b[0m';
	log(logtype, str);
};

exports.debug = (str) => {
	if (this.debugMode) {
		const logtype = '\u001b[35mDEBUG\u001b[0m';
		log(logtype, str);
	}
};

//Created by Syfe (Thank you Syfe :D)