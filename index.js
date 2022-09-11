const path = require('path');
const logger = require('./utils/logger');

// TODO: Figure out why the actual fuck pkg doesn't include this in the compiled exe even after having it included through pkg config
path.join(__dirname, 'public/css/style.css');
path.join(__dirname, 'public/js/vulx.load.js');
path.join(__dirname, 'public/js/vulx.request.reset.js');
path.join(__dirname, 'public/js/vulx.request.session.js');
path.join(__dirname, 'public/js/vulx.request.settings.js');
path.join(__dirname, 'public/js/vulx.request.friends.js');
path.join(__dirname, 'public/js/vulx.welcome.js'); 
path.join(__dirname, 'public/experimental.html');
path.join(__dirname, 'public/gamefeed.html');
path.join(__dirname, 'public/dashboard.html');
path.join(__dirname, 'public/index.html');
path.join(__dirname, 'public/welcome.html');

process.argv.forEach(arg => {
	if (arg.includes("debug")) {
		logger.debugMode = true;
		logger.debug("You are in debug mode, this is a feature to print verbose debug information to the console.");
	}
})

const Vulx = require('./vulx');
const LicenseHelper = require('./utils/LicenseHelper');
const fs = require('fs');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

/*async function licenseCheck(licenseKey) {
	LicenseHelper.license = licenseKey;
	if (await LicenseHelper.checkLicense()) {
		logger.info("License key accepted, starting Vulx...");
		if (!fs.existsSync('./licensekey.txt')) {
			fs.writeFileSync('./licensekey.txt', licenseKey);
		}
		await LicenseHelper.checkDev();
		await LicenseHelper.checkBeta();
	} else {
		process.exit(1);
	}
}

try {
	if (fs.existsSync('./licensekey.txt')) {
		licenseCheck(fs.readFileSync('./licensekey.txt', 'utf8'));
	} else {
		readline.question('Enter your license key: ', async licenseKey => {
			await licenseCheck(licenseKey);
		})
	}
} catch (err) {
	logger.error(err);
}*/

Vulx();