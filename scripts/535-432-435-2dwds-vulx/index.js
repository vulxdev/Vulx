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

function systemMessage(data) {
	Logger.info(`System Message - ${data}`);
	try {
		SystemMessageHelper.sendSystemMessage(data);
	} catch (e) {
		Logger.error(e);
	}
}

exports.run = async () => {
	await SystemMessageHelper.sendSystemMessage("Sending default message from script!");
	Logger.info('System Message - Default Run');
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
	systemMessage
}