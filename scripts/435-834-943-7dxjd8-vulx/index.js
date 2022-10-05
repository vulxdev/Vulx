/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// Local config file
const config = require('./config.json');

// Local utils
const Logger = require('../../utils/Logger');
const SystemMessageHelper = require('../../utils/SystemMessageHelper');

function vulxExample() {
	Logger.info('vulxExample - Dash');
}

function vulxExampleText(data) { //Data is sent when a text field is used
	Logger.info(`vulxExample - ${data}`);
}

exports.run = async () => {
	await SystemMessageHelper.sendSystemMessage("Hello from script!");
	Logger.info('vulxExample - Run');
};

exports.cfg = {
	name: config["details"].name,
	description: config["details"].description,
	author: config["details"].author,
	url: config["details"].url,
	version: config["details"].version,
	enabled: config["settings"].enabled,
};

exports.functions = {
	vulxExample,
	vulxExampleText
}