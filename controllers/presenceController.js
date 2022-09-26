/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// library definitions
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const Logger = require('../utils/Logger');
const DiscordRPC = require("../utils/discordHelper");
const meHelper = require('../utils/meHelper');
const ConfigHelper = require('../utils/ConfigHelper');

const updatePresence = catchAsync(async (req, res) => {
	let flag = req.body.flag;
    const valConfig = await ConfigHelper.getValorantConfig();

	if (flag & 1) {
		if(req.body.status) 
		valConfig.queueId = req.body.status;
	}
	if (flag & 2) {
		valConfig.competitiveTier = req.body.rank;
	}
	if (flag & 4) {
		valConfig.leaderboardPosition = req.body.position;
	}
	if (flag & 8) {
		valConfig.accountLevel = req.body.level;
	}
	if (flag & 16) {
		valConfig.partyOwnerMatchScoreAllyTeam = req.body.ally;
	}
	if (flag & 32) {
		valConfig.partyOwnerMatchScoreEnemyTeam = req.body.enemy;
	}
	if (flag & 64) {
		valConfig.playerTitleId = req.body.playerTitleId;
	}

	Logger.debug(`Updating presence :: Flag: ${flag} | ${JSON.stringify(valConfig)}`);

	await DiscordRPC.refreshActivity(); 
	await meHelper.updateRequest(valConfig);
    await res.status(httpStatus.OK).send();
});

const currentSettings = catchAsync(async (req, res) => {
    const valConfig = await ConfigHelper.getValorantConfig();
	
	let status;
	if(valConfig.sessionLoopState == "INGAME") status = "online";
	else if(valConfig.partyId == "" || valConfig.partyId == null) status = "offline"; 
	else if(valConfig.sessionLoopState !== "MENUS" && valConfig.sessionLoopState !== "INGAME") status = "stream";
	else if(valConfig.isValid == false) status = "dnd";
	else if(valConfig.sessionLoopState == "MENUS" && valConfig.isIdle == true) status = "away";
	else if (valConfig.sessionLoopState == "MENUS" && valConfig.partyId == "727") status = "available";

	const data = {
		queueId: valConfig.queueId,
		competitiveTier: valConfig.competitiveTier,
		leaderboardPosition: valConfig.leaderboardPosition,
		accountLevel: valConfig.accountLevel,
		partyOwnerMatchScoreAllyTeam: valConfig.partyOwnerMatchScoreAllyTeam,
		partyOwnerMatchScoreEnemyTeam: valConfig.partyOwnerMatchScoreEnemyTeam,
		playerCardId: valConfig.playerCardId,
		playerTitleId: valConfig.playerTitleId,
		status: status
	}

	Logger.debug(`Fufilling current settings request :: ${JSON.stringify(data)}`);

	res.status(httpStatus.OK).send(data);
});

module.exports = {
    updatePresence,
    currentSettings
}