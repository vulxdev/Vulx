// library definitions
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');
const discord = require("../utils/discordHelper");
const meHelper = require('../utils/meHelper');

const updatePresence = catchAsync(async (req, res) => {
	let flag = req.body.flag;
    const valConfig = await meHelper.getValorantJson();

	console.log(flag)

	if (flag & 1) {
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

	await meHelper.updateRequest(valConfig);
	await discord.update(); 
    await res.sendFile(path.join(__dirname, '../public/index.html'));
});

const currentSettings = catchAsync(async (req, res) => {
    const valConfig = await meHelper.getValorantJson();
	const data = {
		queueId: valConfig.queueId,
		competitiveTier: valConfig.competitiveTier,
		leaderboardPosition: valConfig.leaderboardPosition,
		accountLevel: valConfig.accountLevel,
		partyOwnerMatchScoreAllyTeam: valConfig.partyOwnerMatchScoreAllyTeam,
		partyOwnerMatchScoreEnemyTeam: valConfig.partyOwnerMatchScoreEnemyTeam,
		playerCardId: valConfig.playerCardId,
		playerTitleId: valConfig.playerTitleId
	}

	logger.debug(`Sending current settings to client, ${JSON.stringify(data)}`);

	res.status(httpStatus.OK).send(data);
});

module.exports = {
    updatePresence,
    currentSettings
}