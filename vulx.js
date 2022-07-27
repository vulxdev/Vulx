// library definitions
const path = require('path');
const open = require('open');
const express = require('express');
const portfinder = require('portfinder');

// local imports
const discord = require("./utils/discordHelper");
const logger = require('./utils/logger');
const configHelper = require('./utils/configHelper');
const { axiosHelperInit } = require('./utils/axiosHelper');
const routes = require('./routes');
const MeHelper = require('./utils/meHelper');

module.exports = function() {
	const config = configHelper.getConfig();

	portfinder.basePort = config.port;
	portfinder.highestPort = config.port + 100;
	let port;

	// express definition
	const app = express();
	app.use(express.json());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.urlencoded({ extended: true }));
	app.use('/', routes);

	(async function () {
		await discord.startRPC();
		port = await portfinder.getPortPromise();
		await MeHelper._initialize();
		await discord.update();

		if (port != config.port)
			logger.info(`Dashboard port changed from ${config.port} to ${port}`);

		app.get("/", (req, res) => {
			res.set({ "Allow-access-Allow-Origin": "*" });
			res.sendFile(path.join(__dirname, '/public/welcome.html'));
		});

		app.listen(port, () => {
			logger.info('Vulx has finished loading! Welcome to Vulx.')
			logger.debug(`Vulx initialized on port ${port}`);
			if(process.pkg)
				open('http://127.0.0.1:' + port);
		});
	})();
}