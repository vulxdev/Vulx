/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// library definitions
const path = require('path');
const open = require('open');
const express = require('express');

// local imports
const DiscordRPC = require("./utils/discordHelper");
const Logger = require('./utils/Logger');
const ConfigHelper = require('./utils/ConfigHelper');
const routes = require('./routes');
const MeHelper = require('./utils/meHelper');
const SystemMessageHelper = require('./utils/SystemMessageHelper');
const ValorantAPI = require('./utils/ValorantAPI');

// definitions
const isDevelopment = process.env.NODE_ENV === 'development';
const port = 80;
const link = `http://127.0.0.1:${port}/`;

// express definition
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

MeHelper.init();
DiscordRPC.init();

(async () => {
	const valorantConfig = await ConfigHelper.getValorantConfig();

	// welcome message
	await SystemMessageHelper.sendSystemMessage(`◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤`);
	await SystemMessageHelper.sendSystemMessage(`♡ Welcome to Vulx ${await ValorantAPI.getGameName()}`);
	await SystemMessageHelper.sendSystemMessage(`♡ Your current rank is ${DiscordRPC.rankIdToName[valorantConfig.competitiveTier]}`);
	await SystemMessageHelper.sendSystemMessage(`♡ For support join discord.gg/vulx`);
	await SystemMessageHelper.sendSystemMessage(`♡ Made with love by Aqua & Syfe`);
	await SystemMessageHelper.sendSystemMessage(`◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤`);

	process.title = "Vulx";
})();

app.get("/", (req, res) => {
	res.set({ "Allow-access-Allow-Origin": "*" });
	res.redirect("/setup");
});

app.listen(port, () => {
	Logger.info('Vulx has finished loading! Welcome to Vulx.')
	Logger.debug(`Vulx initialized on port ${port}`);
	if(process.pkg)
		open(link);
});